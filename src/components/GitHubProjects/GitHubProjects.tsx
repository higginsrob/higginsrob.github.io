import React, { useEffect, useState } from 'react';
import { GitHubRepo } from '@/types';
import { fetchPublicRepos, GITHUB_PROFILE_URL } from '@/utils/github';
import { trackProjectClick } from '@/utils';

const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
  </svg>
);

const RepoCard: React.FC<{ repo: GitHubRepo }> = ({ repo }) => {
  const topics = (repo.topics ?? []).slice(0, 4);
  const youtubeUrls = repo.youtubeUrls ?? [];
  const [imageFailed, setImageFailed] = useState(false);
  const showScreenshot = Boolean(repo.screenshotUrl) && !imageFailed;
  const demoUrl = repo.homepage || null;
  const linkClass =
    'text-secondary-700 dark:text-silver-300 underline-offset-2 hover:underline';

  return (
    <article className="group surface rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-secondary-400 dark:hover:border-silver-500 hover:-translate-y-0.5">
      {showScreenshot && (
        <a
          href={demoUrl || repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackProjectClick(repo.name, demoUrl ? 'homepage' : 'repo')}
          className="relative aspect-[16/10] overflow-hidden bg-secondary-100 dark:bg-secondary-800 border-b border-secondary-200/80 dark:border-secondary-700/60 block"
          aria-label={`${repo.name} ${demoUrl ? 'live demo' : 'repository'}`}
        >
          <img
            src={repo.screenshotUrl!}
            alt={`${repo.name} screenshot`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        </a>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display font-semibold text-lg text-secondary-900 dark:text-white">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProjectClick(repo.name, 'repo')}
              className="hover:underline underline-offset-2"
            >
              {repo.name}
            </a>
          </h3>
          {repo.stargazers_count > 0 && (
            <span className="font-mono text-xs text-secondary-500 dark:text-silver-400 shrink-0">
              ★ {repo.stargazers_count}
            </span>
          )}
        </div>

        <p className="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed flex-1 mb-4">
          {repo.description || 'No description provided.'}
        </p>

        <div className="mt-auto space-y-3">
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-secondary-200 dark:border-secondary-700 text-secondary-500 dark:text-secondary-400"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 text-xs font-mono text-secondary-500 dark:text-silver-400">
            <span>{repo.language || '—'}</span>
            <div className="flex items-center gap-3 shrink-0">
              {youtubeUrls.length > 0 && (
                <div className="flex items-center gap-1.5">
                  {youtubeUrls.map((url, index) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackProjectClick(repo.name, 'youtube')}
                      className="text-secondary-500 hover:text-[#ff0000] dark:text-silver-400 dark:hover:text-[#ff0000] transition-colors"
                      aria-label={
                        youtubeUrls.length > 1
                          ? `${repo.name} YouTube video ${index + 1}`
                          : `${repo.name} YouTube video`
                      }
                      title="YouTube"
                    >
                      <YouTubeIcon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackProjectClick(repo.name, 'homepage')}
                  className={linkClass}
                >
                  Live demo
                </a>
              )}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectClick(repo.name, 'repo')}
                className={linkClass}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const SkeletonCard: React.FC = () => (
  <div className="surface rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-[16/10] bg-secondary-200 dark:bg-secondary-700" />
    <div className="p-5">
      <div className="h-5 w-2/3 bg-secondary-200 dark:bg-secondary-700 rounded mb-4" />
      <div className="h-3 w-full bg-secondary-100 dark:bg-secondary-800 rounded mb-2" />
      <div className="h-3 w-5/6 bg-secondary-100 dark:bg-secondary-800 rounded mb-6" />
      <div className="h-3 w-1/4 bg-secondary-200 dark:bg-secondary-700 rounded" />
    </div>
  </div>
);

const GitHubProjects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPublicRepos();
        if (!cancelled) {
          setRepos(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load repositories');
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

  return (
    <section id="projects" className="section-padding bg-secondary-50 dark:bg-secondary-800/40">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            Projects
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Personal public repositories on GitHub.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12 surface rounded-lg max-w-lg mx-auto">
            <p className="text-secondary-600 dark:text-secondary-300 mb-4">
              Couldn&apos;t load repositories right now.
            </p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              View on GitHub
            </a>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary-600 dark:text-secondary-300 mb-4">
              No public repositories to show.
            </p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              View on GitHub
            </a>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-secondary-500 hover:text-secondary-800 dark:text-silver-400 dark:hover:text-silver-200 transition-colors"
              >
                See all on GitHub →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GitHubProjects;
