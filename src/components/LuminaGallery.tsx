import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import all gallery images
import img1 from '@/assets/gallery/1.webp';
import img2 from '@/assets/gallery/2.webp';
import img3 from '@/assets/gallery/3.webp';
import img4 from '@/assets/gallery/4.webp';
import img5 from '@/assets/gallery/5.webp';
import img6 from '@/assets/gallery/6.webp';
import img7 from '@/assets/gallery/7.webp';
import img8 from '@/assets/gallery/8.webp';
import img9 from '@/assets/gallery/9.webp';
import img10 from '@/assets/gallery/10.webp';
import img11 from '@/assets/gallery/11.webp';
import img12 from '@/assets/gallery/12.webp';
import img13 from '@/assets/gallery/13.webp';
import img14 from '@/assets/gallery/14.webp';

const galleryImages = [
  img1, img2, img3, img4, img5,
  img6, img7, img8, img9, img10,
  img11, img12, img13, img14
];

// const imageLabels = [
//   'Golden Peaks', 'Sakura Garden', 'Orchid Flow', 'Aurora Dreams', 'Coral Sunset',
//   'Hidden Falls', 'Lavender Dusk', 'Cosmic Bloom', 'Amber Dunes', 'Deep Blue',
//   'Golden Peaks II', 'Sakura Garden II', 'Orchid Flow II', 'Aurora Dreams II', 'Coral Sunset II',
//   'Hidden Falls II', 'Lavender Dusk II', 'Cosmic Bloom II', 'Amber Dunes II', 'Deep Blue II',
// ];

// Transition choreographies
const transitionArchetypes = [
  { // The Bloom
    initial: { scale: 0.9, opacity: 0, filter: 'blur(20px)' },
    animate: { scale: 1, opacity: 1, filter: 'blur(0px)' },
    exit: { scale: 1.1, opacity: 0, filter: 'blur(20px)' },
  },
  { // The Portal (3D)
    initial: { rotateY: 90, opacity: 0, x: 200 },
    animate: { rotateY: 0, opacity: 1, x: 0 },
    exit: { rotateY: -90, opacity: 0, x: -200 },
  },
  { // The Drift
    initial: { x: '100%', skewX: '-10deg', opacity: 0 },
    animate: { x: 0, skewX: '0deg', opacity: 1 },
    exit: { x: '-100%', skewX: '10deg', opacity: 0 },
  },
  { // The Reveal
    initial: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
    animate: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
    exit: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
  },
];

const transitionNames = ['Bloom', 'Portal', 'Drift', 'Reveal'];

const LuminaGallery: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const nextSlide = useCallback(() => {
    setIsLoading(true);
    setIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIsLoading(true);
    setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') { e.preventDefault(); setIsAutoplay(p => !p); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide]);

  const currentVariant = transitionArchetypes[index % transitionArchetypes.length];
  const currentTransitionName = transitionNames[index % transitionArchetypes.length];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply bg-orchid/20"
          style={{ filter: 'blur(120px)', animation: 'ambient-pulse 6s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply bg-cyan-soft/30"
          style={{ filter: 'blur(120px)', animation: 'ambient-pulse 6s ease-in-out infinite 3s' }}
        />
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-foreground">
            Lumina <span className="font-semibold">Gallery</span>
          </h1>
          <p className="font-label text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
            Aperture & Atmosphere
          </p>
        </motion.div>

        {/* Image frame */}
        <div className="relative aspect-[3/2] w-full rounded-[32px] glass-surface p-3 sm:p-4 overflow-hidden">
          {/* Shimmer skeleton */}
          {isLoading && (
            <div className="absolute inset-3 sm:inset-4 rounded-[24px] shimmer-skeleton z-20" />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={currentVariant.initial}
              animate={currentVariant.animate}
              exit={currentVariant.exit}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full h-full rounded-[24px] overflow-hidden"
              style={{ perspective: 1000 }}
            >
              <img
                src={galleryImages[index]}
                // alt={imageLabels[index]}
                className="w-full h-full object-cover"
                onLoad={() => setIsLoading(false)}
                loading="eager"
              />

              {/* Floating sparkle particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`sparkle-${index}-${i}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{
                    y: -250,
                    opacity: [0, 1, 0.6, 0],
                    x: Math.sin(i * 1.2) * 60,
                  }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut',
                  }}
                  className="absolute bottom-0 pointer-events-none text-sm"
                  style={{ left: `${10 + i * 10}%` }}
                >
                {i % 5 === 0 ? '✨' 
                : i % 5 === 1 ? '💫' 
                : i % 5 === 2 ? '⭐' 
                : i % 5 === 3 ? '💖' 
                : '❤️'}                
                </motion.div>
              ))}

              {/* Image title overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-4 left-4 right-4"
              >
                <div className="glass-surface rounded-2xl px-4 py-3 inline-block">
                  <p className="font-display text-sm font-medium text-foreground">
                    {/* {imageLabels[index]} */}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-6">
          {/* Counter & metadata */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-label text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Collection 01
            </span>
            <div className="h-px w-8 sm:w-12 bg-border" />
            <span className="font-display font-medium text-foreground tabular-nums">
              {String(index + 1).padStart(2, '0')}{' '}
              <span className="text-muted-foreground/40">/</span> 20
            </span>
            <div className="h-px w-8 sm:w-12 bg-border" />
            <span className="font-label text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
              {currentTransitionName}
            </span>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <NavButton onClick={prevSlide} direction="prev" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAutoplay(!isAutoplay)}
              className={`autoplay-button ${isAutoplay ? 'autoplay-active' : 'autoplay-inactive'}`}
            >
              {isAutoplay ? 'Stop' : 'Autoplay'}
            </motion.button>

            <NavButton onClick={nextSlide} direction="next" />
          </div>

          {/* Progress dots */}
          <div className="flex gap-1.5">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIsLoading(true); setIndex(i); }}
                className="group p-1"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-6 bg-primary'
                      : 'w-1.5 bg-border group-hover:bg-muted-foreground/50'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NavButton: React.FC<{ onClick: () => void; direction: 'prev' | 'next' }> = ({
  onClick,
  direction,
}) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="nav-button"
  >
    {direction === 'next' ? (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14m-7-7 7 7-7 7" />
      </svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5m7 7-7-7 7-7" />
      </svg>
    )}
  </motion.button>
);

export default LuminaGallery;
