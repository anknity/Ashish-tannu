import React from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface FloralCountdownSectionProps {
  days: string;
  hours: string;
  mins: string;
  secs: string;
}

export const FloralCountdownSection: React.FC<FloralCountdownSectionProps> = ({
  days,
  hours,
  mins,
  secs,
}) => {
  return (
    <section
      id="floral-countdown"
      className="relative w-full bg-white py-12 sm:py-20 px-3 sm:px-6 border-b border-[#EFECE6] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 lg:gap-10 place-items-center">
        {/* =============================================================== */}
        {/* CIRCLE 1: DAYS (Realistic Veined Tropical Pink Hibiscus)        */}
        {/* =============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.88 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, scale: 1.03 }}
          className="relative w-36 h-36 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-white shadow-[0_12px_38px_rgba(0,0,0,0.08)] border border-[#F0F0F0] flex flex-col items-center justify-center cursor-default"
        >
          {/* Inner Thin Ring Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-full border border-[#D4D4D4] pointer-events-none" />

          {/* Top-Left Realistic Multi-Layered Pink Hibiscus SVG */}
          <motion.svg
            animate={{ rotate: [-4, 4, -4], y: [0, -3, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2.5 -left-2.5 sm:-top-3.5 sm:-left-3.5 w-16 h-16 sm:w-22 sm:h-22 pointer-events-none z-10 drop-shadow-[0_6px_12px_rgba(120,25,50,0.26)]"
            viewBox="0 0 120 120"
            fill="none"
          >
            <defs>
              <radialGradient id="realHibiscusPetal" cx="50%" cy="75%" r="75%">
                <stop offset="0%" stopColor="#6E0D25" />
                <stop offset="28%" stopColor="#B8294E" />
                <stop offset="65%" stopColor="#EB7A96" />
                <stop offset="92%" stopColor="#FAD2DC" />
                <stop offset="100%" stopColor="#FFF0F4" />
              </radialGradient>
              <linearGradient id="hibiscusLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7BA35A" />
                <stop offset="100%" stopColor="#3B5E23" />
              </linearGradient>
            </defs>
            {/* Subtle Green Calyx Leaves Behind */}
            <path d="M26,42 C12,32 10,18 22,16 C32,20 34,32 26,42 Z" fill="url(#hibiscusLeaf)" />
            <path d="M44,24 C42,10 54,6 62,14 C58,24 50,26 44,24 Z" fill="url(#hibiscusLeaf)" />

            <g transform="translate(60, 62) rotate(-18)">
              {[0, 72, 144, 216, 288].map((deg) => (
                <g key={deg} transform={`rotate(${deg})`}>
                  <path
                    d="M0,0 C-20,-14 -28,-40 -4,-46 C0,-44 4,-46 8,-45 C28,-38 18,-14 0,0 Z"
                    fill="url(#realHibiscusPetal)"
                    stroke="#F4B8C8"
                    strokeWidth="0.6"
                  />
                  {/* Delicate Radiating Petal Veins */}
                  <path d="M0,-6 L0,-40" stroke="#8F1836" strokeWidth="0.7" opacity="0.45" />
                  <path d="M0,-12 Q-8,-26 -10,-36" stroke="#A62444" strokeWidth="0.5" opacity="0.38" />
                  <path d="M0,-12 Q8,-26 10,-36" stroke="#A62444" strokeWidth="0.5" opacity="0.38" />
                </g>
              ))}
              {/* Deep Velvet Throat & Extended Golden Pollen Stamen Column */}
              <circle cx="0" cy="0" r="8" fill="#59091D" />
              <path d="M0,0 Q8,-14 14,-22" stroke="#E04F70" strokeWidth="2.4" strokeLinecap="round" />
              {[
                [10, -15],
                [13, -18],
                [8, -18],
                [15, -22],
                [12, -23],
              ].map(([cx, cy], idx) => (
                <circle key={idx} cx={cx} cy={cy} r="1.8" fill="#FDE047" />
              ))}
              <circle cx="15.5" cy="-23.5" r="2.2" fill="#991B1B" />
            </g>
          </motion.svg>

          <div className="relative h-11 sm:h-16 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={days}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-light text-[#2B2B2B] leading-none tracking-tight tabular-nums block"
              >
                {days}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="font-sans text-[11px] sm:text-[15px] text-[#666666] mt-1.5 sm:mt-3 font-normal tracking-wide">
            Days
          </span>
        </motion.div>

        {/* =============================================================== */}
        {/* CIRCLE 2: HOURS (Realistic Multi-Layered Sakura Cherry Blossom) */}
        {/* =============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.88 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, scale: 1.03 }}
          className="relative w-36 h-36 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-white shadow-[0_12px_38px_rgba(0,0,0,0.08)] border border-[#F0F0F0] flex flex-col items-center justify-center cursor-default"
        >
          {/* Inner Thin Ring Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-full border border-[#D4D4D4] pointer-events-none" />

          {/* Bottom-Right Realistic Double-Layered Sakura Blossom SVG */}
          <motion.svg
            animate={{ rotate: [3, -4, 3], y: [0, 3, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2.5 right-1 sm:-bottom-3.5 sm:right-2 w-16 h-16 sm:w-22 sm:h-22 pointer-events-none z-10 drop-shadow-[0_6px_12px_rgba(140,50,80,0.24)]"
            viewBox="0 0 120 120"
            fill="none"
          >
            <defs>
              <radialGradient id="realSakuraGrad" cx="50%" cy="80%" r="75%">
                <stop offset="0%" stopColor="#9E1F46" />
                <stop offset="32%" stopColor="#E67E9E" />
                <stop offset="72%" stopColor="#FADCE6" />
                <stop offset="100%" stopColor="#FFF7FA" />
              </radialGradient>
            </defs>
            <g transform="translate(60, 60) rotate(14)">
              {/* Outer 5 Notched Sakura Petals */}
              {[0, 72, 144, 216, 288].map((deg) => (
                <g key={`so-${deg}`} transform={`rotate(${deg})`}>
                  <path
                    d="M0,0 C-17,-14 -22,-38 -5,-44 L0,-37 L5,-44 C22,-38 17,-14 0,0 Z"
                    fill="url(#realSakuraGrad)"
                    stroke="#F2B6C8"
                    strokeWidth="0.6"
                  />
                  <path d="M0,-4 L0,-32" stroke="#B83B62" strokeWidth="0.6" opacity="0.4" />
                </g>
              ))}
              {/* Inner 5 Offset Translucent Petals */}
              {[36, 108, 180, 252, 324].map((deg) => (
                <path
                  key={`si-${deg}`}
                  d="M0,0 C-12,-10 -15,-28 -3,-32 L0,-27 L3,-32 C15,-28 12,-10 0,0 Z"
                  fill="url(#realSakuraGrad)"
                  opacity="0.88"
                  transform={`rotate(${deg})`}
                />
              ))}
              {/* Crown of Delicate Crimson & Gold Stamens */}
              {Array.from({ length: 16 }).map((_, idx) => (
                <g key={idx} transform={`rotate(${idx * 22.5})`}>
                  <line x1="0" y1="0" x2="0" y2="-16" stroke="#C93B64" strokeWidth="0.85" />
                  <circle cx="0" cy="-17" r="1.4" fill="#FDE047" />
                </g>
              ))}
              <circle cx="0" cy="0" r="4.5" fill="#881337" />
            </g>
          </motion.svg>

          <div className="relative h-11 sm:h-16 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={hours}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-light text-[#2B2B2B] leading-none tracking-tight tabular-nums block"
              >
                {hours}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="font-sans text-[11px] sm:text-[15px] text-[#666666] mt-1.5 sm:mt-3 font-normal tracking-wide">
            Hours
          </span>
        </motion.div>

        {/* =============================================================== */}
        {/* CIRCLE 3: MINS (Realistic Multi-Layered Sacred Pink Lotus)      */}
        {/* =============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.88 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, scale: 1.03 }}
          className="relative w-36 h-36 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-white shadow-[0_12px_38px_rgba(0,0,0,0.08)] border border-[#F0F0F0] flex flex-col items-center justify-center cursor-default"
        >
          {/* Inner Thin Ring Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-full border border-[#D4D4D4] pointer-events-none" />

          {/* Top-Right Realistic Sacred Pink Lotus SVG */}
          <motion.svg
            animate={{ rotate: [-3, 5, -3], y: [0, -3.5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2.5 right-1 sm:-top-3.5 sm:right-2 w-16 h-16 sm:w-22 sm:h-22 pointer-events-none z-10 drop-shadow-[0_6px_12px_rgba(130,30,55,0.26)]"
            viewBox="0 0 120 120"
            fill="none"
          >
            <defs>
              <linearGradient id="cdRealLotusOuter" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#8E1635" />
                <stop offset="25%" stopColor="#D6486C" />
                <stop offset="68%" stopColor="#F8C8D6" />
                <stop offset="100%" stopColor="#FFF0F5" />
              </linearGradient>
              <linearGradient id="cdRealLotusInner" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#B8294E" />
                <stop offset="45%" stopColor="#F294AE" />
                <stop offset="90%" stopColor="#FFF5F8" />
                <stop offset="100%" stopColor="#D96B88" />
              </linearGradient>
            </defs>
            <g transform="translate(60, 62) rotate(12)">
              {[-78, -50, -24, 0, 24, 50, 78, 108, 140, 175, -140, -108].map((deg) => (
                <g key={`clo-${deg}`} transform={`rotate(${deg})`}>
                  <path
                    d="M0,0 C-14,-16 -12,-38 0,-48 C12,-38 14,-16 0,0 Z"
                    fill="url(#cdRealLotusOuter)"
                  />
                  <path d="M0,-4 L0,-42" stroke="#A62448" strokeWidth="0.5" opacity="0.4" />
                </g>
              ))}
              {[-56, -28, 0, 28, 56, 92, 132, -132, -92].map((deg) => (
                <path
                  key={`cli-${deg}`}
                  d="M0,0 C-10,-14 -9,-30 0,-38 C9,-30 10,-14 0,0 Z"
                  fill="url(#cdRealLotusInner)"
                  transform={`rotate(${deg})`}
                />
              ))}
              {Array.from({ length: 16 }).map((_, idx) => (
                <g key={idx} transform={`rotate(${idx * 22.5})`}>
                  <line x1="0" y1="0" x2="0" y2="-15" stroke="#F59E0B" strokeWidth="1" />
                  <circle cx="0" cy="-16" r="1.2" fill="#FEF08A" />
                </g>
              ))}
              <circle cx="0" cy="0" r="10" fill="#EAB308" />
              <circle cx="-3" cy="-2" r="1.2" fill="#78350F" opacity="0.65" />
              <circle cx="3" cy="-2" r="1.2" fill="#78350F" opacity="0.65" />
              <circle cx="0" cy="3" r="1.2" fill="#78350F" opacity="0.65" />
            </g>
          </motion.svg>

          <div className="relative h-11 sm:h-16 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={mins}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-light text-[#2B2B2B] leading-none tracking-tight tabular-nums block"
              >
                {mins}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="font-sans text-[11px] sm:text-[15px] text-[#666666] mt-1.5 sm:mt-3 font-normal tracking-wide">
            Mins
          </span>
        </motion.div>

        {/* =============================================================== */}
        {/* CIRCLE 4: SECS (Realistic Ruffled Multi-Petal Pink Peony)       */}
        {/* =============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.88 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, scale: 1.03 }}
          className="relative w-36 h-36 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-white shadow-[0_12px_38px_rgba(0,0,0,0.08)] border border-[#F0F0F0] flex flex-col items-center justify-center cursor-default"
        >
          {/* Inner Thin Ring Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-full border border-[#D4D4D4] pointer-events-none" />

          {/* Bottom-Right Realistic Multi-Petal Ruffled Pink Peony SVG */}
          <motion.svg
            animate={{ rotate: [4, -4, 4], y: [0, 3, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2.5 -right-1.5 sm:-bottom-3.5 sm:-right-1 w-16 h-16 sm:w-22 sm:h-22 pointer-events-none z-10 drop-shadow-[0_6px_12px_rgba(130,30,75,0.25)]"
            viewBox="0 0 120 120"
            fill="none"
          >
            <defs>
              <radialGradient id="realPeonyOuter" cx="50%" cy="65%" r="65%">
                <stop offset="0%" stopColor="#881337" />
                <stop offset="38%" stopColor="#D64878" />
                <stop offset="78%" stopColor="#F9CEDF" />
                <stop offset="100%" stopColor="#FFF5F9" />
              </radialGradient>
              <radialGradient id="realPeonyInner" cx="50%" cy="60%" r="60%">
                <stop offset="0%" stopColor="#B8295C" />
                <stop offset="50%" stopColor="#F294B8" />
                <stop offset="92%" stopColor="#FFF7FA" />
                <stop offset="100%" stopColor="#FADCE8" />
              </radialGradient>
            </defs>
            <g transform="translate(60, 60)">
              {/* Outer Ruffled Peony Ring */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <path
                  key={`po-${deg}`}
                  d="M0,0 C-14,-12 -18,-36 -5,-42 C0,-39 4,-43 8,-41 C18,-34 14,-12 0,0 Z"
                  fill="url(#realPeonyOuter)"
                  stroke="#F4B8D0"
                  strokeWidth="0.5"
                  transform={`rotate(${deg})`}
                />
              ))}
              {/* Middle Ruffled Peony Ring */}
              {[15, 51, 87, 123, 159, 195, 231, 267, 303, 339].map((deg) => (
                <path
                  key={`pm-${deg}`}
                  d="M0,0 C-11,-10 -14,-28 -3,-32 C0,-30 3,-33 6,-31 C14,-26 11,-10 0,0 Z"
                  fill="url(#realPeonyInner)"
                  stroke="#C94A78"
                  strokeWidth="0.45"
                  transform={`rotate(${deg})`}
                />
              ))}
              {/* Inner Cupped Ruffled Petals */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <ellipse
                  key={`pi-${deg}`}
                  cx="0"
                  cy="-13"
                  rx="7.5"
                  ry="11"
                  fill="url(#realPeonyInner)"
                  transform={`rotate(${deg})`}
                />
              ))}
              {/* Golden Peony Heart */}
              <circle cx="0" cy="0" r="8" fill="#F59E0B" />
              {[
                [-3, -3],
                [3, -3],
                [0, 3],
                [-4, 2],
                [4, 2],
                [0, -4],
              ].map(([cx, cy], idx) => (
                <circle key={idx} cx={cx} cy={cy} r="1.3" fill="#FEF08A" />
              ))}
            </g>
          </motion.svg>

          <div className="relative h-11 sm:h-16 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={secs}
                initial={{ y: 18, opacity: 0, filter: 'blur(2px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -18, opacity: 0, filter: 'blur(2px)' }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-light text-[#2B2B2B] leading-none tracking-tight tabular-nums block"
              >
                {secs}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="font-sans text-[11px] sm:text-[15px] text-[#666666] mt-1.5 sm:mt-3 font-normal tracking-wide">
            Secs
          </span>
        </motion.div>
      </div>
    </section>
  );
};
