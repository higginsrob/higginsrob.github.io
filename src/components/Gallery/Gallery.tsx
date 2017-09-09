import React from 'react';

const Gallery: React.FC = () => {
  const photos = [
    {
      src: '/maya.jpg',
      alt: 'Maya',
      title: 'Maya',
    },
    {
      src: '/poolside.jpg',
      alt: 'Poolside',
      title: 'Poolside',
    },
    {
      src: '/spiral.JPG',
      alt: 'Spiral Architecture',
      title: 'Spiral',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50/30 to-accent-50/30 dark:from-secondary-900 dark:to-secondary-800">
      <div className="container-custom">
        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <div 
              key={photo.title}
              className={`relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                index === 1 ? 'md:transform md:translate-y-8' : ''
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{photo.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;