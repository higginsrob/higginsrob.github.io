import { GitHubRepo } from '@/types';

const GITHUB_USERNAME = 'higginsrob';
const REPO_DENYLIST = new Set(['higginsrob.github.io']);

const BADGE_HOST_PATTERNS = [
  'shields.io',
  'badge',
  'travis-ci',
  'codecov.io',
  'coveralls.io',
  'david-dm.org',
  'snyk.io',
  'circleci.com',
  'appveyor.com',
  'buymeacoffee',
  'liberapay',
  'img.shields',
  'github.com/actions',
  'workflows/',
  'sonarcloud',
  'codefactor',
  'dependabot',
  'npmjs.org/badge',
  'nodei.co',
  'fury.io',
];

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i;

function isLikelyBadge(url: string): boolean {
  const lower = url.toLowerCase();
  if (lower.includes('badge') && !IMAGE_EXT.test(lower.split('?')[0])) {
    return true;
  }
  return BADGE_HOST_PATTERNS.some((pattern) => lower.includes(pattern.toLowerCase()));
}

function resolveReadmeImageUrl(
  rawUrl: string,
  fullName: string,
  defaultBranch: string
): string | null {
  const trimmed = rawUrl.trim().replace(/^<|>$/g, '');
  if (!trimmed || trimmed.startsWith('data:')) return null;

  let absolute = trimmed;
  if (trimmed.startsWith('//')) {
    absolute = `https:${trimmed}`;
  } else if (trimmed.startsWith('/')) {
    absolute = `https://raw.githubusercontent.com/${fullName}/${defaultBranch}${trimmed}`;
  } else if (!/^https?:\/\//i.test(trimmed)) {
    const cleanPath = trimmed.replace(/^\.\//, '');
    absolute = `https://raw.githubusercontent.com/${fullName}/${defaultBranch}/${cleanPath}`;
  }

  // Prefer raw content URLs over github.com/blob page links
  absolute = absolute
    .replace(
      /^https?:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/([^/]+)\/(.+)$/i,
      'https://raw.githubusercontent.com/$1/$2/$3'
    )
    .replace(
      /^https?:\/\/github\.com\/([^/]+\/[^/]+)\/raw\/([^/]+)\/(.+)$/i,
      'https://raw.githubusercontent.com/$1/$2/$3'
    );

  if (isLikelyBadge(absolute)) return null;

  // Skip tiny SVG badges and pure SVG icons unless they look like screenshots
  if (/\.svg(\?|$)/i.test(absolute) && !/screenshot|preview|demo|screen/i.test(absolute)) {
    return null;
  }

  return absolute;
}

/** Extract the first useful screenshot/image URL from README markdown. */
export function extractScreenshotFromReadme(
  markdown: string,
  fullName: string,
  defaultBranch: string
): string | null {
  const candidates: string[] = [];

  const mdImageRegex = /!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match: RegExpExecArray | null;
  while ((match = mdImageRegex.exec(markdown)) !== null) {
    candidates.push(match[1]);
  }

  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = htmlImageRegex.exec(markdown)) !== null) {
    candidates.push(match[1]);
  }

  for (const candidate of candidates) {
    const resolved = resolveReadmeImageUrl(candidate, fullName, defaultBranch);
    if (resolved) return resolved;
  }

  return null;
}

async function fetchReadmeScreenshot(repo: GitHubRepo): Promise<string | null> {
  const branch = repo.default_branch || 'main';
  const readmeNames = ['README.md', 'readme.md', 'Readme.md'];

  for (const name of readmeNames) {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/${repo.full_name}/${branch}/${name}`
      );
      if (!response.ok) continue;
      const markdown = await response.text();
      return extractScreenshotFromReadme(markdown, repo.full_name, branch);
    } catch {
      // try next name
    }
  }

  return null;
}

export async function fetchPublicRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const repos = (await response.json()) as GitHubRepo[];

  const filtered = repos
    .filter(
      (repo) =>
        !repo.fork &&
        !repo.archived &&
        !repo.private &&
        !REPO_DENYLIST.has(repo.name)
    )
    .sort(
      (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );

  const withScreenshots = await Promise.all(
    filtered.map(async (repo) => {
      const screenshotUrl = await fetchReadmeScreenshot(repo);
      return { ...repo, screenshotUrl };
    })
  );

  return withScreenshots;
}

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
