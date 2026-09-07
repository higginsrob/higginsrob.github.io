import React, { useEffect, useRef, useState } from 'react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isImage = Boolean(url && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url));
  const isYouTube = Boolean(url && /youtube\.com\/embed\//i.test(url));

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, url]);

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-full flex-col overflow-hidden rounded-lg bg-white dark:bg-secondary-800 ${
          isYouTube
            ? 'max-w-5xl'
            : isImage
              ? 'max-h-full max-w-6xl'
              : 'h-full max-h-full max-w-6xl'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-secondary-200 p-4 dark:border-secondary-700">
          <h3
            id="lightbox-title"
            className="truncate pr-4 text-lg font-semibold text-secondary-900 dark:text-white"
          >
            {title}
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="text-secondary-500 transition-colors hover:text-secondary-800 dark:text-secondary-300 dark:hover:text-white"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          className={`relative flex min-h-0 items-center justify-center bg-black ${
            isYouTube ? 'aspect-video w-full' : isImage ? 'overflow-hidden' : 'h-full flex-1'
          }`}
        >
          {isLoading ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-secondary-100 dark:bg-secondary-700">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-silver-400" />
            </div>
          ) : null}

          {isImage ? (
            <img
              src={url}
              alt={title}
              className="max-h-[calc(100vh-6.5rem)] max-w-full object-contain"
              onLoad={handleMediaLoad}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          ) : (
            <iframe
              key={url}
              src={url}
              title={title}
              className="h-full w-full border-0"
              onLoad={handleMediaLoad}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
