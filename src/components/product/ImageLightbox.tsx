import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  productName: string;
  open: boolean;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex, productName, open, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lastTouchDistance = useRef<number | null>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  // Reset when opening or changing image
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
      resetZoom();
    }
  }, [open, initialIndex]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    lastTouchDistance.current = null;
    lastTouchCenter.current = null;
  }, []);

  const clampTranslate = useCallback((x: number, y: number, s: number) => {
    if (s <= 1) return { x: 0, y: 0 };
    const maxX = ((s - 1) * window.innerWidth) / 2;
    const maxY = ((s - 1) * window.innerHeight) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, []);

  const zoomTo = useCallback((newScale: number, centerX?: number, centerY?: number) => {
    const clamped = Math.max(1, Math.min(5, newScale));
    if (clamped === 1) {
      resetZoom();
      return;
    }
    setScale(clamped);
    if (centerX !== undefined && centerY !== undefined) {
      setTranslate((prev) => clampTranslate(prev.x, prev.y, clamped));
    } else {
      setTranslate((prev) => clampTranslate(prev.x, prev.y, clamped));
    }
  }, [resetZoom, clampTranslate]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "+" || e.key === "=") zoomTo(scale + 0.5);
      if (e.key === "-") zoomTo(scale - 0.5);
      if (e.key === "0") resetZoom();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, goNext, goPrev, scale, zoomTo, resetZoom]);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.3 : 0.3;
    zoomTo(scale + delta);
  }, [scale, zoomTo]);

  // Touch handlers for pinch-to-zoom
  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchCenter = (touches: React.TouchList) => ({
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      lastTouchDistance.current = getTouchDistance(e.touches);
      lastTouchCenter.current = getTouchCenter(e.touches);
    } else if (e.touches.length === 1 && scale > 1) {
      isPanning.current = true;
      panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      translateStart.current = { ...translate };
    }
  }, [scale, translate]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      e.preventDefault();
      const newDist = getTouchDistance(e.touches);
      const ratio = newDist / lastTouchDistance.current;
      const newScale = Math.max(1, Math.min(5, scale * ratio));
      lastTouchDistance.current = newDist;

      const center = getTouchCenter(e.touches);
      if (lastTouchCenter.current) {
        const dx = center.x - lastTouchCenter.current.x;
        const dy = center.y - lastTouchCenter.current.y;
        const newTranslate = clampTranslate(translate.x + dx, translate.y + dy, newScale);
        setTranslate(newTranslate);
      }
      lastTouchCenter.current = center;
      setScale(newScale);
    } else if (e.touches.length === 1 && isPanning.current && scale > 1) {
      const dx = e.touches[0].clientX - panStart.current.x;
      const dy = e.touches[0].clientY - panStart.current.y;
      const newTranslate = clampTranslate(
        translateStart.current.x + dx,
        translateStart.current.y + dy,
        scale
      );
      setTranslate(newTranslate);
    }
  }, [scale, translate, clampTranslate]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      lastTouchDistance.current = null;
      lastTouchCenter.current = null;
    }
    if (e.touches.length === 0) {
      isPanning.current = false;
    }
  }, []);

  // Mouse drag to pan when zoomed
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY };
    translateStart.current = { ...translate };
  }, [scale, translate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current || scale <= 1) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setTranslate(clampTranslate(translateStart.current.x + dx, translateStart.current.y + dy, scale));
  }, [scale, clampTranslate]);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  // Double tap/click to zoom
  const lastTapTime = useRef(0);
  const handleDoubleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTapTime.current < 300) {
      e.preventDefault();
      if (scale > 1) {
        resetZoom();
      } else {
        zoomTo(2.5);
      }
    }
    lastTapTime.current = now;
  }, [scale, resetZoom, zoomTo]);

  // Swipe to navigate (only when not zoomed)
  const swipeStartX = useRef(0);
  const handleSwipeStart = useCallback((x: number) => {
    if (scale <= 1) swipeStartX.current = x;
  }, [scale]);

  const handleSwipeEnd = useCallback((x: number) => {
    if (scale > 1) return;
    const diff = x - swipeStartX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goPrev();
      else goNext();
    }
  }, [scale, goNext, goPrev]);

  const zoomPercent = Math.round(scale * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col select-none"
          role="dialog"
          aria-label="Image lightbox"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95" onClick={() => scale <= 1 && onClose()} />

          {/* Top bar */}
          <div className="relative z-20 flex items-center justify-between p-4">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>{currentIndex + 1} / {images.length}</span>
              <span className="text-white/30">•</span>
              <span>{zoomPercent}%</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => zoomTo(scale - 0.5)}
                disabled={scale <= 1}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 disabled:text-white/20 transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                onClick={resetZoom}
                disabled={scale <= 1}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 disabled:text-white/20 transition-colors"
                aria-label="Reset zoom"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => zoomTo(scale + 0.5)}
                disabled={scale >= 5}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 disabled:text-white/20 transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <div className="w-px h-5 bg-white/20 mx-1" />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main image area */}
          <div
            ref={containerRef}
            className="relative z-10 flex-1 flex items-center justify-center overflow-hidden touch-none"
            onWheel={handleWheel}
            onTouchStart={(e) => {
              handleTouchStart(e);
              handleDoubleTap(e);
              if (e.touches.length === 1) handleSwipeStart(e.touches[0].clientX);
            }}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => {
              handleTouchEnd(e);
              if (e.changedTouches.length === 1) handleSwipeEnd(e.changedTouches[0].clientX);
            }}
            onMouseDown={(e) => {
              handleMouseDown(e);
              handleDoubleTap(e);
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Navigation arrows (desktop) */}
            {images.length > 1 && scale <= 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden md:block"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden md:block"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                ref={imgRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={images[currentIndex]}
                alt={`${productName} view ${currentIndex + 1}`}
                className="max-w-[90vw] max-h-[75vh] object-contain"
                style={{
                  transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                  cursor: scale > 1 ? "grab" : "zoom-in",
                  transition: isPanning.current ? "none" : "transform 0.15s ease-out",
                }}
                draggable={false}
              />
            </AnimatePresence>
          </div>

          {/* Bottom thumbnails + dots */}
          {images.length > 1 && (
            <div className="relative z-20 pb-6 pt-2">
              {/* Thumbnail strip */}
              <div className="flex justify-center gap-2 px-4 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentIndex(i); resetZoom(); }}
                    className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentIndex
                        ? "border-primary opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-contain bg-white/5 p-1"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Zoom hint (only shown initially) */}
          {scale <= 1 && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-white/40 text-xs flex items-center gap-2 pointer-events-none"
            >
              <ZoomIn className="h-3 w-3" />
              <span>Pinch or scroll to zoom • Double-tap to zoom in</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
