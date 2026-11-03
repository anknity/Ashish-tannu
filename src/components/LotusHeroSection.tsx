import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  FloatingRealisticPetals,
  RealisticAlstroemeriaSprigSVG,
  RealisticLotusClusterSVG,
} from './RealisticFloralArt';
import {
  ORIGINAL_HALDI_SRC,
  ORIGINAL_MEHNDI_SRC,
} from '../utils/couplePortraitGenerator';

export const LotusHeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smooth parallax transforms on scroll
  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1.01, 1.08]);
  const archY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  return (
    <section
      ref={heroRef}
      id="screen-1-hero"
      className="relative w-full h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#243228]"
    >
      {/* =================================================================== */}
      {/* MOBILE HERO BACKDROP (< 768px):                                     */}
      {/* FULL-SCREEN 100dvh SINGLE ORIGINAL IMAGE WHERE GROOM (LEFT) &       */}
      {/* BRIDE (RIGHT) ARE CLEARLY VISIBLE SIDE-BY-SIDE AND OVAL NAMEPLATE   */}
      {/* COMES IN THE MIDDLE BELOW THEIR FACES                               */}
      {/* =================================================================== */}
      <motion.div
        style={{ y: backdropY, scale: backdropScale }}
        className="md:hidden absolute inset-0 w-full h-full overflow-hidden bg-[#243228]"
      >
        {/* Soft blurred ambient extension for seamless full-screen top/bottom coverage */}
        <img
          src={ORIGINAL_MEHNDI_SRC}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center blur-xl scale-110 opacity-85"
        />

        {/* Original Attached Couple Portrait Framed So Both Groom (Left) & Bride (Right) Are Clearly Visible Side-by-Side */}
        <img
          src={ORIGINAL_MEHNDI_SRC}
          alt="Ashish and Tannu Festive Mehndi & Wedding Portrait"
          className="relative w-full h-full object-cover object-[50%_18%]"
        />

        {/* Subtle warm vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35 pointer-events-none" />
      </motion.div>

      {/* =================================================================== */}
      {/* DESKTOP & TABLET HERO BACKDROP (>= 768px):                          */}
      {/* 2-COLUMN SPLIT WITH USER'S TWO ORIGINAL ATTACHED PORTRAITS          */}
      {/* Left: Original Joyful Haldi Portrait | Right: Original Mehndi       */}
      {/* =================================================================== */}
      <motion.div
        style={{ y: backdropY, scale: backdropScale }}
        className="hidden md:grid md:grid-cols-2 absolute inset-0 w-full h-full will-change-transform"
      >
        {/* Left Photo Panel: User's Original Joyful Haldi Ceremony Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08, x: -18 }}
          animate={{ opacity: 1, scale: 1.01, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full overflow-hidden border-r border-white/75"
        >
          <img
            src={ORIGINAL_HALDI_SRC}
            alt="Ashish and Tannu Original Haldi Ceremony Portrait"
            className="w-full h-full object-cover object-[50%_20%] transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/15 pointer-events-none" />
        </motion.div>

        {/* Right Photo Panel: User's Original Festive Mehndi Ceremony Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08, x: 18 }}
          animate={{ opacity: 1, scale: 1.01, x: 0 }}
          transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full overflow-hidden"
        >
          <img
            src={ORIGINAL_MEHNDI_SRC}
            alt="Ashish and Tannu Original Mehndi Ceremony Portrait"
            className="w-full h-full object-cover object-[50%_20%] transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-black/15 pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* Realistic Floating & Drifting Lotus/Rose Petals Across Hero */}
      <FloatingRealisticPetals />

      {/* =================================================================== */}
      {/* CENTER WHITE STADIUM OVAL SAVE-THE-DATE NAMEPLATE IN THE MIDDLE     */}
      {/* On Phone: Positioned in the Lower-Middle Center so Both Groom (Left)*/}
      {/* & Bride (Right) Are Clearly Visible Side-by-Side Above              */}
      {/* =================================================================== */}
      <motion.div
        style={{ y: archY }}
        initial={{ opacity: 0, y: 36, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 mt-48 xs:mt-52 sm:mt-44 md:mt-0 px-3 flex flex-col items-center justify-center will-change-transform"
      >
        <motion.div
          whileHover={{ scale: 1.012 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="relative w-[205px] xs:w-[225px] sm:w-[325px] md:w-[410px] min-h-[290px] xs:min-h-[320px] sm:min-h-[455px] md:min-h-[540px] bg-[#FDFCFB]/95 backdrop-blur-[2px] rounded-full shadow-[0_24px_65px_rgba(20,16,12,0.45)] flex flex-col items-center justify-center px-4 sm:px-8 py-6 sm:py-14 text-center"
        >
          {/* Inner Delicate Double-Line Oval Border */}
          <div className="absolute inset-2 sm:inset-3.5 rounded-full border border-[#EAE2DA] pointer-events-none" />
          <div className="absolute inset-3 sm:inset-5 rounded-full border border-[#F2ECE6] pointer-events-none" />

          {/* =============================================================== */}
          {/* TOP-LEFT HYPER-REALISTIC BLOOMING PINK LOTUS & VEINED PADS      */}
          {/* =============================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.55, rotate: -14 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [-2, 3, -2],
              y: [0, -5, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.38 },
              scale: { duration: 1.1, delay: 0.38, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute -top-6 -left-5 sm:-top-10 sm:-left-9 w-28 xs:w-32 sm:w-52 md:w-56 h-28 xs:h-32 sm:h-52 md:h-56 pointer-events-none z-30"
          >
            <RealisticLotusClusterSVG className="w-full h-full drop-shadow-[0_10px_18px_rgba(45,15,24,0.26)]" />
          </motion.div>

          {/* =============================================================== */}
          {/* BOTTOM-RIGHT HYPER-REALISTIC PINK ALSTROEMERIA / LILY CLUSTER   */}
          {/* =============================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.55, rotate: 14 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [2, -3, 2],
              y: [0, 4, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.52 },
              scale: { duration: 1.1, delay: 0.52, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute -bottom-5 -right-4 sm:-bottom-9 sm:-right-8 w-24 xs:w-28 sm:w-44 md:w-48 h-28 xs:h-32 sm:h-48 md:h-52 pointer-events-none z-30"
          >
            <RealisticAlstroemeriaSprigSVG className="w-full h-full drop-shadow-[0_10px_18px_rgba(45,15,24,0.24)]" />
          </motion.div>

          {/* =============================================================== */}
          {/* STAGGERED TYPOGRAPHY REVEAL INSIDE THE WHITE OVAL ARCH          */}
          {/* =============================================================== */}
          <div className="relative z-20 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[11px] xs:text-xs sm:text-lg md:text-[22px] tracking-[0.14em] uppercase text-[#8C705F] font-normal mb-2 sm:mb-6 md:mb-8"
            >
              SAVE THE DATE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.95, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-[64px] font-medium text-[#161616] leading-tight tracking-normal"
              style={{ fontFamily: 'var(--font-hindi)' }}
            >
              आशीष
            </motion.h1>

            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-lg xs:text-xl sm:text-3xl md:text-4xl text-[#2B2B2B] my-1 sm:my-3 md:my-4 font-light"
            >
              &amp;
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.95, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-[64px] font-medium text-[#161616] leading-tight tracking-normal"
              style={{ fontFamily: 'var(--font-hindi)' }}
            >
              तन्नू
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 sm:mt-8 md:mt-10 text-[10.5px] xs:text-xs sm:text-base md:text-[18px] text-[#1F1F1F] font-medium tracking-wide whitespace-nowrap"
              style={{ fontFamily: 'var(--font-hindi)' }}
            >
              09 दिसंबर 2026 &bull; दरियापुर बाज़ार
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
