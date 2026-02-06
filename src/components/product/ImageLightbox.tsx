import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  productName: string;
  open: boolean;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex, productName, open, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);

  // Reset state when opening
  useState(() => {
    setCurrentIndex(initialIndex);
    setZoomed(false);
  });

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
    setZoomed(false);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    setZoomed(false);
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [onClose, goNext, goPrev]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-label="Image lightbox"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

          {/* Controls */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setZoomed((z) => !z)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
            >
              {zoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="relative z-[1] max-w-[90vw] max-h-[85vh] flex items-center justify-center"
          >
            <img
              src={images[currentIndex]}
              alt={`${productName} view ${currentIndex + 1}`}
              className={`max-w-full max-h-[85vh] object-contain transition-transform duration-300 ${
                zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setZoomed((z) => !z)}
              draggable={false}
            />
          </motion.div>

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(i); setZoomed(false); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
