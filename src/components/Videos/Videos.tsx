import React, { useEffect, useState } from 'react';
import { YouTubeVideo } from '@/types';
import {
  fetchChannelVideos,
  shortDescription,
  trackVideoClick,
  YOUTUBE_CHANNEL_URL,
  youtubeEmbedUrl,
} from '@/utils';
import Lightbox from '../Lightbox';

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M8 5.5v13l11-6.5-11-6.5z" />
  </svg>
);

const VideoCard: React.FC<{ video: YouTubeVideo; onSelect: (video: YouTubeVideo) => void }> = ({
  video,
  onSelect,
}) => {
  const blurb = shortDescription(video.description);

  return (
    <button
      type="button"
      onClick={() => onSelect(video)}
      className="group surface rounded-lg overflow-hidden flex flex-col h-full text-left transition-all duration-300 hover:border-secondary-400 dark:hover:border-silver-500 hover:-translate-y-0.5"
      aria-label={`Play ${video.title}`}
    >
      <div className="relative aspect-video overflow-hidden bg-secondary-100 dark:bg-secondary-800 border-b border-secondary-200/80 dark:border-secondary-700/60">
        <img
          src={video.thumbnailUrl}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white pl-0.5 group-hover:bg-[#ff0000] transition-colors">
            <PlayIcon className="w-5 h-5" />
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg text-secondary-900 dark:text-white mb-2">
          {video.title}
        </h3>
        {blurb ? (
          <p className="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed line-clamp-3">
            {blurb}
          </p>
        ) : null}
      </div>
    </button>
  );
};

const SkeletonCard: React.FC = () => (
  <div className="surface rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-video bg-secondary-200 dark:bg-secondary-700" />
    <div className="p-5">
      <div className="h-5 w-2/3 bg-secondary-200 dark:bg-secondary-700 rounded mb-4" />
      <div className="h-3 w-full bg-secondary-100 dark:bg-secondary-800 rounded mb-2" />
      <div className="h-3 w-5/6 bg-secondary-100 dark:bg-secondary-800 rounded" />
    </div>
  </div>
);

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchChannelVideos();
        if (!cancelled) {
          setVideos(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load videos');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelect = (video: YouTubeVideo) => {
    trackVideoClick(video.title);
    setActiveVideo(video);
  };

  return (
    <section id="videos" className="section-padding bg-secondary-50 dark:bg-secondary-800/40">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            Videos
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Latest uploads from my YouTube channel.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div className="text-center py-12 surface rounded-lg max-w-lg mx-auto">
            <p className="text-secondary-600 dark:text-secondary-300 mb-4">
              Couldn&apos;t load videos right now.
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              View on YouTube
            </a>
          </div>
        ) : null}

        {!loading && !error && videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary-600 dark:text-secondary-300 mb-4">
              No videos to show yet.
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              View on YouTube
            </a>
          </div>
        ) : null}

        {!loading && !error && videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} onSelect={handleSelect} />
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-secondary-500 hover:text-secondary-800 dark:text-silver-400 dark:hover:text-silver-200 transition-colors"
              >
                See all on YouTube →
              </a>
            </div>
          </>
        ) : null}
      </div>

      <Lightbox
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        url={activeVideo ? youtubeEmbedUrl(activeVideo.id) : ''}
        title={activeVideo?.title ?? ''}
      />
    </section>
  );
};

export default Videos;
