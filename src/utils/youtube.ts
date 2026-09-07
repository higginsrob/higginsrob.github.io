import type { YouTubeVideo } from '../types';
import pinnedVideoIds from '../../pinned.json' with { type: 'json' };

export const PINNED_VIDEO_IDS: string[] = pinnedVideoIds;

export const YOUTUBE_CHANNEL_ID = 'UCTYA8fZpkN5GCZuyGCNP9MA';
export const YOUTUBE_CHANNEL_HANDLE = '@higginsrob';
export const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`;
export const YOUTUBE_CHANNEL_VIDEOS_URL = `${YOUTUBE_CHANNEL_URL}/videos`;
export const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
export const YOUTUBE_VIDEOS_PATH = '/youtube-videos.json';

const YOUTUBE_FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  // Skip the consent interstitial some datacenter IPs get instead of a watch page.
  Cookie: 'CONSENT=YES+; SOCS=CAI',
};

const GENERIC_YOUTUBE_DESCRIPTION_SNIPPETS = [
  'enjoy the videos and music you love',
  'share your videos with friends, family, and the world',
];

const RSS_ATTEMPTS = 3;

const CHANNEL_PAGE_LIMIT = 15;

const SHORT_DESCRIPTION_LENGTH = 180;

function decodeXmlEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function firstMatch(source: string, pattern: RegExp): string {
  return source.match(pattern)?.[1]?.trim() ?? '';
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Watch/channel pages often use YouTube's site-wide slogan as the meta description. */
function isGenericYouTubeDescription(description: string): boolean {
  const normalized = description.trim().toLowerCase();
  if (!normalized) return true;
  return GENERIC_YOUTUBE_DESCRIPTION_SNIPPETS.some((snippet) => normalized.includes(snippet));
}

function usableDescription(value: string | undefined | null): string {
  const trimmed = decodeXmlEntities(value ?? '').trim();
  return !trimmed || isGenericYouTubeDescription(trimmed) ? '' : trimmed;
}

function sliceBalancedJsonObject(source: string, start: number): string | null {
  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (char === '\\') {
        escape = true;
        continue;
      }
      if (char === '"') inString = false;
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === '{') depth += 1;
    else if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  return null;
}

function extractAssignedJson(html: string, name: string): Record<string, unknown> | null {
  const assignments = [`var ${name} = `, `${name} = `];
  for (const assignment of assignments) {
    const idx = html.indexOf(assignment);
    if (idx === -1) continue;
    const start = html.indexOf('{', idx + assignment.length - 1);
    if (start === -1) continue;
    const json = sliceBalancedJsonObject(html, start);
    if (!json) continue;
    try {
      return JSON.parse(json) as Record<string, unknown>;
    } catch {
      continue;
    }
  }
  return null;
}

function descriptionFromPlayerResponse(player: Record<string, unknown>): string {
  const videoDetails = player.videoDetails as { shortDescription?: string } | undefined;
  if (typeof videoDetails?.shortDescription === 'string') {
    const description = usableDescription(videoDetails.shortDescription);
    if (description) return description;
  }

  const microformat = player.microformat as
    | { playerMicroformatRenderer?: { description?: { simpleText?: string } } }
    | undefined;
  return usableDescription(microformat?.playerMicroformatRenderer?.description?.simpleText);
}

function descriptionFromWatchHtml(html: string): string {
  const player = extractAssignedJson(html, 'ytInitialPlayerResponse');
  const fromPlayer = player ? descriptionFromPlayerResponse(player) : '';
  if (fromPlayer) return fromPlayer;

  const og = html.match(/<meta property="og:description" content="([^"]*)"/i)?.[1];
  const meta = html.match(/<meta name="description" content="([^"]*)"/i)?.[1];
  return usableDescription(og) || usableDescription(meta);
}

type InnertubePlayer = {
  description: string;
  unlisted: boolean;
};

async function fetchInnertubePlayer(id: string): Promise<InnertubePlayer | null> {
  try {
    const response = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
      method: 'POST',
      headers: {
        ...YOUTUBE_FETCH_HEADERS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: 'WEB',
            clientVersion: '2.20240101.00.00',
          },
        },
        videoId: id,
      }),
    });
    if (!response.ok) return null;

    const data = (await response.json()) as {
      videoDetails?: { title?: string; shortDescription?: string; isUnlisted?: boolean };
      microformat?: {
        playerMicroformatRenderer?: {
          description?: { simpleText?: string };
          unlisted?: boolean;
        };
      };
    };

    return {
      description:
        usableDescription(data.videoDetails?.shortDescription) ||
        usableDescription(data.microformat?.playerMicroformatRenderer?.description?.simpleText),
      unlisted: Boolean(
        data.videoDetails?.isUnlisted || data.microformat?.playerMicroformatRenderer?.unlisted
      ),
    };
  } catch {
    return null;
  }
}

/** Truncate a YouTube description to a short card blurb. */
export function shortDescription(
  description: string,
  maxLength = SHORT_DESCRIPTION_LENGTH
): string {
  const firstParagraph = description.replace(/\r\n/g, '\n').split(/\n\s*\n/)[0] ?? '';
  const collapsed = firstParagraph.replace(/\s+/g, ' ').trim();
  if (collapsed.length <= maxLength) return collapsed;

  const truncated = collapsed.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const cutAt = lastSpace > maxLength * 0.6 ? lastSpace : maxLength;
  return `${truncated.slice(0, cutAt).trim()}…`;
}

export function youtubeEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

const YOUTUBE_ID_PATTERN =
  /(?:youtube\.com\/(?:watch\?(?:[^#\s]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

export function youtubeVideoIdFromUrl(url: string): string | null {
  return url.match(YOUTUBE_ID_PATTERN)?.[1] ?? null;
}

/** Pin listed IDs to the front, preserving pinned.json order. */
export function applyPinnedOrder(
  videos: YouTubeVideo[],
  pinnedIds: string[] = PINNED_VIDEO_IDS
): YouTubeVideo[] {
  const byId = new Map(videos.map((video) => [video.id, video]));
  const pinned = pinnedIds.flatMap((id) => {
    const video = byId.get(id);
    return video ? [video] : [];
  });
  const pinnedSet = new Set(pinnedIds);
  const rest = videos.filter((video) => !pinnedSet.has(video.id));
  return [...pinned, ...rest];
}

async function fetchVideoById(id: string): Promise<YouTubeVideo | null> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`;
    const response = await fetch(oembedUrl, { headers: YOUTUBE_FETCH_HEADERS });
    if (!response.ok) return null;
    const data = (await response.json()) as { title?: string };

    let description = '';
    try {
      const watch = await fetch(`https://www.youtube.com/watch?v=${id}`, {
        headers: YOUTUBE_FETCH_HEADERS,
      });
      if (watch.ok) {
        const html = await watch.text();
        // Unlisted videos are reachable by ID (oEmbed works) but should not be featured.
        if (/"isUnlisted"\s*:\s*true/.test(html)) return null;
        description = descriptionFromWatchHtml(html);
      }
    } catch {
      // Title and thumbnail are enough if the watch page is unavailable.
    }

    if (!description) {
      const inner = await fetchInnertubePlayer(id);
      if (inner?.unlisted) return null;
      description = inner?.description ?? '';
    }

    return {
      id,
      title: data.title?.trim() || id,
      description,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      publishedAt: '',
      url: `https://www.youtube.com/watch?v=${id}`,
    };
  } catch {
    return null;
  }
}

export function parseYouTubeRss(xml: string): YouTubeVideo[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  return entries
    .map((entry) => {
      const id = firstMatch(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/);
      if (!id) return null;

      return {
        id,
        title: decodeXmlEntities(firstMatch(entry, /<title>([^<]*)<\/title>/)),
        description: usableDescription(
          firstMatch(entry, /<media:description>([\s\S]*?)<\/media:description>/)
        ),
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        publishedAt: firstMatch(entry, /<published>([^<]+)<\/published>/),
        url: `https://www.youtube.com/watch?v=${id}`,
      } satisfies YouTubeVideo;
    })
    .filter((video): video is YouTubeVideo => video !== null);
}

function uniqueIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    ordered.push(id);
  }
  return ordered;
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await fn(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

async function fetchVideosByIds(ids: string[]): Promise<YouTubeVideo[]> {
  const videos = await mapLimit(ids, 3, fetchVideoById);
  return videos.filter((video): video is YouTubeVideo => video !== null);
}

async function fetchChannelVideoIdsFromPage(): Promise<string[]> {
  const response = await fetch(YOUTUBE_CHANNEL_VIDEOS_URL, { headers: YOUTUBE_FETCH_HEADERS });
  if (!response.ok) {
    throw new Error(`YouTube channel page returned ${response.status}`);
  }
  const html = await response.text();
  const ids = uniqueIds(
    [...html.matchAll(/"watchEndpoint":\{"videoId":"([A-Za-z0-9_-]{11})"/g)].map(
      (match) => match[1]
    )
  );
  if (ids.length === 0) {
    throw new Error('No video IDs found on YouTube channel page');
  }
  return ids.slice(0, CHANNEL_PAGE_LIMIT);
}

async function fetchRssVideos(): Promise<YouTubeVideo[]> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= RSS_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(YOUTUBE_RSS_URL, {
        headers: {
          ...YOUTUBE_FETCH_HEADERS,
          Accept: 'application/atom+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
        },
      });
      if (!response.ok) {
        throw new Error(`YouTube RSS returned ${response.status}`);
      }
      const videos = parseYouTubeRss(await response.text());
      if (videos.length === 0) {
        throw new Error('YouTube RSS contained no videos');
      }
      return videos;
    } catch (err) {
      lastError = err;
      if (attempt < RSS_ATTEMPTS) {
        await delay(500 * attempt);
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('YouTube RSS unavailable');
}

async function withPinnedVideos(videos: YouTubeVideo[]): Promise<YouTubeVideo[]> {
  const present = new Set(videos.map((video) => video.id));
  const missingPinned = PINNED_VIDEO_IDS.filter((id) => !present.has(id));
  const extras = await fetchVideosByIds(missingPinned);
  return applyPinnedOrder([...videos, ...extras]);
}

/** Fetch channel videos for build/dev. RSS first, then channel page, then pinned IDs. */
export async function fetchYouTubeRssFeed(): Promise<YouTubeVideo[]> {
  try {
    return await withPinnedVideos(await fetchRssVideos());
  } catch (err) {
    console.warn(
      `[youtube-feed] RSS unavailable (${err instanceof Error ? err.message : err}); trying channel page`
    );
  }

  try {
    const ids = uniqueIds([...PINNED_VIDEO_IDS, ...(await fetchChannelVideoIdsFromPage())]);
    return applyPinnedOrder(await fetchVideosByIds(ids));
  } catch (err) {
    console.warn(
      `[youtube-feed] Channel page unavailable (${err instanceof Error ? err.message : err}); trying pinned videos`
    );
  }

  try {
    return applyPinnedOrder(await fetchVideosByIds(PINNED_VIDEO_IDS));
  } catch (err) {
    console.warn(
      `[youtube-feed] Could not load any videos (${err instanceof Error ? err.message : err})`
    );
    return [];
  }
}

/** Load the baked / proxied channel video list from this site. */
export async function fetchChannelVideos(): Promise<YouTubeVideo[]> {
  const response = await fetch(YOUTUBE_VIDEOS_PATH, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load videos (${response.status})`);
  }
  return applyPinnedOrder((await response.json()) as YouTubeVideo[]);
}
