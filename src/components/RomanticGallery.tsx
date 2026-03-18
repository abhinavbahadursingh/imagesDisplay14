import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';

// Import gallery images
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

const romanticMessages = [
  // "Every moment with you feels like a beautiful dream...",
  // "In your eyes, I found my home.",
  // "Your smile is the most beautiful thing I've ever seen.",
  // "I fall for you more every single day.",
  // "You're the melody that my heart keeps singing.",
  // "Being with you is where I belong.",
  // "You make the world feel like a magical place.",
  // "My favorite place in the world is right next to you.",
  // "You are the best thing that ever happened to me.",
  // "I love you more than words can ever say."
];

const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "100vh", 
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            opacity: [0, 0.7, 0], 
            y: "-10vh",
            x: `${Math.random() * 100}vw`
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute text-primary/30"
        >
          <Heart fill="currentColor" size={Math.random() * 24 + 12} />
        </motion.div>
      ))}
    </div>
  );
};

const LightLeaks = () => (
  <div className="absolute inset-0 pointer-events-none z-10">
    <motion.div 
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        scale: [1, 1.2, 1],
        rotate: [0, 10, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute -top-1/4 -left-1/4 w-full h-full bg-primary/10 rounded-full blur-[120px]"
    />
    <motion.div 
      animate={{ 
        opacity: [0.1, 0.2, 0.1],
        scale: [1, 1.1, 1],
        rotate: [0, -15, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
      className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-romantic-lavender/10 rounded-full blur-[120px]"
    />
  </div>
);

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white/90 text-xl sm:text-2xl font-serif italic text-center text-glow"
    >
      {displayedText}
    </motion.p>
  );
};

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none z-[100] mix-blend-screen"
      animate={{ x: position.x - 128, y: position.y - 128 }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
    />
  );
};

const RomanticGallery: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const nextSlide = useCallback(() => {
    setIndex((prev) => {
      if (prev >= galleryImages.length - 1) {
        setIsFinished(true);
        setIsPlaying(false);
        return prev;
      }
      setProgress(0);
      return prev + 1;
    });
  }, []);

  const prevSlide = useCallback(() => {
    if (isFinished) return;
    setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setProgress(0);
  }, [isFinished]);

  useEffect(() => {
    if (!isPlaying || isFinished) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 1.43; // Approx 3.5 seconds per slide (100 / (3500/50))
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, isFinished, nextSlide]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0510] font-sans">
      <CursorGlow />
      {/* Background Gradient & Particles */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a0b2e] via-[#2d0b3a] to-[#1a0b2e] animate-gradient-xy" />
      <FloatingHearts />
      <LightLeaks />

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-6xl px-4 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {/* Story Progress Bar (Instagram Style) */}
        <div className="w-full max-w-lg flex gap-1.5 mb-6">
          {galleryImages.map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary shadow-[0_0_10px_rgba(255,182,193,0.8)]"
                initial={{ width: 0 }}
                animate={{ 
                  width: i === index ? (isFinished ? "100%" : `${progress}%`) : i < index ? "100%" : "0%" 
                }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>
          ))}
        </div>

        {/* Image Showcase */}
        <div className="relative w-full max-w-[500px] aspect-[3/4] rounded-[2rem] overflow-hidden group shadow-[0_0_80px_rgba(255,182,193,0.15)]">
          
          {/* Background Blurred Fill */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`bg-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 z-0"
            >
              <img 
                src={galleryImages[index]} 
                alt="background" 
                className="w-full h-full object-cover blur-3xl scale-125"
              />
            </motion.div>
          </AnimatePresence>

          {/* Main Image with Ken Burns Effect */}
          <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,182,193,0.2)] border border-white/10 group-hover:border-primary/30 transition-colors duration-700">
                  <motion.img 
                    src={galleryImages[index]} 
                    alt={`Story ${index + 1}`} 
                    className={`w-full h-full object-cover ${!isFinished ? 'ken-burns' : ''}`}
                  />

                  {/* Floating sparkle particles */}
                  {!isFinished && [...Array(8)].map((_, i) => (
                    <motion.div
                      key={`sparkle-${index}-${i}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{
                        y: -350,
                        opacity: [0, 1, 0.8, 0],
                        x: Math.sin(i * 1.5) * 80,
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeOut',
                      }}
                      className="absolute bottom-0 pointer-events-none text-xl z-20"
                      style={{ left: `${10 + i * 11}%` }}
                    >
                      {i % 4 === 0 ? '✨' : i % 4 === 1 ? '💫' : i % 4 === 2 ? '🌸' : '💗'}
                    </motion.div>
                  ))}
                  
                  {/* Image Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Message Overlay */}
                  <div className="absolute bottom-12 left-0 right-0 px-6">
                    <TypewriterText text={isFinished ? "And I look forward to many more..." : romanticMessages[index % romanticMessages.length]} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls Overlay */}
          {!isFinished && (
            <div className="absolute inset-0 z-20 flex items-center justify-between px-4 pointer-events-none">
              <motion.button 
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="w-12 h-12 flex items-center justify-center rounded-full glass-morphism text-white pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="w-12 h-12 flex items-center justify-center rounded-full glass-morphism text-white pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-8 w-full"
        >
          {/* Personal Note Section */}
          <div className="glass-card p-6 sm:p-8 max-w-2xl w-full text-center">
            <h3 className="font-serif text-white/60 uppercase tracking-[0.3em] text-[10px] mb-4">
              {isFinished ? "Our Journey Continues" : "A Note For You"}
            </h3>
            <p className="text-white/80 leading-relaxed italic">
              {isFinished 
                ? "Every end is just a new beginning. I can't wait to create more beautiful memories with you. You are my today and all of my tomorrows."
                : "Sometimes I look at our pictures and realize how lucky I am to have you in my life. Every smile, every laugh, and every quiet moment we share is a treasure I hold close to my heart."
              }
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-primary">
              <Sparkles size={16} />
              <span className="font-script text-2xl">Love You Always</span>
            </div>
          </div>
        </motion.div>

      </div>
      {/* Floating Sparkles across screen */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute bg-white rounded-full blur-[1px]"
            style={{ 
              width: Math.random() * 3 + 1, 
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RomanticGallery;
