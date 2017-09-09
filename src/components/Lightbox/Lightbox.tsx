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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-6xl max-h-[90vh] w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 relative">
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {/* Conditional content based on URL type */}
          {isImage ? (
            /* Image */
            <img
              src={url}
              alt={title}
              className="w-full h-full object-contain rounded-b-lg"
              onLoad={handleImageLoad}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          ) : (
            /* Iframe */
            <iframe
              src={url}
              title={title}
              className="w-full h-full border-0 rounded-b-lg"
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