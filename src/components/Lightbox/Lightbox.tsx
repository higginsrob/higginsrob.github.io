import React, { useEffect, useState } from 'react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, url, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Reset loading state when opening
      setIsLoading(true);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Check if URL is an image file
  const isImage = url && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div
        className={`relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white dark:bg-secondary-800 ${
          isImage ? '' : 'h-full'
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-secondary-200 p-4 dark:border-secondary-700">
          <h3 className="truncate text-lg font-semibold text-secondary-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-secondary-500 transition-colors hover:text-secondary-800 dark:text-secondary-300 dark:hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content — min-h-0 lets flex children shrink inside the viewport max-height */}
        <div
          className={`relative flex min-h-0 items-center justify-center ${
            isImage ? 'overflow-hidden' : 'h-full flex-1'
          }`}
        >
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-secondary-100 dark:bg-secondary-700">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-silver-400" />
            </div>
          )}

          {isImage ? (
            <img
              src={url}
              alt={title}
              className="max-h-[calc(100vh-6.5rem)] max-w-full object-contain"
              onLoad={handleImageLoad}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          ) : (
            <iframe
              src={url}
              title={title}
              className="h-full w-full border-0"
              onLoad={handleIframeLoad}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;