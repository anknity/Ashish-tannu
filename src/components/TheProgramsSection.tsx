import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { POLAROID_MEMORIES, PolaroidMemory } from '../data/weddingData';
import { FloatingRealisticPetals } from './RealisticFloralArt';
import {
  GeneratedWeddingPortraits,
  useGeneratedCouplePortraits,
} from '../utils/couplePortraitGenerator';

interface TheProgramsSectionProps {
  onSelectPortrait?: (memory: PolaroidMemory) => void;
}

interface ProgramBlock {
  title: string;
  subtitleHindi: string;
  portraitKey: keyof GeneratedWeddingPortraits;
  memoryIndex: number;
  items: {
    label: string;
    time: string;
  }[];
}

const PROGRAM_BLOCKS: ProgramBlock[] = [
  {
    title: 'The Haldi',
    subtitleHindi: '08 दिसंबर 2026 • हल्दी एवं संगीत',
    portraitKey: 'haldi',
    memoryIndex: 1,
    items: [
      { label: 'Haldi Utsav', time: '03:00 PM' },
      { label: 'Mehendi Rasam', time: '05:00 PM' },
      { label: 'Sangeet Night', time: '08:00 PM' },
    ],
  },
  {
    title: 'The Wedding',
    subtitleHindi: '09 दिसंबर 2026 • शुभ विवाह (दरियापुर बाज़ार)',
    portraitKey: 'weddingMandap',
    memoryIndex: 0,
    items: [
      { label: 'Ceremony', time: '03:00 PM' },
      { label: 'Sadi', time: '05:00 PM' },
      { label: 'Farewell', time: '08:00 PM' },
    ],
  },
  {
    title: 'The Reception',
    subtitleHindi: '10 दिसंबर 2026 • आशीर्वाद समारोह',
    portraitKey: 'grandReception',
    memoryIndex: 2,
    items: [
      { label: 'Welcome & Swagat', time: '03:00 PM' },
      { label: 'Ashirwad Ceremony', time: '05:00 PM' },
      { label: 'Grand Banquet', time: '08:00 PM' },
    ],
  },
];

export const TheProgramsSection: React.FC<TheProgramsSectionProps> = ({
  onSelectPortrait,
}) => {
  const portraits = useGeneratedCouplePortraits();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth parallax on the oval-framed Bride & Groom portrait
  const frameY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  return (
    <section
      ref={sectionRef}
      id="lakeside-celebration"
      className="relative w-full bg-[#F8F7F4] text-[#1E3148] overflow-hidden"
    >
      {/* Subtle Realistic Drifting Petals Across The Programs */}
      <FloatingRealisticPetals />

      {/* =================================================================== */}
      {/* SPLIT LAYOUT WITH PADDED FLORAL OVAL PILL FRAME ON LEFT             */}
      {/* =================================================================== */}
      <div className="relative w-full min-h-[780px] lg:min-h-[860px] grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN (Cols 1-6): Vertical Oval Pill Frame with Proper Inner Image Padding + Top-Right Alstroemeria + Bottom-Left Oriental Stargazer Lilies */}
        <div className="relative lg:col-span-6 bg-[#EFECE6] flex flex-col items-center justify-center pt-14 pb-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:pr-24 overflow-hidden">
          {/* Mobile & Tablet Styled Heading at Very Top of Section */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden text-center mb-10 relative z-20"
          >
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-[#5C6B7A] block mb-1">
              SHUBH VIVAH UTSAV
            </span>
            <h2 className="font-pinyon text-5xl sm:text-6xl text-[#1E3148] leading-none">
              The Programs
            </h2>
            <p
              className="text-sm sm:text-base text-[#4A5D70] font-medium mt-1"
              style={{ fontFamily: 'var(--font-hindi)' }}
            >
              आशीष &amp; तन्नू — मांगलिक कार्यक्रम
            </p>
          </motion.div>

          {/* Soft ambient halo behind the oval frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 46% 50%, rgba(255, 255, 255, 0.92) 0%, rgba(234, 229, 220, 0.85) 75%)',
            }}
          />

          {/* OVAL / STADIUM PILL FRAME CONTAINER */}
          <motion.div
            style={{ y: frameY }}
            initial={{ opacity: 0, scale: 0.9, y: 32 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 95, damping: 18 }}
            className="relative w-[275px] xs:w-[305px] sm:w-[360px] md:w-[395px] h-[415px] xs:h-[455px] sm:h-[530px] md:h-[575px] flex items-center justify-center z-10 my-4"
          >
            {/* Outer Oval Pill Mat Surface (`p-3.5 sm:p-4`) */}
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.5 }}
              onClick={() => onSelectPortrait?.(POLAROID_MEMORIES[2])}
              className="relative w-full h-full rounded-[9999px] p-3.5 sm:p-4 shadow-[0_24px_55px_rgba(30,26,22,0.16)] cursor-pointer bg-gradient-to-b from-[#E5ECEF] via-[#EFECE6] to-[#DDD4CA]"
            >
              {/* Inner White-Bordered Clipped Oval Frame — Strictly clips the image inside the white border with generous top & side padding */}
              <div className="relative w-full h-full rounded-[9999px] border-[1.5px] border-white/95 overflow-hidden flex items-end justify-center pt-8 sm:pt-11 px-5 sm:px-8 bg-gradient-to-b from-[#DCE5EA]/70 via-[#EAE5DC]/80 to-[#D5CBC0]/90">
                {/* Soft sunlit studio bokeh glow inside the inner oval */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 35%, rgba(255, 252, 246, 0.88) 0%, rgba(215, 206, 194, 0.45) 68%, rgba(190, 178, 165, 0.65) 100%)',
                  }}
                />

                {/* Actual Bride & Groom Image Properly Padded & Contained Inside the White Oval Line */}
                <img
                  src="/assets/aistudio/ashish_tannu_illustration__1_-Photoroom_dbb07264.png"
                  alt="Ashish and Tannu — Bride and Groom Portrait"
                  className="relative z-10 w-[90%] h-[94%] object-contain object-bottom drop-shadow-[0_14px_24px_rgba(18,22,30,0.22)] transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </motion.div>

            {/* ============================================================= */}
            {/* TOP-RIGHT HYPER-REALISTIC PINK ALSTROEMERIA / LILY CLUSTER    */}
            {/* ============================================================= */}
            <motion.div
              animate={{
                rotate: [0, 3, -2, 0],
                y: [0, -5, 2, 0],
              }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-7 -right-6 sm:-top-10 sm:-right-11 w-36 sm:w-48 md:w-52 h-40 sm:h-52 pointer-events-none select-none z-30 drop-shadow-[0_10px_18px_rgba(60,30,35,0.22)]"
            >
              <svg viewBox="0 0 230 240" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="progAlstroPetal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FCE4EC" />
                    <stop offset="40%" stopColor="#F08A9D" />
                    <stop offset="82%" stopColor="#D1435E" />
                    <stop offset="100%" stopColor="#8E1A32" />
                  </linearGradient>
                  <linearGradient id="progAlstroThroat" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF8DC" />
                    <stop offset="50%" stopColor="#F7B892" />
                    <stop offset="100%" stopColor="#D95B72" />
                  </linearGradient>
                  <linearGradient id="progStemGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#759958" />
                    <stop offset="100%" stopColor="#354E22" />
                  </linearGradient>
                  <filter id="progFloralShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#2E0F18" floodOpacity="0.26" />
                  </filter>
                </defs>

                {/* Curved Green Stems & Leaves */}
                <g stroke="url(#progStemGreen)" strokeLinecap="round" fill="none">
                  <path d="M180,215 Q168,162 145,105" strokeWidth="4" />
                  <path d="M162,155 Q122,128 85,95" strokeWidth="3.2" />
                  <path d="M155,130 Q182,105 198,82" strokeWidth="3" />
                  <path d="M145,105 Q148,72 152,46" strokeWidth="3" />
                </g>
                <g fill="url(#progStemGreen)">
                  <path d="M168,175 Q190,145 182,118 Q164,142 168,175 Z" />
                  <path d="M152,158 Q128,175 112,162 Q132,145 152,158 Z" />
                  <path d="M135,122 Q115,105 98,118 Q114,128 135,122 Z" />
                </g>

                {/* Top Center Blossom */}
                <g transform="translate(152, 48) rotate(-8)" filter="url(#progFloralShadow)">
                  {[-52, -18, 18, 52, 130, 175].map((ang, idx) => (
                    <g key={`tc-${idx}`} transform={`rotate(${ang})`}>
                      <path
                        d="M0,0 C-15,-18 -20,-42 0,-54 C20,-42 15,-18 0,0 Z"
                        fill={idx % 2 === 0 ? 'url(#progAlstroPetal)' : 'url(#progAlstroThroat)'}
                      />
                      <path d="M0,-5 L0,-45" stroke="#9C223D" strokeWidth="0.6" opacity="0.4" />
                    </g>
                  ))}
                  <g fill="#5C0E1E" opacity="0.82">
                    <circle cx="-4" cy="-22" r="1.4" />
                    <circle cx="3" cy="-25" r="1.3" />
                    <circle cx="0" cy="-18" r="1.4" />
                    <circle cx="6" cy="-20" r="1.2" />
                  </g>
                  <circle cx="0" cy="-3" r="3.2" fill="#F4D03F" />
                </g>

                {/* Left Upper Blossom */}
                <g transform="translate(76, 88) rotate(-32) scale(0.95)" filter="url(#progFloralShadow)">
                  {[-48, -14, 22, 58, 145].map((ang, idx) => (
                    <path
                      key={`lu-${idx}`}
                      d="M0,0 C-14,-18 -18,-40 0,-50 C18,-40 14,-18 0,0 Z"
                      fill={idx === 1 ? 'url(#progAlstroThroat)' : 'url(#progAlstroPetal)'}
                      transform={`rotate(${ang})`}
                    />
                  ))}
                  <circle cx="0" cy="-3" r="3" fill="#F4D03F" />
                </g>

                {/* Center Full Open Blossom */}
                <g transform="translate(132, 98) rotate(8) scale(1.06)" filter="url(#progFloralShadow)">
                  {[0, 58, 118, 178, 238, 298].map((ang, idx) => (
                    <g key={`cf-${idx}`} transform={`rotate(${ang})`}>
                      <path
                        d="M0,0 C-14,-16 -18,-38 0,-46 C18,-38 14,-16 0,0 Z"
                        fill={idx < 2 ? 'url(#progAlstroThroat)' : 'url(#progAlstroPetal)'}
                      />
                      <path d="M0,-4 L0,-38" stroke="#9C223D" strokeWidth="0.6" opacity="0.4" />
                    </g>
                  ))}
                  <g fill="#6E1820" opacity="0.85">
                    <circle cx="-3" cy="-18" r="1.3" />
                    <circle cx="4" cy="-21" r="1.2" />
                    <circle cx="0" cy="-14" r="1.3" />
                    <circle cx="-6" cy="-15" r="1.1" />
                    <circle cx="6" cy="-16" r="1.1" />
                  </g>
                  <circle cx="0" cy="0" r="4" fill="#F2B749" />
                </g>

                {/* Right Blossom */}
                <g transform="translate(194, 86) rotate(28) scale(0.88)" filter="url(#progFloralShadow)">
                  {[-42, -8, 28, 65, 150].map((ang, idx) => (
                    <path
                      key={`rb-${idx}`}
                      d="M0,0 C-13,-16 -16,-36 0,-46 C16,-36 13,-16 0,0 Z"
                      fill={idx === 1 ? 'url(#progAlstroThroat)' : 'url(#progAlstroPetal)'}
                      transform={`rotate(${ang})`}
                    />
                  ))}
                </g>

                {/* Lower Left Cascading Petal Blossom */}
                <g transform="translate(102, 134) rotate(-20) scale(0.84)" filter="url(#progFloralShadow)">
                  {[-38, 0, 38, 145, 195].map((ang, idx) => (
                    <path
                      key={`ll-${idx}`}
                      d="M0,0 C-13,-15 -16,-34 0,-44 C16,-34 13,-15 0,0 Z"
                      fill="url(#progAlstroPetal)"
                      transform={`rotate(${ang})`}
                    />
                  ))}
                </g>
              </svg>
            </motion.div>

            {/* ============================================================= */}
            {/* BOTTOM-LEFT HYPER-REALISTIC ORIENTAL STARGAZER LILIES + BUD   */}
            {/* ============================================================= */}
            <motion.div
              animate={{
                rotate: [0, -3, 2, 0],
                y: [0, 4, -3, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -left-7 sm:-bottom-12 sm:-left-14 w-40 sm:w-56 md:w-60 h-40 sm:h-56 pointer-events-none select-none z-30 drop-shadow-[0_12px_22px_rgba(35,25,30,0.24)]"
            >
              <svg viewBox="0 0 260 250" className="w-full h-full overflow-visible">
                <defs>
                  {/* White-Edged Crimson/Magenta Stargazer Lily Petal Gradient */}
                  <linearGradient id="stargazerPetal" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="22%" stopColor="#F8DCE4" />
                    <stop offset="55%" stopColor="#D45079" />
                    <stop offset="85%" stopColor="#9E1F4E" />
                    <stop offset="100%" stopColor="#6D1234" />
                  </linearGradient>
                  <linearGradient id="lilyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6E8F4E" />
                    <stop offset="55%" stopColor="#46662D" />
                    <stop offset="100%" stopColor="#293E18" />
                  </linearGradient>
                  <linearGradient id="lilyBudGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#C8D69B" />
                    <stop offset="50%" stopColor="#EBB8C4" />
                    <stop offset="100%" stopColor="#C46B82" />
                  </linearGradient>
                </defs>

                {/* Main Woody Green Stems */}
                <g stroke="#3A4F24" strokeLinecap="round" fill="none">
                  <path d="M210,225 Q155,195 112,135" strokeWidth="4.2" />
                  <path d="M165,198 Q125,188 88,185" strokeWidth="3.4" />
                  <path d="M128,155 Q82,138 42,135" strokeWidth="3" />
                </g>

                {/* Deep Green Lanceolate Lily Leaves */}
                <g fill="url(#lilyLeafGrad)">
                  <path d="M115,142 Q72,140 52,175 Q85,158 115,142 Z" />
                  <path d="M125,152 Q158,132 184,148 Q154,158 125,152 Z" />
                  <path d="M148,182 Q132,218 142,246 Q160,216 148,182 Z" />
                  <path d="M165,196 Q188,182 204,208 Q182,206 165,196 Z" />
                </g>

                {/* Left Unopened Pink-Green Lily Bud */}
                <g transform="translate(38, 134) rotate(-82)" filter="url(#progFloralShadow)">
                  <path
                    d="M0,0 C-10,-14 -10,-38 0,-52 C10,-38 10,-14 0,0 Z"
                    fill="url(#lilyBudGrad)"
                    stroke="#8E5A68"
                    strokeWidth="0.8"
                  />
                  <path d="M0,0 L0,-50" stroke="#A66D7A" strokeWidth="0.8" opacity="0.6" />
                </g>

                {/* Upper Main Blooming Oriental Stargazer Lily */}
                <g transform="translate(116, 108) rotate(-8)" filter="url(#progFloralShadow)">
                  {[-112, -58, 0, 58, 112, 180].map((ang, idx) => (
                    <g key={`sg1-${idx}`} transform={`rotate(${ang})`}>
                      <path
                        d="M0,0 C-16,-20 -20,-52 0,-68 C20,-52 16,-20 0,0 Z"
                        fill="url(#stargazerPetal)"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      {/* Central Crimson Vein & Papillae Dots */}
                      <path d="M0,-4 L0,-54" stroke="#7A1138" strokeWidth="1.2" opacity="0.65" />
                      <circle cx="-3" cy="-22" r="0.9" fill="#590925" opacity="0.7" />
                      <circle cx="3" cy="-26" r="0.9" fill="#590925" opacity="0.7" />
                      <circle cx="-2" cy="-34" r="0.8" fill="#590925" opacity="0.7" />
                    </g>
                  ))}
                  {/* Speckles & Golden-Orange Stamens */}
                  <g stroke="#D89A3C" strokeWidth="1.4" fill="none">
                    <path d="M0,0 Q-12,-24 -18,-38" />
                    <path d="M0,0 Q-4,-28 -6,-44" />
                    <path d="M0,0 Q5,-28 8,-44" />
                    <path d="M0,0 Q14,-24 20,-36" />
                  </g>
                  <g fill="#C85A18">
                    <ellipse cx="-18" cy="-38" rx="3" ry="1.6" transform="rotate(-25 -18 -38)" />
                    <ellipse cx="-6" cy="-44" rx="3" ry="1.6" transform="rotate(-10 -6 -44)" />
                    <ellipse cx="8" cy="-44" rx="3" ry="1.6" transform="rotate(12 8 -44)" />
                    <ellipse cx="20" cy="-36" rx="3" ry="1.6" transform="rotate(28 20 -36)" />
                  </g>
                </g>

                {/* Lower Secondary Blooming Stargazer Lily */}
                <g transform="translate(92, 188) rotate(-25) scale(0.76)" filter="url(#progFloralShadow)">
                  {[-105, -52, 0, 52, 105, 175].map((ang, idx) => (
                    <g key={`sg2-${idx}`} transform={`rotate(${ang})`}>
                      <path
                        d="M0,0 C-15,-18 -18,-48 0,-62 C18,-48 15,-18 0,0 Z"
                        fill="url(#stargazerPetal)"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                    </g>
                  ))}
                  <g stroke="#D89A3C" strokeWidth="1.4" fill="none">
                    <path d="M0,0 Q-10,-22 -15,-34" />
                    <path d="M0,0 Q2,-26 4,-38" />
                    <path d="M0,0 Q12,-22 16,-32" />
                  </g>
                  <g fill="#C85A18">
                    <circle cx="-15" cy="-34" r="2.5" />
                    <circle cx="4" cy="-38" r="2.5" />
                    <circle cx="16" cy="-32" r="2.5" />
                  </g>
                </g>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (Cols 7-12): Soft Alabaster Program Timeline (Side-by-Side Thumbnail + Timeline on Phone, Tablet & PC) */}
        <div className="relative lg:col-span-6 bg-[#F4F4F4] flex flex-col justify-center py-12 sm:py-18 lg:pt-36 lg:pb-24 px-4 sm:px-10 lg:pl-28 lg:pr-16">
          {/* 3 Stacked Program Rows — Always Side-by-Side Thumbnail + Timeline on Phone & Tablet, Straddling on Desktop */}
          <div className="space-y-9 sm:space-y-14 max-w-lg mx-auto lg:mx-0 w-full">
            {PROGRAM_BLOCKS.map((block, blockIdx) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.85,
                  delay: blockIdx * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-row lg:block items-center gap-3.5 sm:gap-5"
              >
                {/* Square Thumbnail with Crisp White Inner Frame Border */}
                {/* Side-by-side on Phone & Tablet (`w-24 h-24 sm:w-32 sm:h-32`), straddling center seam on Desktop (`lg:absolute lg:-left-[184px]`) */}
                <motion.button
                  type="button"
                  onClick={() =>
                    onSelectPortrait?.({
                      ...POLAROID_MEMORIES[block.memoryIndex],
                      title: `${block.title} — आशीष & तन्नू`,
                      imageSrc: portraits[block.portraitKey],
                    })
                  }
                  aria-label={`View ${block.title} portrait`}
                  initial={{ opacity: 0, scale: 0.84 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 18,
                    delay: blockIdx * 0.14 + 0.08,
                  }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative lg:absolute lg:-left-[184px] lg:top-1/2 lg:-translate-y-1/2 w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 shrink-0 bg-[#DDD4CA] shadow-[0_10px_28px_rgba(0,0,0,0.14)] overflow-hidden cursor-pointer group z-20"
                >
                  <img
                    src={portraits[block.portraitKey]}
                    alt={block.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Thin White Inset Square Frame */}
                  <div className="absolute inset-1.5 sm:inset-2 border border-white/90 pointer-events-none" />
                </motion.button>

                {/* Program Title & 3 Horizontal Line Rows */}
                <div className="w-full min-w-0 text-left">
                  <div className="flex flex-wrap items-baseline justify-between gap-1.5 mb-2.5 sm:mb-3.5">
                    <h3 className="font-pinyon text-2xl xs:text-3xl sm:text-4xl text-[#1E3148] leading-none tracking-normal">
                      {block.title}
                    </h3>
                    <span
                      className="text-[10px] sm:text-xs text-[#5C6B7A] font-medium"
                      style={{ fontFamily: 'var(--font-hindi)' }}
                    >
                      {block.subtitleHindi}
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-2.5">
                    {block.items.map((item, itemIdx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.6,
                          delay: blockIdx * 0.14 + itemIdx * 0.1 + 0.14,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="grid grid-cols-[92px_1fr_62px] xs:grid-cols-[105px_1fr_70px] sm:grid-cols-[125px_1fr_90px] items-center gap-2 sm:gap-3 group/row"
                      >
                        <span className="font-serif text-xs sm:text-[15px] text-[#3A4D63] group-hover/row:text-[#182635] transition-colors font-medium truncate">
                          {item.label}
                        </span>
                        {/* Animated Horizontal Timeline Line Drawing from Left to Right */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{
                            duration: 0.85,
                            delay: blockIdx * 0.14 + itemIdx * 0.12 + 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{ transformOrigin: 'left center' }}
                          className="h-px w-full bg-[#8E9AA6]/70 group-hover/row:bg-[#1E3148] transition-colors"
                        />
                        <span className="font-sans text-[10px] sm:text-[13px] text-[#4A5D70] group-hover/row:text-[#182635] transition-colors font-medium text-right tabular-nums whitespace-nowrap">
                          {item.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DESKTOP CENTER-STRADDLING STYLED HEADING: "The Programs" */}
        <motion.div
          initial={{ opacity: 0, y: -22, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col items-center absolute top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none text-center"
        >
          <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-[#5C6B7A] mb-0.5">
            SHUBH VIVAH UTSAV
          </span>
          <h2 className="font-pinyon text-6xl xl:text-[68px] text-[#1E3148] leading-none whitespace-nowrap drop-shadow-[0_2px_10px_rgba(255,255,255,0.65)]">
            The Programs
          </h2>
          <p
            className="text-base text-[#4A5D70] font-medium mt-1"
            style={{ fontFamily: 'var(--font-hindi)' }}
          >
            आशीष &amp; तन्नू — मांगलिक कार्यक्रम
          </p>
        </motion.div>
      </div>
    </section>
  );
};
