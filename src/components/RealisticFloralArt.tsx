import React from 'react';
import { motion } from 'motion/react';

/**
 * Hyper-detailed, multi-layered botanical SVG illustrations with realistic
 * radial/linear petal shading, veins, stamens, dew highlights, and soft drop shadows.
 */

export const RealisticLotusClusterSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 280 270" className={className} fill="none">
    <defs>
      {/* Realistic Multi-Stop Lotus Outer Petal Gradient */}
      <linearGradient id="realLotusOuter" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#8E1635" />
        <stop offset="18%" stopColor="#C83E62" />
        <stop offset="48%" stopColor="#EDA0B4" />
        <stop offset="78%" stopColor="#FCE4EC" />
        <stop offset="100%" stopColor="#D96B86" />
      </linearGradient>

      {/* Realistic Inner Cupped Petal Gradient */}
      <linearGradient id="realLotusInner" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#A51C40" />
        <stop offset="28%" stopColor="#E46C8C" />
        <stop offset="65%" stopColor="#FFF0F5" />
        <stop offset="90%" stopColor="#FCE4EC" />
        <stop offset="100%" stopColor="#C85A76" />
      </linearGradient>

      {/* Deep Base Shadow Petal Gradient */}
      <linearGradient id="realLotusBase" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#B83356" />
        <stop offset="50%" stopColor="#7A122C" />
        <stop offset="100%" stopColor="#420716" />
      </linearGradient>

      {/* Golden Seed Pod & Stamen Crown */}
      <radialGradient id="realLotusPod" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#FFF2A6" />
        <stop offset="45%" stopColor="#F5B82E" />
        <stop offset="80%" stopColor="#C97310" />
        <stop offset="100%" stopColor="#6E3504" />
      </radialGradient>

      {/* Realistic Veined Lotus Pad Leaf */}
      <radialGradient id="realPadGrad" cx="40%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#9CC987" />
        <stop offset="45%" stopColor="#649955" />
        <stop offset="82%" stopColor="#3B6931" />
        <stop offset="100%" stopColor="#23451C" />
      </radialGradient>

      <filter id="petalSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#3A0B19" floodOpacity="0.28" />
      </filter>
    </defs>

    {/* =================================================================== */}
    {/* 1. UPPER-RIGHT REALISTIC SCALLOPED GREEN LOTUS PAD                  */}
    {/* =================================================================== */}
    <g transform="translate(205, 54) rotate(16)" filter="url(#petalSoftShadow)">
      <path
        d="M0,-28 C18,-30 36,-20 40,-4 C43,12 32,26 14,29 C0,31 -10,24 -6,12 C-12,22 -26,26 -36,16 C-44,6 -40,-14 -24,-24 C-14,-29 -6,-28 0,-28 Z"
        fill="url(#realPadGrad)"
        stroke="#8AB878"
        strokeWidth="0.8"
      />
      {/* Radiating Leaf Veins */}
      <g stroke="#C8E6B8" strokeWidth="0.9" strokeLinecap="round" opacity="0.65">
        <path d="M-2,2 Q-18,-8 -28,-14" />
        <path d="M-2,2 Q-8,-14 -12,-24" />
        <path d="M-2,2 Q6,-14 14,-24" />
        <path d="M-2,2 Q18,-8 32,-8" />
        <path d="M-2,2 Q20,8 28,16" />
        <path d="M-2,2 Q4,16 8,24" />
        <path d="M-2,2 Q-16,12 -28,14" />
      </g>
      <circle cx="-2" cy="2" r="2.5" fill="#DCECC8" />
    </g>

    {/* =================================================================== */}
    {/* 2. LOWER-LEFT REALISTIC SCALLOPED GREEN LOTUS PAD                   */}
    {/* =================================================================== */}
    <g transform="translate(54, 196) rotate(-26)" filter="url(#petalSoftShadow)">
      <path
        d="M0,-30 C20,-32 38,-22 42,-4 C45,14 34,28 15,31 C0,33 -10,25 -6,12 C-12,24 -28,28 -38,17 C-46,6 -42,-15 -25,-26 C-15,-31 -6,-30 0,-30 Z"
        fill="url(#realPadGrad)"
        stroke="#8AB878"
        strokeWidth="0.8"
      />
      <g stroke="#C8E6B8" strokeWidth="0.9" strokeLinecap="round" opacity="0.65">
        <path d="M-2,2 Q-18,-8 -30,-15" />
        <path d="M-2,2 Q-8,-15 -13,-26" />
        <path d="M-2,2 Q6,-15 15,-26" />
        <path d="M-2,2 Q20,-8 34,-8" />
        <path d="M-2,2 Q22,8 30,17" />
        <path d="M-2,2 Q4,17 9,26" />
        <path d="M-2,2 Q-17,13 -30,15" />
      </g>
      <circle cx="-2" cy="2" r="2.5" fill="#DCECC8" />
    </g>

    {/* =================================================================== */}
    {/* 3. TOP-RIGHT SECONDARY BLOOMING LOTUS                               */}
    {/* =================================================================== */}
    <g transform="translate(168, 62) rotate(14) scale(0.76)" filter="url(#petalSoftShadow)">
      {/* Back Crimson Base Petals */}
      {[125, 152, 180, -152, -125].map((deg) => (
        <path
          key={`b-${deg}`}
          d="M0,0 C-18,-18 -20,-46 0,-64 C20,-46 18,-18 0,0 Z"
          fill="url(#realLotusBase)"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Outer Wide Petals with Veins */}
      {[-82, -54, -26, 0, 26, 54, 82, 112, -112].map((deg) => (
        <g key={`o-${deg}`} transform={`rotate(${deg})`}>
          <path
            d="M0,0 C-19,-22 -17,-54 0,-70 C17,-54 19,-22 0,0 Z"
            fill="url(#realLotusOuter)"
          />
          <path d="M0,-6 L0,-62" stroke="#B83B5E" strokeWidth="0.7" opacity="0.45" />
        </g>
      ))}
      {/* Inner Cupped Petals */}
      {[-62, -34, -8, 18, 44, 70, 100, -100].map((deg) => (
        <g key={`i-${deg}`} transform={`rotate(${deg})`}>
          <path
            d="M0,0 C-14,-18 -13,-42 0,-54 C13,-42 14,-18 0,0 Z"
            fill="url(#realLotusInner)"
          />
        </g>
      ))}
      {/* Golden Stamen Ring & Seed Receptacle */}
      {Array.from({ length: 18 }).map((_, idx) => (
        <g key={`st-${idx}`} transform={`rotate(${idx * 20})`}>
          <line x1="0" y1="0" x2="0" y2="-22" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="0" cy="-23" r="1.6" fill="#FEF08A" />
        </g>
      ))}
      <circle cx="0" cy="0" r="13" fill="url(#realLotusPod)" />
      <circle cx="-4" cy="-3" r="1.4" fill="#78350F" opacity="0.6" />
      <circle cx="4" cy="-3" r="1.4" fill="#78350F" opacity="0.6" />
      <circle cx="0" cy="4" r="1.4" fill="#78350F" opacity="0.6" />
    </g>

    {/* =================================================================== */}
    {/* 4. LOWER-LEFT SECONDARY BLOOMING LOTUS                              */}
    {/* =================================================================== */}
    <g transform="translate(66, 154) rotate(-26) scale(0.74)" filter="url(#petalSoftShadow)">
      {[125, 152, 180, -152, -125].map((deg) => (
        <path
          key={`lb-${deg}`}
          d="M0,0 C-18,-18 -20,-46 0,-64 C20,-46 18,-18 0,0 Z"
          fill="url(#realLotusBase)"
          transform={`rotate(${deg})`}
        />
      ))}
      {[-82, -54, -26, 0, 26, 54, 82, 112, -112].map((deg) => (
        <g key={`lo-${deg}`} transform={`rotate(${deg})`}>
          <path
            d="M0,0 C-19,-22 -17,-54 0,-70 C17,-54 19,-22 0,0 Z"
            fill="url(#realLotusOuter)"
          />
          <path d="M0,-6 L0,-62" stroke="#B83B5E" strokeWidth="0.7" opacity="0.45" />
        </g>
      ))}
      {[-62, -34, -8, 18, 44, 70, 100, -100].map((deg) => (
        <path
          key={`li-${deg}`}
          d="M0,0 C-14,-18 -13,-42 0,-54 C13,-42 14,-18 0,0 Z"
          fill="url(#realLotusInner)"
          transform={`rotate(${deg})`}
        />
      ))}
      {Array.from({ length: 16 }).map((_, idx) => (
        <g key={`lst-${idx}`} transform={`rotate(${idx * 22.5})`}>
          <line x1="0" y1="0" x2="0" y2="-21" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="0" cy="-22" r="1.5" fill="#FEF08A" />
        </g>
      ))}
      <circle cx="0" cy="0" r="12.5" fill="url(#realLotusPod)" />
    </g>

    {/* =================================================================== */}
    {/* 5. CENTER GRAND HERO BLOOMING SACRED LOTUS                          */}
    {/* =================================================================== */}
    <g transform="translate(110, 102) rotate(-14) scale(0.98)" filter="url(#petalSoftShadow)">
      {/* Deep Crimson Reflexed Base Petals */}
      {[118, 142, 166, -166, -142, -118].map((deg) => (
        <path
          key={`hb-${deg}`}
          d="M0,0 C-21,-20 -22,-50 0,-68 C22,-50 21,-20 0,0 Z"
          fill="url(#realLotusBase)"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Outer Layer Sculpted Petals with Delicate Veining */}
      {[-88, -62, -36, -12, 12, 36, 62, 88, 114, -114].map((deg) => (
        <g key={`ho-${deg}`} transform={`rotate(${deg})`}>
          <path
            d="M0,0 C-21,-24 -18,-56 0,-74 C18,-56 21,-24 0,0 Z"
            fill="url(#realLotusOuter)"
          />
          <path d="M0,-8 L0,-66" stroke="#A6294C" strokeWidth="0.75" opacity="0.42" />
          <path d="M0,-16 Q-7,-38 -5,-56" stroke="#C84B6E" strokeWidth="0.5" opacity="0.35" />
          <path d="M0,-16 Q7,-38 5,-56" stroke="#C84B6E" strokeWidth="0.5" opacity="0.35" />
        </g>
      ))}
      {/* Middle Cupped Layer Petals */}
      {[-72, -46, -20, 4, 28, 52, 76, 102, -102].map((deg) => (
        <g key={`hm-${deg}`} transform={`rotate(${deg})`}>
          <path
            d="M0,0 C-16,-20 -14,-46 0,-58 C14,-46 16,-20 0,0 Z"
            fill="url(#realLotusInner)"
          />
          <path d="M0,-6 L0,-50" stroke="#D15A7C" strokeWidth="0.6" opacity="0.4" />
        </g>
      ))}
      {/* Innermost Upright Petals */}
      {[-50, -24, 0, 24, 50].map((deg) => (
        <path
          key={`hi-${deg}`}
          d="M0,2 C-12,-14 -11,-34 0,-44 C11,-34 12,-14 0,2 Z"
          fill="url(#realLotusInner)"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Golden Filaments & Anthers */}
      {Array.from({ length: 24 }).map((_, idx) => (
        <g key={`hst-${idx}`} transform={`rotate(${idx * 15})`}>
          <line x1="0" y1="0" x2="0" y2="-24" stroke="#EAB308" strokeWidth="1.2" />
          <ellipse cx="0" cy="-25.5" rx="1.4" ry="2.2" fill="#FEF08A" />
        </g>
      ))}
      {/* Central Seed Pod Crown */}
      <circle cx="0" cy="0" r="14.5" fill="url(#realLotusPod)" />
      {[
        [-5, -4],
        [5, -4],
        [0, -7],
        [-6, 3],
        [6, 3],
        [0, 6],
        [0, 0],
      ].map(([cx, cy], i) => (
        <circle key={`seed-${i}`} cx={cx} cy={cy} r="1.5" fill="#92400E" opacity="0.7" />
      ))}
    </g>
  </svg>
);

export const RealisticAlstroemeriaSprigSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 230 240" className={className} fill="none">
    <defs>
      <linearGradient id="realAlstroRose" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FCE4EC" />
        <stop offset="32%" stopColor="#F395A8" />
        <stop offset="72%" stopColor="#D64864" />
        <stop offset="100%" stopColor="#8A1930" />
      </linearGradient>
      <linearGradient id="realAlstroNectar" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#F9D5DF" />
        <stop offset="35%" stopColor="#FFF5CC" />
        <stop offset="70%" stopColor="#F39682" />
        <stop offset="100%" stopColor="#C23B52" />
      </linearGradient>
      <linearGradient id="realLeafDeep" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7A9E5E" />
        <stop offset="55%" stopColor="#4A6E35" />
        <stop offset="100%" stopColor="#263D18" />
      </linearGradient>
      <filter id="alstroShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#2E1018" floodOpacity="0.24" />
      </filter>
    </defs>

    {/* Natural Curved Botanical Stems & Leaves */}
    <g stroke="#3F5E2A" strokeLinecap="round" fill="none">
      <path d="M52,218 C82,180 108,142 132,96" strokeWidth="3.8" />
      <path d="M84,182 C112,158 144,138 168,112" strokeWidth="3" />
      <path d="M96,158 C74,136 66,112 68,88" strokeWidth="2.8" />
    </g>
    <g fill="url(#realLeafDeep)">
      <path d="M74,174 C52,168 36,154 30,138 C52,142 66,154 74,174 Z" />
      <path d="M106,156 C130,162 148,154 160,138 C138,136 120,144 106,156 Z" />
      <path d="M88,194 C108,204 126,198 136,184 C116,182 100,186 88,194 Z" />
    </g>

    {/* Blossom 1: Top Main Peruvian Lily */}
    <g transform="translate(122, 68) rotate(-8)" filter="url(#alstroShadow)">
      {[-120, -60, 0, 60, 120, 180].map((deg, idx) => (
        <g key={`b1-${deg}`} transform={`rotate(${deg})`}>
          <path
            d="M0,0 C-15,-16 -19,-38 0,-48 C19,-38 15,-16 0,0 Z"
            fill={idx === 1 || idx === 3 ? 'url(#realAlstroNectar)' : 'url(#realAlstroRose)'}
          />
          <path d="M0,-4 L0,-40" stroke="#9C223D" strokeWidth="0.65" opacity="0.45" />
        </g>
      ))}
      {/* Characteristic Dark Crimson Tiger Whiskers / Speckles */}
      <g fill="#5C0E1E" opacity="0.82">
        <ellipse cx="-5" cy="-22" rx="1.1" ry="2.4" transform="rotate(-18 -5 -22)" />
        <ellipse cx="4" cy="-25" rx="1.1" ry="2.4" transform="rotate(14 4 -25)" />
        <ellipse cx="0" cy="-18" rx="1" ry="2.2" />
        <ellipse cx="8" cy="-19" rx="1" ry="2.2" transform="rotate(25 8 -19)" />
        <ellipse cx="-8" cy="-17" rx="1" ry="2.2" transform="rotate(-25 -8 -17)" />
      </g>
      {/* Curving Stamens */}
      <g stroke="#E59866" strokeWidth="1.1" fill="none">
        <path d="M0,0 Q-6,-14 -10,-22" />
        <path d="M0,0 Q0,-16 2,-25" />
        <path d="M0,0 Q8,-14 12,-20" />
      </g>
      <circle cx="-10" cy="-22" r="2" fill="#D4AC0D" />
      <circle cx="2" cy="-25" r="2" fill="#D4AC0D" />
      <circle cx="12" cy="-20" r="2" fill="#D4AC0D" />
    </g>

    {/* Blossom 2: Left Open Lily */}
    <g transform="translate(72, 110) rotate(-32) scale(0.92)" filter="url(#alstroShadow)">
      {[-120, -60, 0, 60, 120, 180].map((deg, idx) => (
        <path
          key={`b2-${deg}`}
          d="M0,0 C-14,-15 -18,-36 0,-45 C18,-36 14,-15 0,0 Z"
          fill={idx === 2 || idx === 4 ? 'url(#realAlstroNectar)' : 'url(#realAlstroRose)'}
          transform={`rotate(${deg})`}
        />
      ))}
      <g fill="#5C0E1E" opacity="0.8">
        <circle cx="-4" cy="-19" r="1.3" />
        <circle cx="3" cy="-22" r="1.2" />
        <circle cx="0" cy="-15" r="1.3" />
      </g>
      <circle cx="0" cy="-4" r="3.5" fill="#F4D03F" />
    </g>

    {/* Blossom 3: Right Open Lily */}
    <g transform="translate(164, 108) rotate(24) scale(0.94)" filter="url(#alstroShadow)">
      {[-120, -60, 0, 60, 120, 180].map((deg, idx) => (
        <path
          key={`b3-${deg}`}
          d="M0,0 C-14,-15 -18,-36 0,-45 C18,-36 14,-15 0,0 Z"
          fill={idx === 1 || idx === 5 ? 'url(#realAlstroNectar)' : 'url(#realAlstroRose)'}
          transform={`rotate(${deg})`}
        />
      ))}
      <g fill="#5C0E1E" opacity="0.8">
        <circle cx="-3" cy="-20" r="1.3" />
        <circle cx="4" cy="-18" r="1.2" />
        <circle cx="0" cy="-14" r="1.3" />
      </g>
      <circle cx="0" cy="-4" r="3.5" fill="#F4D03F" />
    </g>

    {/* Blossom 4: Lower Center Lily */}
    <g transform="translate(128, 152) rotate(12) scale(0.84)" filter="url(#alstroShadow)">
      {[-120, -60, 0, 60, 120, 180].map((deg, idx) => (
        <path
          key={`b4-${deg}`}
          d="M0,0 C-14,-15 -18,-36 0,-44 C18,-36 14,-15 0,0 Z"
          fill={idx % 2 === 0 ? 'url(#realAlstroRose)' : 'url(#realAlstroNectar)'}
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="-3" r="3.2" fill="#F4D03F" />
    </g>
  </svg>
);

/**
 * Ambient Floating Realistic Botanical Petals Layer
 * Gently drifts realistic shaded blush-pink lotus & lily petals with depth-of-field.
 */
const FLOATING_PETALS = [
  { id: 1, left: '6%', top: '16%', size: 26, duration: 11, delay: 0, rot: 25 },
  { id: 2, left: '19%', top: '58%', size: 22, duration: 13, delay: 1.5, rot: -35 },
  { id: 3, left: '82%', top: '18%', size: 28, duration: 12, delay: 0.8, rot: 42 },
  { id: 4, left: '91%', top: '62%', size: 24, duration: 14, delay: 2.1, rot: -20 },
  { id: 5, left: '46%', top: '10%', size: 20, duration: 10, delay: 1.1, rot: 15 },
  { id: 6, left: '68%', top: '78%', size: 25, duration: 12.5, delay: 2.7, rot: -45 },
];

export const FloatingRealisticPetals: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
    {FLOATING_PETALS.map((petal, idx) => (
      <motion.div
        key={petal.id}
        style={{
          left: petal.left,
          top: petal.top,
          width: petal.size,
          height: petal.size,
        }}
        animate={{
          y: [0, -34, 8, 0],
          x: [0, idx % 2 === 0 ? 18 : -18, idx % 2 === 0 ? -8 : 8, 0],
          rotate: [petal.rot, petal.rot + 28, petal.rot - 14, petal.rot],
        }}
        transition={{
          duration: petal.duration,
          delay: petal.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute drop-shadow-[0_6px_10px_rgba(90,20,40,0.22)] opacity-85"
      >
        <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`floatPetalGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF5F8" />
              <stop offset="45%" stopColor="#F6B4C6" />
              <stop offset="85%" stopColor="#DE6888" />
              <stop offset="100%" stopColor="#A8284C" />
            </linearGradient>
          </defs>
          <path
            d="M20,36 C8,28 4,14 14,6 C20,2 26,4 28,10 C34,18 30,30 20,36 Z"
            fill={`url(#floatPetalGrad-${petal.id})`}
          />
          <path
            d="M20,34 Q18,20 21,8"
            stroke="#C44569"
            strokeWidth="0.6"
            fill="none"
            opacity="0.45"
          />
        </svg>
      </motion.div>
    ))}
  </div>
);
