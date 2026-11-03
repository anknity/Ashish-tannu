import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  POLAROID_MEMORIES,
  PolaroidMemory,
} from './data/weddingData';
import { LotusHeroSection } from './components/LotusHeroSection';
import { FloralCountdownSection } from './components/FloralCountdownSection';
import { TheProgramsSection } from './components/TheProgramsSection';
import { ScrollingMomentsGallery } from './components/ScrollingMomentsGallery';
import { PolaroidLightbox, StoryModal } from './components/Modals';
import { FloatingRealisticPetals } from './components/RealisticFloralArt';
import { useGeneratedCouplePortraits } from './utils/couplePortraitGenerator';

gsap.registerPlugin(ScrollTrigger);

// Attached Wedding Song MP3 ("Judi Jodi — सिया सिया राम")
const WEDDING_SONG_SRC =
  '/assets/aistudio/Ramayana_Judi_Jodi__Song__Namit_M__Nitesh_T_Ranbir_K__Sai_P_AR_Rahman__Shreya_G__Kumar_V_2ae035ff.mp3';

// 09 December 2026, 5:00 PM IST
const WEDDING_TARGET_DATE = new Date('2026-12-09T17:00:00+05:30');

export default function App() {
  // Generated wedding portraits featuring the exact Groom & Bride
  const portraits = useGeneratedCouplePortraits();

  // Real MP3 Audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userManuallyPausedRef = useRef(false);
  const [isPlayingSong, setIsPlayingSong] = useState(false);

  // Refs for GSAP ScrollTrigger ribbon & collage animations
  const collageSectionRef = useRef<HTMLElement | null>(null);
  const ribbonPathRef = useRef<SVGPathElement | null>(null);

  // Countdown state to 09 December 2026
  const [countdown, setCountdown] = useState({
    days: '36',
    hours: '08',
    mins: '15',
    secs: '42',
  });

  // Modals state (No forms — only Story & Portrait Lightbox)
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [lightboxMemory, setLightboxMemory] = useState<PolaroidMemory | null>(null);

  // Smooth Auto-play of the attached wedding song as soon as the user opens the site
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.85;

    const unlockEvents = [
      'pointerdown',
      'pointermove',
      'mousemove',
      'touchstart',
      'touchmove',
      'touchend',
      'wheel',
      'scroll',
      'keydown',
      'click',
    ];

    const removeUnlockListeners = () => {
      unlockEvents.forEach((evt) => {
        window.removeEventListener(evt, unlockAndPlay, true);
        document.removeEventListener(evt, unlockAndPlay, true);
      });
      document.removeEventListener('visibilitychange', unlockAndPlay);
      window.removeEventListener('focus', unlockAndPlay);
    };

    const unlockAndPlay = () => {
      const el = audioRef.current;
      if (!el || userManuallyPausedRef.current) return;

      el.muted = false;
      el.volume = 0.85;

      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!el.paused && !el.muted) {
              setIsPlayingSong(true);
              removeUnlockListeners();
            }
          })
          .catch(() => {
            // Keep listeners active until browser grants unmuted audio playback
          });
      }
    };

    const attemptInitialAutoplay = () => {
      if (userManuallyPausedRef.current) return;
      audio.muted = false;
      audio.volume = 0.85;

      audio
        .play()
        .then(() => {
          setIsPlayingSong(true);
          removeUnlockListeners();
        })
        .catch(() => {
          // Fallback: Start muted playback immediately so the audio stream is already running,
          // then unmute seamlessly on the very first micro-interaction (mouse move, touch, scroll, tap)
          audio.muted = true;
          audio
            .play()
            .then(() => {
              // Attempt immediate programmatic unmute
              setTimeout(() => {
                if (!userManuallyPausedRef.current && audioRef.current) {
                  audioRef.current.muted = false;
                  audioRef.current.volume = 0.85;
                  if (!audioRef.current.paused) {
                    setIsPlayingSong(true);
                  }
                }
              }, 120);
            })
            .catch(() => {});
        });
    };

    // Attach capture-phase listeners immediately so any gesture unlocks unmuted audio
    unlockEvents.forEach((evt) => {
      window.addEventListener(evt, unlockAndPlay, { capture: true, passive: true });
      document.addEventListener(evt, unlockAndPlay, { capture: true, passive: true });
    });
    document.addEventListener('visibilitychange', unlockAndPlay);
    window.addEventListener('focus', unlockAndPlay);

    attemptInitialAutoplay();
    audio.addEventListener('loadeddata', attemptInitialAutoplay);
    audio.addEventListener('canplaythrough', attemptInitialAutoplay);

    return () => {
      removeUnlockListeners();
      audio.removeEventListener('loadeddata', attemptInitialAutoplay);
      audio.removeEventListener('canplaythrough', attemptInitialAutoplay);
    };
  }, []);

  const toggleSongPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || audio.muted) {
      userManuallyPausedRef.current = false;
      audio.muted = false;
      audio.volume = 0.85;
      audio
        .play()
        .then(() => setIsPlayingSong(true))
        .catch(() => {});
    } else {
      userManuallyPausedRef.current = true;
      audio.pause();
      setIsPlayingSong(false);
    }
  };

  // Live Countdown Timer Effect
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = WEDDING_TARGET_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ days: '0', hours: '00', mins: '00', secs: '00' });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setCountdown({
        days: String(days),
        hours: String(hours).padStart(2, '0'),
        mins: String(mins).padStart(2, '0'),
        secs: String(secs).padStart(2, '0'),
      });
    };

    updateTimer();
    const timerId = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(timerId);
  }, []);

  // GSAP ScrollTrigger animation for the winding cream satin ribbon path in the flat-lay collage
  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = ribbonPathRef.current;
      const section = collageSectionRef.current;
      if (!path || !section) return;

      const totalLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength * 0.82,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 35%',
          scrub: 1.2,
        },
      });
    }, collageSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen selection:bg-powder-300 selection:text-prussian-950">
      {/* ===================================================================== */}
      {/* HIDDEN HTML5 AUDIO ELEMENT FOR AUTO-PLAYING "JUDI JODI" SONG          */}
      {/* ===================================================================== */}
      <audio
        ref={audioRef}
        src={WEDDING_SONG_SRC}
        autoPlay
        loop
        playsInline
        preload="auto"
        onPlay={() => {
          if (audioRef.current && !audioRef.current.muted) {
            setIsPlayingSong(true);
          }
        }}
        onPause={() => setIsPlayingSong(false)}
      />

      {/* ===================================================================== */}
      {/* FLOATING SPEAKER ICON BUTTON ONLY (Bottom-Right — Stop / Play Song)   */}
      {/* ===================================================================== */}
      <motion.button
        type="button"
        onClick={toggleSongPlayback}
        aria-label={isPlayingSong ? 'Stop wedding song' : 'Play wedding song'}
        title={isPlayingSong ? 'Mute / Stop Song' : 'Play Wedding Song'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-prussian-950/90 backdrop-blur-md border border-powder-300/45 flex items-center justify-center shadow-[0_10px_28px_rgba(8,15,26,0.55)] text-ivory-100 hover:text-white hover:border-powder-200 transition-colors cursor-pointer"
      >
        {/* Subtle pulsing soundwave ring when music is playing */}
        {isPlayingSong && (
          <span className="absolute inset-0 rounded-full border border-powder-300/55 animate-ping pointer-events-none" />
        )}
        {isPlayingSong ? (
          <Volume2 className="w-5 h-5 text-ivory-100" />
        ) : (
          <VolumeX className="w-5 h-5 text-powder-300" />
        )}
      </motion.button>

      {/* ===================================================================== */}
      {/* 1. HERO SECTION: FULL-BLEED PORTRAIT + LOTUS OVAL ARCH (No Navbar)    */}
      {/* ===================================================================== */}
      <LotusHeroSection />

      {/* ===================================================================== */}
      {/* 2. 4-CIRCLE FLORAL COUNTDOWN SECTION IMMEDIATELY AFTER HERO           */}
      {/* ===================================================================== */}
      <FloralCountdownSection
        days={countdown.days}
        hours={countdown.hours}
        mins={countdown.mins}
        secs={countdown.secs}
      />

      {/* ===================================================================== */}
      {/* 3. CASCADING FLAT-LAY INVITATION SUITE COLLAGE                        */}
      {/* Preserves Side-by-Side Overlapping Flat-Lay Layout on Phone, Tab & PC */}
      {/* ===================================================================== */}
      <section
        ref={collageSectionRef}
        id="invitation-collage"
        className="relative w-full prussian-felt-bg py-14 sm:py-28 px-2 sm:px-4 overflow-hidden"
      >
        {/* Realistic Floating Petals Drifting Over the Royal Blue Felt */}
        <FloatingRealisticPetals />

        {/* ================================================================= */}
        {/* ROYAL TEXTURED & DECORATIVE FILIGREE / MANDALA / BOTANICAL LAYER  */}
        {/* ================================================================= */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          {/* Outer Ornate Double Filigree Frame Border */}
          <div className="absolute inset-3 sm:inset-8 border border-powder-200/18 rounded-xl" />
          <div className="absolute inset-5 sm:inset-10 border border-dashed border-powder-200/12 rounded-lg" />

          {/* Top-Left Rotating Silver Mandala Medallion */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            viewBox="0 0 300 300"
            className="absolute -top-24 -left-24 sm:-top-28 sm:-left-28 w-56 sm:w-96 h-56 sm:h-96 opacity-20 text-powder-200"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="150" cy="150" r="138" strokeDasharray="4 4" />
              <circle cx="150" cy="150" r="118" />
              <circle cx="150" cy="150" r="92" strokeDasharray="2 5" />
              <circle cx="150" cy="150" r="64" />
              {Array.from({ length: 16 }).map((_, i) => (
                <path
                  key={`tl-petal-${i}`}
                  d="M150,150 C135,100 135,50 150,14 C165,50 165,100 150,150 Z"
                  transform={`rotate(${i * 22.5} 150 150)`}
                />
              ))}
            </g>
          </motion.svg>

          {/* Top-Right Rotating Silver Mandala Medallion */}
          <motion.svg
            animate={{ rotate: -360 }}
            transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
            viewBox="0 0 300 300"
            className="absolute -top-24 -right-24 sm:-top-28 sm:-right-28 w-56 sm:w-96 h-56 sm:h-96 opacity-20 text-powder-200"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="150" cy="150" r="138" strokeDasharray="4 4" />
              <circle cx="150" cy="150" r="118" />
              <circle cx="150" cy="150" r="92" strokeDasharray="2 5" />
              <circle cx="150" cy="150" r="64" />
              {Array.from({ length: 16 }).map((_, i) => (
                <path
                  key={`tr-petal-${i}`}
                  d="M150,150 C135,100 135,50 150,14 C165,50 165,100 150,150 Z"
                  transform={`rotate(${i * 22.5} 150 150)`}
                />
              ))}
            </g>
          </motion.svg>

          {/* Middle-Left & Middle-Right Botanical Silver Leaf Vines */}
          <svg
            viewBox="0 0 180 600"
            className="hidden lg:block absolute top-1/4 left-6 w-36 h-[520px] opacity-22 text-powder-200"
            fill="none"
            stroke="currentColor"
          >
            <path d="M90,20 Q40,160 90,300 T90,580" strokeWidth="1.2" strokeDasharray="3 3" />
            {[80, 170, 260, 350, 440, 520].map((y, idx) => (
              <g key={`lv-${idx}`} transform={`translate(90, ${y})`}>
                <path
                  d="M0,0 C-28,-18 -42,-8 -48,10 C-26,16 -12,10 0,0 Z"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
                <path
                  d="M0,0 C28,-18 42,-8 48,10 C26,16 12,10 0,0 Z"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
                <circle cx="0" cy="-14" r="3" fill="currentColor" />
              </g>
            ))}
          </svg>

          <svg
            viewBox="0 0 180 600"
            className="hidden lg:block absolute top-1/4 right-6 w-36 h-[520px] opacity-22 text-powder-200"
            fill="none"
            stroke="currentColor"
          >
            <path d="M90,20 Q140,160 90,300 T90,580" strokeWidth="1.2" strokeDasharray="3 3" />
            {[80, 170, 260, 350, 440, 520].map((y, idx) => (
              <g key={`rv-${idx}`} transform={`translate(90, ${y})`}>
                <path
                  d="M0,0 C-28,-18 -42,-8 -48,10 C-26,16 -12,10 0,0 Z"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
                <path
                  d="M0,0 C28,-18 42,-8 48,10 C26,16 12,10 0,0 Z"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
                <circle cx="0" cy="-14" r="3" fill="currentColor" />
              </g>
            ))}
          </svg>

          {/* Bottom-Left & Bottom-Right Mandala Corners */}
          <motion.svg
            animate={{ rotate: -360 }}
            transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
            viewBox="0 0 300 300"
            className="absolute -bottom-24 -left-24 sm:-bottom-32 sm:-left-32 w-56 sm:w-96 h-56 sm:h-96 opacity-18 text-powder-200"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="150" cy="150" r="136" strokeDasharray="4 4" />
              <circle cx="150" cy="150" r="110" />
              {Array.from({ length: 12 }).map((_, i) => (
                <path
                  key={`bl-petal-${i}`}
                  d="M150,150 C132,96 132,48 150,16 C168,48 168,96 150,150 Z"
                  transform={`rotate(${i * 30} 150 150)`}
                />
              ))}
            </g>
          </motion.svg>

          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
            viewBox="0 0 300 300"
            className="absolute -bottom-24 -right-24 sm:-bottom-32 sm:-right-32 w-56 sm:w-96 h-56 sm:h-96 opacity-18 text-powder-200"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="150" cy="150" r="136" strokeDasharray="4 4" />
              <circle cx="150" cy="150" r="110" />
              {Array.from({ length: 12 }).map((_, i) => (
                <path
                  key={`br-petal-${i}`}
                  d="M150,150 C132,96 132,48 150,16 C168,48 168,96 150,150 Z"
                  transform={`rotate(${i * 30} 150 150)`}
                />
              ))}
            </g>
          </motion.svg>

          {/* Twinkling Starburst Accents Across the Blue Felt */}
          {[
            { top: '12%', left: '14%', delay: 0 },
            { top: '24%', right: '15%', delay: 1.2 },
            { top: '48%', left: '10%', delay: 0.6 },
            { top: '56%', right: '12%', delay: 1.8 },
            { top: '78%', left: '16%', delay: 0.9 },
            { top: '84%', right: '16%', delay: 2.1 },
          ].map((st, idx) => (
            <motion.span
              key={`star-${idx}`}
              style={{ top: st.top, left: st.left, right: st.right }}
              animate={{ opacity: [0.2, 0.75, 0.2], scale: [0.85, 1.2, 0.85] }}
              transition={{
                duration: 4,
                delay: st.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute text-powder-200/60 text-base sm:text-lg"
            >
              ✦
            </motion.span>
          ))}
        </div>

        <div className="max-w-[680px] mx-auto relative z-10">
          {/* Continuous Winding Cream Satin Ribbon SVG Behind the Flat-Lay Items (GSAP ScrollTrigger Animated) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 680 1280"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="creamRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D8CFC2" />
                <stop offset="35%" stopColor="#F7F2EA" />
                <stop offset="70%" stopColor="#EDE5D8" />
                <stop offset="100%" stopColor="#C9BFB0" />
              </linearGradient>
              <filter id="ribbonShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="8"
                  floodColor="#0D1824"
                  floodOpacity="0.45"
                />
              </filter>
            </defs>
            <path
              ref={ribbonPathRef}
              d="M255,210 C150,290 110,410 185,480 C260,550 545,420 555,545 C565,670 115,595 105,730 C95,865 560,720 555,860 C550,1000 165,980 225,1125 C265,1195 430,1170 465,1110"
              stroke="url(#creamRibbon)"
              strokeWidth="34"
              strokeLinecap="round"
              filter="url(#ribbonShadow)"
            />
          </svg>

          {/* COLLAGE ITEMS — Side-by-side (`flex-row`) preserved across Phone, Tablet & PC */}
          <div className="relative z-10 flex flex-col items-center">
            {/* 1. TOP OPEN FLORAL-LINED POWDER-BLUE ENVELOPE */}
            <motion.div
              initial={{ opacity: 0, y: 45, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', stiffness: 105, damping: 18 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative w-[225px] xs:w-[255px] sm:w-[340px] h-[255px] xs:h-[290px] sm:h-[380px] mx-auto -mb-20 xs:-mb-24 sm:-mb-32 z-10"
            >
              <svg
                className="w-full h-full drop-shadow-[0_22px_38px_rgba(8,16,26,0.65)]"
                viewBox="0 0 360 400"
              >
                <path
                  d="M15,175 L155,14 C170,-2 190,-2 205,14 L345,175 L345,390 L15,390 Z"
                  fill="#829AB2"
                  stroke="#9EB4C9"
                  strokeWidth="1.5"
                />
                <path
                  d="M30,175 L162,28 C173,16 187,16 198,28 L330,175 L330,275 L30,275 Z"
                  fill="#EFECE6"
                  stroke="#C8C3B8"
                  strokeWidth="1"
                />
                <g stroke="#929AA2" fill="none" strokeWidth="1.1" opacity="0.82">
                  <path d="M165,245 C160,180 175,115 192,48" />
                  <path d="M166,200 C135,175 118,145 102,110" />
                  <path d="M172,165 C205,150 228,165 255,190" />
                  <path
                    d="M175,115 C162,105 162,90 175,85 C182,95 180,108 175,115 Z"
                    fill="#D5D9DD"
                  />
                  <path
                    d="M182,90 C195,82 202,92 195,104 C186,102 183,95 182,90 Z"
                    fill="#D5D9DD"
                  />
                  <path
                    d="M135,165 C122,162 118,148 128,140 C136,148 138,158 135,165 Z"
                    fill="#D5D9DD"
                  />
                  <path
                    d="M215,162 C226,152 238,158 232,170 C222,170 218,166 215,162 Z"
                    fill="#D5D9DD"
                  />
                  <circle cx="215" cy="195" r="4" fill="#B8C0C8" />
                  <ellipse cx="215" cy="183" rx="3.5" ry="7" />
                  <ellipse cx="215" cy="207" rx="3.5" ry="7" />
                  <ellipse cx="203" cy="195" rx="7" ry="3.5" />
                  <ellipse cx="227" cy="195" rx="7" ry="3.5" />
                  <path
                    d="M235,68 C222,78 224,98 238,108 C252,118 270,114 278,104 C264,108 248,102 242,88 C238,78 238,72 235,68 Z"
                    fill="#D0D5DC"
                    stroke="#8A929A"
                  />
                  <text x="262" y="75" fontSize="10" fill="#8A929A">
                    ✦
                  </text>
                  <text x="145" y="65" fontSize="8" fill="#8A929A">
                    ✦
                  </text>
                </g>

                <polygon
                  points="15,175 180,295 15,390"
                  fill="#7891AA"
                  stroke="#9CB2C7"
                  strokeWidth="1"
                />
                <polygon
                  points="345,175 180,295 345,390"
                  fill="#738CA5"
                  stroke="#9CB2C7"
                  strokeWidth="1"
                />
                <polygon
                  points="15,390 180,255 345,390"
                  fill="#839BB4"
                  stroke="#A6BCD0"
                  strokeWidth="1.2"
                />

                <g stroke="#DCE6F0" strokeWidth="0.9" fill="none" opacity="0.55">
                  <path d="M40,240 Q65,270 45,310 M28,265 Q48,260 55,278 M320,240 Q295,270 315,310" />
                  <path d="M150,315 Q180,290 210,315 M180,285 L180,340" />
                  <circle cx="180" cy="305" r="6" />
                  <circle cx="52" cy="252" r="4" />
                  <circle cx="308" cy="252" r="4" />
                </g>
              </svg>
            </motion.div>

            {/* 2. MIDDLE ROW: SPINNING SILVER CD ("PLAY OUR SONG") + MAIN INVITATION CARD ("आशीष & तन्नू") */}
            <div className="relative w-full flex flex-row items-center justify-center z-20">
              {/* Left: Metallic Silver CD Disc Playing the Attached "Judi Jodi" Song */}
              <motion.div
                initial={{ opacity: 0, x: -35, rotate: -18 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.1 }}
                className="relative -mr-6 xs:-mr-8 sm:-mr-10 -mt-10 sm:-mt-16 z-20 flex flex-col items-center shrink-0"
              >
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={toggleSongPlayback}
                  aria-label="Play Our Song — Judi Jodi"
                  className="group relative w-36 h-36 xs:w-40 xs:h-40 sm:w-56 sm:h-56 rounded-full cd-disc-surface flex items-center justify-center cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center relative ${
                      isPlayingSong ? 'cd-spinning' : ''
                    }`}
                  >
                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 220 220">
                      <defs>
                        <path id="cdTextArc" d="M 38,110 A 72,72 0 1,1 182,110" />
                      </defs>
                      <text
                        fill="#142334"
                        fontFamily="'Cormorant Garamond', Georgia, serif"
                        fontSize="16.5"
                        fontWeight="700"
                        letterSpacing="2.5"
                      >
                        <textPath href="#cdTextArc" startOffset="50%" textAnchor="middle">
                          PLAY OUR SONG
                        </textPath>
                      </text>
                      <circle
                        cx="110"
                        cy="110"
                        r="98"
                        fill="none"
                        stroke="rgba(255,255,255,0.45)"
                        strokeWidth="0.7"
                      />
                      <circle
                        cx="110"
                        cy="110"
                        r="60"
                        fill="none"
                        stroke="rgba(120,135,150,0.35)"
                        strokeWidth="0.7"
                      />
                    </svg>
                  </div>

                  {/* Center Hub Ring & Navy Play Button */}
                  <div className="absolute w-12 h-12 sm:w-[70px] sm:h-[70px] rounded-full bg-[#8D9AA8]/80 border-2 border-white/80 flex items-center justify-center shadow-inner">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#132030] text-white flex items-center justify-center shadow-md group-hover:bg-[#1E324A] transition-colors">
                      <span className={`text-[10px] sm:text-xs ${isPlayingSong ? '' : 'ml-0.5'}`}>
                        {isPlayingSong ? '❚❚' : '▶'}
                      </span>
                    </div>
                  </div>
                </motion.button>

                {/* Song Label Pill Under the CD */}
                <div className="mt-2 bg-prussian-950/75 backdrop-blur-sm border border-powder-300/30 rounded-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-center shadow-lg">
                  <p
                    className="text-[10px] sm:text-xs text-ivory-100 font-medium"
                    style={{ fontFamily: 'var(--font-hindi)' }}
                  >
                    जुड़ी जोड़ी &bull; सिया सिया राम
                  </p>
                </div>
              </motion.div>

              {/* Right: Tilted Scalloped Main Invitation Card ("आशीष & तन्नू / Ashish & Tannu") */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 8, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 105, damping: 18, delay: 0.18 }}
                whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
                className="relative w-[190px] xs:w-[215px] sm:w-[285px] cream-card-paper scallop-card px-3.5 xs:px-5 sm:px-6 py-5 xs:py-6 sm:py-9 text-center z-30 will-change-transform shrink-0"
              >
                <p className="font-serif text-[9px] xs:text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#2A3B4E] leading-relaxed">
                  PLEASE CELEBRATE
                  <br />
                  THE MARRIAGE OF
                </p>

                <div className="my-3 sm:my-5 text-[#182635]">
                  <h2
                    className="text-3xl xs:text-4xl sm:text-[46px] font-medium leading-tight"
                    style={{ fontFamily: 'var(--font-hindi)' }}
                  >
                    आशीष
                  </h2>
                  <p className="font-alex text-2xl sm:text-4xl my-0.5 text-[#3A4D63]">&amp;</p>
                  <h2
                    className="text-3xl xs:text-4xl sm:text-[46px] font-medium leading-tight"
                    style={{ fontFamily: 'var(--font-hindi)' }}
                  >
                    तन्नू
                  </h2>
                  <p className="font-alex text-lg sm:text-2xl text-[#3A4D63] mt-0.5 sm:mt-1">
                    Ashish &amp; Tannu
                  </p>
                </div>

                <p className="font-serif text-[9px] xs:text-[10px] sm:text-xs tracking-[0.22em] uppercase text-[#2A3B4E] leading-relaxed mt-2 sm:mt-3">
                  OUR
                  <br />
                  CELEBRATION
                  <br />
                  BEGINS HERE
                </p>
              </motion.div>
            </div>

            {/* 3. SECOND ROW: ARCHED DATE CARD ("09 DEC 2026") + REAL UPLOADED POLAROID 1 + "THE DETAILS" TAG */}
            <div className="relative w-full flex flex-row items-center justify-center -mt-4 sm:-mt-10 z-30">
              {/* Left: Arched Date & Venue Card */}
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -7, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, rotate: -2.5, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 105, damping: 18, delay: 0.12 }}
                whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
                className="relative w-[172px] xs:w-[195px] sm:w-[250px] cream-card-paper arched-date-card pt-9 sm:pt-12 pb-5 sm:pb-8 px-3.5 sm:px-5 text-center z-30 will-change-transform shrink-0"
              >
                <p className="font-sans text-[8.5px] sm:text-[10px] tracking-[0.22em] uppercase text-[#3A4D63] mb-1.5 sm:mb-2">
                  TOGETHER ON
                </p>
                <p className="font-serif text-4xl sm:text-[54px] font-semibold text-[#1B2B3C] leading-none tabular-nums">
                  09
                </p>
                <p className="font-serif text-sm sm:text-xl tracking-[0.18em] uppercase text-[#2A3B4E] mt-1.5 sm:mt-2">
                  DECEMBER
                </p>
                <p className="font-serif text-2xl sm:text-[34px] text-[#1B2B3C] mt-0.5 sm:mt-1 tabular-nums">
                  2026
                </p>

                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#C5BFB4]">
                  <p
                    className="text-sm sm:text-xl text-[#1F3147] font-semibold leading-snug"
                    style={{ fontFamily: 'var(--font-hindi)' }}
                  >
                    दरियापुर बाज़ार
                  </p>
                  <p className="font-sans text-[8px] sm:text-[9.5px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#4A5D70] mt-1.5 sm:mt-2 leading-relaxed">
                    DARIYAPUR BAZAR
                    <br />
                    09 दिसंबर 2026
                  </p>
                </div>
              </motion.div>

              {/* Right Column: Real Uploaded Polaroid 1 + Hanging Blue Luggage Tag ("THE DETAILS") */}
              <div className="relative flex flex-col items-center -ml-3 sm:-ml-4 mt-8 sm:mt-16 z-40 shrink-0">
                <motion.button
                  type="button"
                  onClick={() =>
                    setLightboxMemory({
                      ...POLAROID_MEMORIES[0],
                      imageSrc: portraits.haldi,
                    })
                  }
                  aria-label="Inspect Ashish and Tannu Haldi Portrait in Lightbox"
                  initial={{ opacity: 0, x: 30, rotate: -9, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -4, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 110, damping: 18, delay: 0.22 }}
                  whileHover={{ rotate: 0, scale: 1.06, y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  className="polaroid-frame w-38 xs:w-44 sm:w-60 cursor-pointer text-left group will-change-transform"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#D8CFC4]">
                    <img
                      src={portraits.haldi}
                      alt={POLAROID_MEMORIES[0].title}
                      className="w-full h-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-1.5 sm:pt-2 flex items-center justify-between text-[#2A3B4E]">
                    <span className="font-alex text-sm sm:text-lg leading-none">
                      {POLAROID_MEMORIES[0].handwrittenCaption}
                    </span>
                    <span className="font-sans text-[7px] sm:text-[8px] tracking-[0.14em] uppercase opacity-60 group-hover:opacity-100">
                      Expand ↗
                    </span>
                  </div>
                </motion.button>

                {/* Hanging Blue Stitched Luggage Tag ("THE DETAILS") with Pendulum Sway */}
                <motion.a
                  href="#lakeside-celebration"
                  animate={{ rotate: [8, 11.5, 8] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ rotate: 2, scale: 1.07, y: -4 }}
                  style={{ transformOrigin: 'top center' }}
                  className="blue-luggage-tag -mt-6 sm:-mt-8 ml-14 xs:ml-16 sm:ml-28 w-13 sm:w-[70px] h-36 sm:h-48 flex flex-col items-center justify-start pt-3 sm:pt-4 cursor-pointer z-50 will-change-transform"
                  title="Scroll to The Programs"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#F0F4F8] via-[#9BA8B5] to-[#596573] p-1 shadow-md flex items-center justify-center mb-3 sm:mb-4">
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#243A51] shadow-inner" />
                  </div>
                  <span
                    className="font-serif text-[10px] sm:text-[13px] tracking-[0.25em] sm:tracking-[0.28em] uppercase text-[#E6EEF6] select-none"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    THE DETAILS
                  </span>
                </motion.a>
              </div>
            </div>

            {/* 4. THIRD ROW: MINI BLUE "SHUBH NIMANTRAN" ENVELOPE + FLORALS + "OUR STORY" PLAQUE + 2ND POLAROID */}
            <div className="relative w-full flex flex-col items-center -mt-6 sm:-mt-12 z-30">
              <motion.div
                initial={{ opacity: 0, y: 36, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 105, damping: 18, delay: 0.14 }}
                className="relative flex items-center justify-center my-2"
              >
                {/* Left Painted Blue & White Anemone / Delphinium Floral Cluster SVG */}
                <motion.svg
                  animate={{ rotate: [-2, 2.5, -2], y: [0, -3, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 sm:w-28 h-32 sm:h-40 -mr-6 sm:-mr-7 z-30 pointer-events-none drop-shadow-lg"
                  viewBox="0 0 120 180"
                >
                  <g fill="#8DA8C4" stroke="#536D88" strokeWidth="0.8">
                    <circle cx="72" cy="28" r="10" />
                    <circle cx="85" cy="36" r="9" />
                    <circle cx="65" cy="44" r="9" />
                    <circle cx="55" cy="68" r="11" />
                    <circle cx="72" cy="74" r="10" />
                    <circle cx="48" cy="86" r="9" />
                    <circle cx="62" cy="145" r="11" />
                    <circle cx="78" cy="152" r="10" />
                    <circle cx="55" cy="162" r="9" />
                  </g>
                  <g transform="translate(72, 110)">
                    <ellipse cx="0" cy="-18" rx="11" ry="16" fill="#F2EFE9" stroke="#C5BFB5" />
                    <ellipse cx="17" cy="-6" rx="16" ry="11" fill="#EAE5DC" stroke="#C5BFB5" />
                    <ellipse cx="12" cy="15" rx="13" ry="15" fill="#F2EFE9" stroke="#C5BFB5" />
                    <ellipse cx="-12" cy="15" rx="13" ry="15" fill="#E6E0D6" stroke="#C5BFB5" />
                    <ellipse cx="-17" cy="-6" rx="16" ry="11" fill="#F2EFE9" stroke="#C5BFB5" />
                    <circle cx="0" cy="0" r="8" fill="#23364C" />
                    <circle
                      cx="0"
                      cy="0"
                      r="10"
                      fill="none"
                      stroke="#859BB2"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  </g>
                </motion.svg>

                {/* Decorative Keepsake Slate-Blue Envelope (Scrolls to The Programs — No Form) */}
                <motion.a
                  href="#lakeside-celebration"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative w-[195px] xs:w-[215px] sm:w-[265px] h-[126px] xs:h-[138px] sm:h-[164px] bg-gradient-to-b from-[#89A0B8] to-[#738BA4] rounded-[3px] shadow-[0_18px_36px_rgba(10,18,28,0.58)] cursor-pointer overflow-hidden z-20 block"
                >
                  <svg className="w-full h-full" viewBox="0 0 265 164" preserveAspectRatio="none">
                    <polygon
                      points="0,0 132.5,95 0,164"
                      fill="#7890A8"
                      stroke="#96ADC4"
                      strokeWidth="0.8"
                    />
                    <polygon
                      points="265,0 132.5,95 265,164"
                      fill="#7189A1"
                      stroke="#96ADC4"
                      strokeWidth="0.8"
                    />
                    <polygon
                      points="0,164 132.5,78 265,164"
                      fill="#7D95AD"
                      stroke="#9EB4CA"
                      strokeWidth="0.9"
                    />
                    <polygon
                      points="0,0 265,0 132.5,102"
                      fill="#8EA5BC"
                      stroke="#AEC3D6"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="absolute top-2.5 sm:top-3.5 inset-x-0 text-center pointer-events-none">
                    <p
                      className="text-xs sm:text-sm text-[#25384C] font-semibold"
                      style={{ fontFamily: 'var(--font-hindi)' }}
                    >
                      शुभ निमंत्रण
                    </p>
                    <p className="font-serif text-sm sm:text-lg tracking-[0.2em] uppercase text-[#25384C] mt-0.5">
                      09 DEC 2026
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full silver-wax-seal flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                    <span className="text-[#2C3E50] text-xs sm:text-sm">🌿</span>
                  </div>
                </motion.a>

                {/* Right White Blossom Sprig */}
                <motion.svg
                  animate={{ rotate: [2, -2.5, 2], y: [0, -2.5, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 sm:w-20 h-24 sm:h-28 -ml-3 sm:-ml-4 z-30 pointer-events-none drop-shadow"
                  viewBox="0 0 80 120"
                >
                  <g transform="translate(28, 62)">
                    <ellipse cx="0" cy="-14" rx="8" ry="14" fill="#F0ECE4" />
                    <ellipse cx="14" cy="-4" rx="14" ry="8" fill="#E2DDD4" />
                    <ellipse cx="8" cy="12" rx="10" ry="13" fill="#F0ECE4" />
                    <ellipse cx="-10" cy="10" rx="10" ry="12" fill="#DBD5CA" />
                    <circle cx="0" cy="0" r="5" fill="#5D7084" />
                  </g>
                </motion.svg>
              </motion.div>

              {/* Bottom Overlapping Row: "OUR STORY" Ornate Label Plaque + Second Couple Polaroid (Side-by-Side on Phone, Tablet & PC) */}
              <div className="relative flex flex-row items-center justify-center -mt-4 sm:-mt-6 z-40">
                <motion.button
                  onClick={() => setIsStoryOpen(true)}
                  initial={{ opacity: 0, x: -24, rotate: -6, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -3, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 110, damping: 18, delay: 0.16 }}
                  whileHover={{ rotate: 0, scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative w-[180px] xs:w-[205px] sm:w-[275px] py-5 sm:py-7 px-4 sm:px-8 cream-card-paper rounded-[36px] border-[3px] border-[#9AA8B6] shadow-2xl cursor-pointer text-center will-change-transform shrink-0"
                >
                  <div className="absolute inset-1.5 rounded-[30px] border border-[#7E90A2] pointer-events-none" />
                  <span className="font-serif text-lg xs:text-xl sm:text-[28px] tracking-[0.12em] uppercase text-[#182738] font-medium block">
                    OUR STORY
                  </span>
                  <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#4A5D70] mt-1 block">
                    आशीष &amp; तन्नू →
                  </span>
                </motion.button>

                {/* Second Polaroid (Original Festive Mehndi Portrait of Ashish & Tannu) */}
                <motion.button
                  type="button"
                  onClick={() =>
                    setLightboxMemory({
                      ...POLAROID_MEMORIES[1],
                      imageSrc: portraits.mehndi,
                    })
                  }
                  aria-label="Inspect Festive Mehndi Polaroid in Lightbox"
                  initial={{ opacity: 0, x: 24, rotate: 7, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 2.5, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 110, damping: 18, delay: 0.24 }}
                  whileHover={{ rotate: 0, scale: 1.06, y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  className="polaroid-frame w-36 xs:w-40 sm:w-52 -ml-3 sm:-ml-5 -mt-4 sm:-mt-8 z-40 cursor-pointer text-left group will-change-transform shrink-0"
                >
                  <div className="aspect-square overflow-hidden bg-[#2C3A35]">
                    <img
                      src={portraits.mehndi}
                      alt={POLAROID_MEMORIES[1].title}
                      className="w-full h-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-1.5 sm:pt-2 flex items-center justify-between text-[#2A3B4E]">
                    <span className="font-alex text-sm sm:text-base leading-none">
                      {POLAROID_MEMORIES[1].handwrittenCaption}
                    </span>
                    <span className="font-sans text-[7px] sm:text-[8px] tracking-[0.14em] uppercase opacity-60 group-hover:opacity-100">
                      Expand ↗
                    </span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. "THE PROGRAMS" SECTION (Floral Oval Bride & Groom + 3 Program Rows)*/}
      {/* ===================================================================== */}
      <TheProgramsSection onSelectPortrait={(m) => setLightboxMemory(m)} />

      {/* ===================================================================== */}
      {/* 5. SCROLLING MOMENTS GALLERY WITH DIFFERENT PORTRAIT FRAMES           */}
      {/* ===================================================================== */}
      <ScrollingMomentsGallery onSelectMemory={(m) => setLightboxMemory(m)} />

      {/* ===================================================================== */}
      {/* FOOTER: HEART FRAME BESIDE NAMES (Side-by-Side on Phone, Tab & PC)    */}
      {/* ===================================================================== */}
      <footer className="w-full prussian-felt-bg pt-12 sm:pt-14 pb-8 px-4 text-center border-t border-white/15 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Lockup: Heart-Shaped Frame with Actual Groom & Bride Portrait Beside Names (Always Side-by-Side `flex-row`) */}
          <div className="flex flex-row items-center justify-center gap-4 xs:gap-6 sm:gap-9">
            {/* Heart-Shaped Frame Containing the Actual Groom & Bride Image */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              onClick={() => setLightboxMemory(POLAROID_MEMORIES[2])}
              className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-44 sm:h-44 shrink-0 cursor-pointer drop-shadow-[0_14px_28px_rgba(8,14,22,0.55)]"
              title="Ashish & Tannu"
            >
              <svg viewBox="0 0 200 185" className="w-full h-full overflow-visible">
                <defs>
                  <clipPath id="footerCoupleHeartClip">
                    <path d="M100,172 C100,172 16,120 16,58 C16,26 42,6 70,6 C86,6 96,15 100,26 C104,15 114,6 130,6 C158,6 184,26 184,58 C184,120 100,172 100,172 Z" />
                  </clipPath>
                  <linearGradient id="heartFrameBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EFECE6" />
                    <stop offset="55%" stopColor="#DDD4CA" />
                    <stop offset="100%" stopColor="#C8BDB0" />
                  </linearGradient>
                  <linearGradient id="heartRimSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#C5D5E6" />
                    <stop offset="100%" stopColor="#8CA3B8" />
                  </linearGradient>
                </defs>

                {/* Clipped Heart Interior with Actual Bride & Groom Portrait (Padded Inside) */}
                <g clipPath="url(#footerCoupleHeartClip)">
                  <rect x="0" y="0" width="200" height="185" fill="url(#heartFrameBg)" />
                  <image
                    href="/assets/aistudio/ashish_tannu_illustration__1_-Photoroom_dbb07264.png"
                    x="22"
                    y="16"
                    width="156"
                    height="215"
                    preserveAspectRatio="xMidYMin slice"
                  />
                </g>

                {/* Outer Metallic Silver/Ivory Heart Rim */}
                <path
                  d="M100,172 C100,172 16,120 16,58 C16,26 42,6 70,6 C86,6 96,15 100,26 C104,15 114,6 130,6 C158,6 184,26 184,58 C184,120 100,172 100,172 Z"
                  fill="none"
                  stroke="url(#heartRimSilver)"
                  strokeWidth="4"
                />
                {/* Delicate Inner White Heart Line */}
                <path
                  d="M100,164 C100,164 23,115 23,58 C23,31 45,13 70,13 C84,13 94,21 100,32 C106,21 116,13 130,13 C155,13 177,31 177,58 C177,115 100,164 100,164 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.2"
                />
              </svg>
            </motion.div>

            {/* Couple Names Beside the Heart Frame */}
            <div className="text-left">
              <p
                className="text-3xl xs:text-4xl sm:text-5xl text-white font-medium leading-tight"
                style={{ fontFamily: 'var(--font-hindi)' }}
              >
                आशीष &amp; तन्नू
              </p>
              <p className="font-alex text-2xl xs:text-3xl sm:text-4xl text-powder-200 mt-0.5">
                Ashish &amp; Tannu
              </p>
              <p
                className="text-xs sm:text-sm text-[#DCE5EE] mt-1"
                style={{ fontFamily: 'var(--font-hindi)' }}
              >
                09 दिसंबर 2026 &bull; दरियापुर बाज़ार
              </p>
            </div>
          </div>

          {/* Single Bottom Line: Powered By Alomonox Technology PVT LTD */}
          <div className="w-full mt-9 pt-5 border-t border-white/15">
            <p className="font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.22em] uppercase text-powder-200/90">
              Powered By Alomonox Technology PVT LTD
            </p>
          </div>
        </motion.div>
      </footer>

      {/* ===================================================================== */}
      {/* INTERACTIVE MODALS (Story & Portrait Lightbox Only — No Forms)        */}
      {/* ===================================================================== */}
      <StoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      <PolaroidLightbox
        memory={lightboxMemory}
        onClose={() => setLightboxMemory(null)}
        onSelectMemory={(m) => setLightboxMemory(m)}
      />
    </div>
  );
}
