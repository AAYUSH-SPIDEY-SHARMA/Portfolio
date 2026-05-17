import { useState } from 'react';
import ImageCard from './ImageCard';
import LightboxModal from './LightboxModal';

/**
 * MasonryGallery — Pinterest-style responsive image grid with lightbox.
 * Blueprint: "Full masonry grid (react-responsive-masonry)"
 * Uses CSS columns for native masonry layout.
 * 
 * Props:
 * - images: Array of { src, alt, caption, category }
 * - categories: Array of string (for filter tabs)
 */
const MasonryGallery = ({ images = [], categories = [] }) => {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filteredImages = filter === 'All'
    ? images
    : images.filter(img => img.category === filter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(-1);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + filteredImages.length) % filteredImages.length);
  const nextImage = () => setLightboxIndex((i) => (i + 1) % filteredImages.length);

  return (
    <div>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === cat
                  ? 'text-white bg-[var(--primary)] shadow-md'
                  : 'text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-hover)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {filteredImages.map((img, i) => (
          <ImageCard
            key={img.src + i}
            src={img.src}
            alt={img.alt}
            caption={img.caption}
            index={i}
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--text-muted)] text-sm">No images in this category yet.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <LightboxModal
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
};

export default MasonryGallery;
