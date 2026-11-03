import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { POLAROID_MEMORIES, PolaroidMemory } from '../data/weddingData';
import { useGeneratedCouplePortraits } from '../utils/couplePortraitGenerator';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-prussian-950/80 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 28, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 18 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="cream-card-paper scallop-card max-w-2xl w-full p-7 sm:p-10 relative shadow-2xl text-center my-8"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              aria-label="Close Our Story modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#243A51]/10 hover:bg-[#243A51]/20 flex items-center justify-center text-[#1B2B3C] text-sm cursor-pointer"
            >
              ✕
            </motion.button>

            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#4A5D70]">
              आशीष &amp; तन्नू &bull; Our Sacred Journey
            </p>
            <h3 id="story-modal-title" className="font-alex text-5xl text-[#1B2B3C] mt-1 mb-6">
              Our Story
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center text-left bg-white/65 border border-[#C8C0B4] rounded-md p-5 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.5 }}
                className="sm:col-span-5 flex justify-center bg-gradient-to-b from-[#23384E] to-[#172636] rounded-md pt-4 px-3 overflow-hidden border border-[#9AA8B6]"
              >
                <img
                  src="/assets/aistudio/ashish_tannu_illustration__1_-Photoroom_dbb07264.png"
                  alt="Ashish and Tannu in Royal Navy and Silver Embroidery"
                  className="w-40 sm:w-48 h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
                className="sm:col-span-7 space-y-3"
              >
                <p
                  className="text-xl font-semibold text-[#182635]"
                  style={{ fontFamily: 'var(--font-hindi)' }}
                >
                  दो दिलों और दो परिवारों का शुभ मिलन
                </p>
                <p className="font-serif text-base text-[#2A3B4E] leading-relaxed">
                  Written in the stars and blessed by our elders, what began with a warm smile and
                  conversations over family gatherings blossomed into an unbreakable bond of love,
                  laughter, and mutual respect.
                </p>
                <p className="font-serif italic text-base text-[#3A4D63] leading-relaxed">
                  “On <strong>09 December 2026 (09 दिसंबर 2026)</strong>, we invite our dearest family
                  and friends to <strong>Dariyapur Bazar (दरियापुर बाज़ार)</strong> to bless us as we
                  take our sacred vows.”
                </p>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="px-8 py-2.5 rounded bg-[#243A51] hover:bg-[#1B2D42] text-white font-sans text-[10px] tracking-[0.24em] uppercase transition cursor-pointer"
            >
              Return to Invitation
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PolaroidLightboxProps {
  memory: PolaroidMemory | null;
  onClose: () => void;
  onSelectMemory: (memory: PolaroidMemory) => void;
}

export const PolaroidLightbox: React.FC<PolaroidLightboxProps> = ({
  memory,
  onClose,
  onSelectMemory,
}) => {
  const portraits = useGeneratedCouplePortraits();

  const enrichedMemories: PolaroidMemory[] = [
    {
      ...POLAROID_MEMORIES[0],
      imageSrc: portraits.aisleWalk,
    },
    {
      ...POLAROID_MEMORIES[1],
      imageSrc: portraits.weddingMandap,
    },
    {
      ...POLAROID_MEMORIES[2],
      imageSrc: portraits.royalSangeet,
    },
  ];

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-prussian-950/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-[#FAF7F0] text-[#1B2B3C] rounded-md p-5 sm:p-7 shadow-2xl relative border-2 border-[#AEB9C4]"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              aria-label="Close Polaroid Lightbox"
              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-[#1B2D42] text-sm cursor-pointer z-20"
            >
              ✕
            </motion.button>

            <div className="aspect-[16/10] w-full overflow-hidden rounded border border-[#C8C0B4] bg-[#1B2D42] flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={memory.id + memory.imageSrc}
                  src={memory.imageSrc}
                  alt={memory.title}
                  initial={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-contain bg-[#162436]"
                />
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8D0C5] pb-3">
              <div>
                <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#5C7085]">
                  {memory.location} &bull; {memory.date}
                </p>
                <h4 className="font-serif text-2xl font-semibold text-[#182635]">
                  {memory.title}
                </h4>
              </div>
              <span className="font-alex text-2xl text-[#3A4D63] shrink-0">
                {memory.handwrittenCaption}
              </span>
            </div>

            <p className="font-serif text-base text-[#2A3B4E] leading-relaxed mt-3">
              {memory.story}
            </p>

            <div className="mt-4 pt-3 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3">
              <span className="font-sans text-[10px] tracking-[0.14em] text-[#5C7085]">
                {memory.exif}
              </span>
              <div className="flex items-center gap-2">
                {enrichedMemories.map((m, idx) => (
                  <motion.button
                    key={m.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectMemory(m)}
                    className={`px-3 py-1 rounded text-[10px] font-sans tracking-[0.16em] uppercase transition cursor-pointer whitespace-nowrap ${
                      m.id === memory.id
                        ? 'bg-[#243A51] text-white'
                        : 'bg-[#243A51]/10 text-[#243A51] hover:bg-[#243A51]/20'
                    }`}
                  >
                    Portrait 0{idx + 1}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
