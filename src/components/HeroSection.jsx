import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { carouselSlides } from '../data/carousel';
import Button from './ui/Button';
import { IconSnow, IconCrab } from './ui/Icons';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Enhanced parallax transforms with different speeds for depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const snowY = useTransform(scrollYProgress, [0, 1], ['0%', '120%']);
  const waveY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const crabY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

  // Generate snowflakes once
  const snowflakes = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
    })), []
  );

  // Generate bubbles once
  const bubbles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 20 + Math.random() * 30,
    })), []
  );

  const highlightBadges = [
    'Ghẹ tươi sống | Giao 2h nội thành',
    'Combo Giáng sinh giảm đến 25%',
    'Đóng gói giữ lạnh | Hoàn tiền nếu không hài lòng',
  ];

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced mouse movement effect with smoother tracking
  useEffect(() => {
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (rect) {
          // Normalize to -1 to 1 range for smoother parallax
          const normalizedX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const normalizedY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          
          setMousePosition({
            x: normalizedX,
            y: normalizedY,
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-ocean-blue via-accent-blue to-light-blue"
    >
      <h1 className="sr-only">Ghẹ Biển Noel - Ghẹ tươi sống, combo Giáng sinh, giao nhanh</h1>
      {/* Parallax Background Layers */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        {/* Ocean waves layer with parallax */}
        <motion.div 
          style={{ y: waveY }}
          className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
        >
          <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path
              d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z"
              fill="white"
              className="animate-wave"
            />
            <path
              d="M0,150 Q300,100 600,150 T1200,150 L1200,200 L0,200 Z"
              fill="white"
              opacity="0.5"
            />
            <path
              d="M0,120 Q400,80 800,120 T1200,120 L1200,200 L0,200 Z"
              fill="white"
              opacity="0.3"
            />
          </svg>
        </motion.div>

        {/* Decorative crab icons with enhanced mouse parallax and scroll parallax */}
        <motion.div style={{ y: crabY }} className="absolute inset-0">
          {[...Array(10)].map((_, i) => {
            const depth = i % 3; // Create depth layers
            const parallaxMultiplier = [15, 25, 35][depth];
            return (
              <motion.div
                key={i}
                style={{
                  x: mousePosition.x * parallaxMultiplier,
                  y: mousePosition.y * parallaxMultiplier + (depth * 10),
                  left: `${5 + (i % 5) * 20}%`,
                  top: `${15 + Math.floor(i / 5) * 35}%`,
                  rotate: mousePosition.x * (5 + depth * 2),
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute opacity-15"
              >
                <IconCrab className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced bubbles with mouse parallax and animation */}
        {bubbles.map((bubble) => (
          <motion.div
            key={`bubble-${bubble.id}`}
            style={{
              x: mousePosition.x * (8 + bubble.id * 1.5),
              y: mousePosition.y * (8 + bubble.id * 1.5),
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2 + bubble.id * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full border-2 border-white opacity-25 backdrop-blur-sm"
          />
        ))}
      </motion.div>

      {/* Snow overlay */}
      <motion.div
        style={{ y: snowY }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            className="absolute text-white opacity-70"
            style={{
              left: `${flake.left}%`,
              top: '-10%',
            }}
            animate={{
              y: ['0vh', '100vh'],
              x: [0, Math.sin(flake.id) * 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: flake.duration,
              repeat: Infinity,
              delay: flake.delay,
              ease: 'linear',
            }}
          >
            <IconSnow className="w-4 h-4" />
          </motion.div>
        ))}
      </motion.div>

      {/* Carousel Slides */}
      <div className="relative z-20 h-full">
        {carouselSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1,
            }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 flex items-center justify-center ${
              index === currentSlide ? 'z-10' : 'z-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            <motion.div
              style={{ y: textY }}
              className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            >
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl text-white mb-2 drop-shadow-md"
              >
                {slide.subtitle}
              </motion.p>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-white mb-8 drop-shadow-md"
              >
                {slide.description}
              </motion.p>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 justify-center flex-wrap"
              >
                <a href={slide.ctaLink}>
                  <Button size="lg" variant="primary">
                    {slide.cta}
                  </Button>
                </a>
                <a href="#products">
                  <Button size="lg" variant="outline">
                    Xem Tất Cả Sản Phẩm
                  </Button>
                </a>
              </motion.div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {highlightBadges.map((badge) => (
                  <motion.span
                    key={badge}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm border border-white/30 shadow-lg"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Carousel Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white opacity-50 hover:opacity-75 w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 right-8 z-30 text-white"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
