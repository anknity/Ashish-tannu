import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { POLAROID_MEMORIES, PolaroidMemory } from '../data/weddingData';
import {
  GeneratedWeddingPortraits,
  useGeneratedCouplePortraits,
} from '../utils/couplePortraitGenerator';

interface ScrollingMomentsGalleryProps {
  onSelectMemory: (memory: PolaroidMemory) => void;
}

interface FramedGalleryItem {
  id: string;
  frameStyle: 'arch' | 'polaroid' | 'oval' | 'museum' | 'pill' | 'heirloom';
  portraitKey: keyof GeneratedWeddingPortraits;
  objectPosition: string;
  title: string;
  hindiTag: string;
  caption: string;
  memoryIndex: number;
}

const FRAMED_GALLERY_ITEMS: FramedGalleryItem[] = [
  {
    id: 'frame-arch',
    frameStyle: 'arch',
    portraitKey: 'aisleWalk',
    objectPosition: 'object-top',
    title: 'The Royal Aisle Walk',
    hindiTag: 'शुभ मिलन • दरियापुर बाज़ार',
    caption: 'Arch Frame I',
    memoryIndex: 0,
  },
  {
    id: 'frame-polaroid',
    frameStyle: 'polaroid',
    portraitKey: 'haldi',
    objectPosition: 'object-top',
    title: 'Haldi & Marigold Glow',
    hindiTag: 'हल्दी उत्सव • 08 दिसंबर 2026',
    caption: 'Vintage Polaroid II',
    memoryIndex: 1,
  },
  {
    id: 'frame-oval',
    frameStyle: 'oval',
    portraitKey: 'royalSangeet',
    objectPosition: 'object-top',
    title: 'Moonstone Navy & Silver',
    hindiTag: 'संगीत संध्या • शाही अंदाज़',
    caption: 'Oval Cameo III',
    memoryIndex: 2,
  },
  {
    id: 'frame-museum',
    frameStyle: 'museum',
    portraitKey: 'weddingMandap',
    objectPosition: 'object-top',
    title: 'Sacred Promises at the Mandap',
    hindiTag: 'सात जन्मों का साथ',
    caption: 'Museum Passepartout IV',
    memoryIndex: 0,
  },
  {
    id: 'frame-pill',
    frameStyle: 'pill',
    portraitKey: 'romanticCameo',
    objectPosition: 'object-top',
    title: 'Ashish & Tannu Forever',
    hindiTag: 'आशीष & तन्नू',
    caption: 'Lotus Pill Frame V',
    memoryIndex: 1,
  },
  {
    id: 'frame-heirloom',
    frameStyle: 'heirloom',
    portraitKey: 'grandReception',
    objectPosition: 'object-top',
    title: 'Grand Reception Portrait',
    hindiTag: 'शुभ विवाह • 2026',
    caption: 'Heirloom Crest VI',
    memoryIndex: 2,
  },
];

export const ScrollingMomentsGallery: React.FC<ScrollingMomentsGalleryProps> = ({
  onSelectMemory,
}) => {
  const portraits = useGeneratedCouplePortraits();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth continuous auto-scroll effect when not hovered/paused
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    let animationFrameId: number;
    const speed = 0.65;

    const step = () => {
      if (container) {
        container.scrollLeft += speed;
        // Seamless loop reset when reaching halfway through the duplicated track
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = window.requestAnimationFrame(step);
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const offset = direction === 'left' ? -360 : 360;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Duplicate items so continuous scrolling is seamless
  const galleryTrack = [...FRAMED_GALLERY_ITEMS, ...FRAMED_GALLERY_ITEMS];

  return (
    <section
      id="portrait-gallery"
      className="w-full alabaster-parchment-bg py-20 sm:py-28 overflow-hidden border-t border-[#D2D6DC]"
    >
      {/* Header & Scroll Controls */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-center sm:text-left"
        >
          <p className="font-pinyon text-4xl sm:text-5xl text-[#1E3148] -mb-1">Moments</p>
          <h2
            className="text-3xl sm:text-4xl text-[#1E3148] font-medium mt-1"
            style={{ fontFamily: 'var(--font-hindi)' }}
          >
            आशीष &amp; तन्नू — यादगार झलकियाँ
          </h2>
          <p className="font-serif italic text-base text-[#4A5868] mt-1">
            A curated scrolling gallery of bespoke portrait frames &bull; Click any frame to enlarge
          </p>
        </motion.div>

        {/* Interactive Gallery Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2.5 shrink-0"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleManualScroll('left')}
            aria-label="Scroll gallery left"
            className="w-10 h-10 rounded-full border border-[#B8C0C8] bg-white/80 hover:bg-[#1E3148] hover:text-white text-[#1E3148] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          >
            ←
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsPaused((prev) => !prev)}
            className="px-4 py-2 rounded-full border border-[#B8C0C8] bg-white/80 hover:bg-[#1E3148] hover:text-white text-[#1E3148] font-sans text-[10px] tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            {isPaused ? '▶ Resume Scroll' : '❚❚ Pause Scroll'}
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleManualScroll('right')}
            aria-label="Scroll gallery right"
            className="w-10 h-10 rounded-full border border-[#B8C0C8] bg-white/80 hover:bg-[#1E3148] hover:text-white text-[#1E3148] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          >
            →
          </motion.button>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Gallery Track with 6 Distinct Frame Silhouettes */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex items-center gap-8 sm:gap-12 overflow-x-auto px-6 sm:px-12 py-8 no-scrollbar select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {galleryTrack.map((item, idx) => {
          const itemImageSrc = portraits[item.portraitKey];
          const baseMemory = POLAROID_MEMORIES[item.memoryIndex];
          const resolvedMemory: PolaroidMemory = {
            ...baseMemory,
            id: `${item.id}-${idx}`,
            title: item.title,
            handwrittenCaption: `${item.title} — आशीष & तन्नू`,
            imageSrc: itemImageSrc,
          };

          return (
            <motion.div
              key={`${item.id}-${idx}`}
              onClick={() => onSelectMemory(resolvedMemory)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectMemory(resolvedMemory);
                }
              }}
              initial={{ opacity: 0, y: 36, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                type: 'spring',
                stiffness: 110,
                damping: 18,
                delay: (idx % 6) * 0.08,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { type: 'spring', stiffness: 260, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative shrink-0 cursor-pointer will-change-transform"
            >
              {/* =========================================================== */}
              {/* 1. ROYAL ARCH / JHAROKHA DOME FRAME                         */}
              {/* =========================================================== */}
              {item.frameStyle === 'arch' && (
                <div className="w-[270px] sm:w-[300px] bg-[#FAF7F2] p-4 rounded-t-[160px] rounded-b-md shadow-[0_18px_40px_rgba(20,32,48,0.14)] border-2 border-[#C8B9A6] relative">
                  <div className="absolute inset-2.5 rounded-t-[150px] rounded-b-sm border border-[#B59E7D]/60 pointer-events-none z-10" />
                  <div className="w-full h-[340px] sm:h-[370px] rounded-t-[144px] rounded-b-sm overflow-hidden bg-[#1B2D42]">
                    <img
                      src={itemImageSrc}
                      alt={item.title}
                      className={`w-full h-full object-cover ${item.objectPosition} transition-transform duration-700 group-hover:scale-105`}
                    />
                  </div>
                  <div className="pt-3.5 pb-1 text-center">
                    <p
                      className="text-sm text-[#6E5D46] font-medium"
                      style={{ fontFamily: 'var(--font-hindi)' }}
                    >
                      {item.hindiTag}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-[#1B2C40]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* =========================================================== */}
              {/* 2. VINTAGE TILTED POLAROID FRAME WITH TAPE ACCENT           */}
              {/* =========================================================== */}
              {item.frameStyle === 'polaroid' && (
                <div className="w-[280px] sm:w-[310px] bg-[#FDFBF7] p-3.5 pb-6 shadow-[0_20px_44px_rgba(20,32,48,0.16)] border border-[#E2DCD3] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 relative">
                  {/* Top Washi Tape Accent */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#E6DEC8]/80 border border-[#C8B9A6]/50 rotate-1 shadow-sm pointer-events-none z-20" />
                  <div className="w-full h-[310px] sm:h-[340px] overflow-hidden bg-[#D8CFC4]">
                    <img
                      src={itemImageSrc}
                      alt={item.title}
                      className={`w-full h-full object-cover ${item.objectPosition} transition-transform duration-700 group-hover:scale-105`}
                    />
                  </div>
                  <div className="pt-4 px-2 flex items-baseline justify-between">
                    <span className="font-alex text-2xl text-[#1E3148]">{item.title}</span>
                    <span
                      className="text-xs text-[#6E5D46]"
                      style={{ fontFamily: 'var(--font-hindi)' }}
                    >
                      {item.hindiTag}
                    </span>
                  </div>
                </div>
              )}

              {/* =========================================================== */}
              {/* 3. OVAL MEDALLION CAMEO FRAME                               */}
              {/* =========================================================== */}
              {item.frameStyle === 'oval' && (
                <div className="w-[270px] sm:w-[295px] flex flex-col items-center">
                  <div className="relative w-full h-[360px] sm:h-[390px] rounded-full bg-gradient-to-b from-[#23384E] to-[#152333] p-4 shadow-[0_20px_45px_rgba(19,32,48,0.22)] border-[3px] border-[#C5B49E] flex items-end justify-center overflow-hidden">
                    <div className="absolute inset-2.5 rounded-full border border-[#E6DEC8]/55 pointer-events-none z-20" />
                    <img
                      src={itemImageSrc}
                      alt={item.title}
                      className="w-full h-full rounded-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p
                      className="text-xs text-[#6E5D46] font-medium"
                      style={{ fontFamily: 'var(--font-hindi)' }}
                    >
                      {item.hindiTag}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-[#1B2C40]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* =========================================================== */}
              {/* 4. WIDE MUSEUM PASSEPARTOUT DOUBLE-MAT FRAME                */}
              {/* =========================================================== */}
              {item.frameStyle === 'museum' && (
                <div className="w-[340px] sm:w-[390px] bg-[#FAF8F5] p-6 sm:p-7 shadow-[0_18px_42px_rgba(20,32,48,0.15)] border-2 border-[#B8B0A4] relative">
                  <div className="absolute inset-3 border border-[#D4CBBF] pointer-events-none" />
                  <div className="w-full h-[260px] sm:h-[290px] overflow-hidden border border-[#C4B9AA] bg-[#1B2D42]">
                    <img
                      src={itemImageSrc}
                      alt={item.title}
                      className={`w-full h-full object-cover ${item.objectPosition} transition-transform duration-700 group-hover:scale-105`}
                    />
                  </div>
                  <div className="pt-4 flex items-center justify-between text-left">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#1B2C40]">
                        {item.title}
                      </h3>
                      <p
                        className="text-xs text-[#6E5D46]"
                        style={{ fontFamily: 'var(--font-hindi)' }}
                      >
                        {item.hindiTag}
                      </p>
                    </div>
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#7E8C9A]">
                      {item.caption}
                    </span>
                  </div>
                </div>
              )}

              {/* =========================================================== */}
              {/* 5. VERTICAL STADIUM PILL ARCH FRAME                         */}
              {/* =========================================================== */}
              {item.frameStyle === 'pill' && (
                <div className="w-[265px] sm:w-[290px] bg-white p-3.5 rounded-[150px] shadow-[0_18px_40px_rgba(20,32,48,0.14)] border border-[#D8D0C5] relative">
                  <div className="w-full h-[365px] sm:h-[395px] rounded-[140px] overflow-hidden bg-[#EAE3DA] relative">
                    <img
                      src={itemImageSrc}
                      alt={item.title}
                      className={`w-full h-full object-cover ${item.objectPosition} transition-transform duration-700 group-hover:scale-105`}
                    />
                    <div className="absolute inset-2.5 rounded-[132px] border border-white/80 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* =========================================================== */}
              {/* 6. HEIRLOOM DOUBLE-BORDER CREST FRAME                       */}
              {/* =========================================================== */}
              {item.frameStyle === 'heirloom' && (
                <div className="w-[275px] sm:w-[305px] cream-card-paper scallop-card p-5 transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-[310px] sm:h-[340px] rounded-sm overflow-hidden bg-gradient-to-b from-[#DDD4CA] to-[#C8BDB0] flex items-end justify-center border border-[#9E9284]">
                    <img
                      src={itemImageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-3.5 text-center">
                    <p
                      className="text-xs text-[#4A5D70] font-semibold"
                      style={{ fontFamily: 'var(--font-hindi)' }}
                    >
                      {item.hindiTag}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-[#182635] mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
