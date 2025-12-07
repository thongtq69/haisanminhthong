import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZooming(true);
  };

  const handleImageLeave = () => {
    setIsZooming(false);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative aspect-square w-full bg-white rounded-xl overflow-hidden shadow-lg cursor-zoom-in group"
          onMouseMove={handleImageHover}
          onMouseLeave={handleImageLeave}
          onClick={() => setIsLightboxOpen(true)}
        >
          <motion.img
            key={selectedImage.id}
            src={selectedImage.url}
            alt={selectedImage.alt}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: isZooming ? 1.5 : 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
          />
          
          {/* Zoom indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          
          {/* Badge overlay */}
          <div className="absolute top-4 left-4">
            <span className="bg-christmas-red text-white px-3 py-1 rounded-lg text-sm font-bold">
              Xem chi tiết
            </span>
          </div>
        </motion.div>

        {/* Thumbnails */}
        <div className="grid grid-cols-5 gap-2">
          {images.map((image) => (
            <motion.button
              key={image.id}
              onClick={() => handleThumbnailClick(image)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedImage.id === image.id
                  ? 'border-christmas-red ring-2 ring-christmas-red ring-offset-2'
                  : 'border-gray-200 hover:border-ocean-blue'
              }`}
            >
              <img
                src={image.thumbnail || image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {selectedImage.id === image.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-christmas-red/20"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 text-white hover:text-christmas-red transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Navigation arrows */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-christmas-red transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = images.findIndex(img => img.id === selectedImage.id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
                setSelectedImage(images[prevIndex]);
              }}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-christmas-red transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = images.findIndex(img => img.id === selectedImage.id);
                const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
                setSelectedImage(images[nextIndex]);
              }}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;

