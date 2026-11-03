import { useEffect, useState } from 'react';

export interface GeneratedWeddingPortraits {
  haldi: string;
  mehndi: string;
  tilakotsav: string;
  weddingMandap: string;
  royalSangeet: string;
  grandReception: string;
}

export const ORIGINAL_HALDI_SRC =
  '/assets/aistudio/Joyful_Haldi_Ceremony_Portrait_91999f4b.png';
export const ORIGINAL_MEHNDI_SRC =
  '/assets/aistudio/Festive_Mehndi_Portrait_with_Henna_Hands_6a2f3b0b.png';
export const CUTOUT_SRC =
  '/assets/aistudio/ashish_tannu_illustration__1_-Photoroom_dbb07264.png';
const MANDAP_BG_SRC =
  '/assets/aistudio/Generate_hero_section_image_b833de66_2K_835376e8.jpg';
const AISLE_BG_SRC =
  '/assets/aistudio/Generate_hero_section_image_52c9c525_2K_6cd27f92.jpg';

const DEFAULT_PORTRAITS: GeneratedWeddingPortraits = {
  haldi: ORIGINAL_HALDI_SRC,
  mehndi: ORIGINAL_MEHNDI_SRC,
  tilakotsav: CUTOUT_SRC,
  weddingMandap: ORIGINAL_MEHNDI_SRC,
  royalSangeet: CUTOUT_SRC,
  grandReception: ORIGINAL_HALDI_SRC,
};

let cachedPortraits: GeneratedWeddingPortraits | null = null;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function drawBokehAndPetals(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  palette: { orbs: string[]; petals: string[] },
  seedOffset = 0
) {
  ctx.save();
  for (let i = 0; i < 22; i++) {
    const angle = (i + seedOffset) * 1.37;
    const x = ((Math.sin(angle * 2.1) * 0.5 + 0.5) * w) % w;
    const y = ((Math.cos(angle * 1.7) * 0.5 + 0.5) * h) % h;
    const r = 14 + ((i * 19) % 44);

    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    const color = palette.orbs[i % palette.orbs.length];
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 14; i++) {
    const isTop = i < 9;
    const x = (i * 97 + seedOffset * 31) % w;
    const y = isTop ? (i * 23) % (h * 0.26) : h - ((i * 29) % (h * 0.2));
    const rx = 7 + (i % 8);
    const ry = 13 + (i % 10);
    const rot = (i * 0.65) % Math.PI;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = palette.petals[i % palette.petals.length];
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

export function useGeneratedCouplePortraits(): GeneratedWeddingPortraits {
  const [portraits, setPortraits] = useState<GeneratedWeddingPortraits>(
    cachedPortraits || DEFAULT_PORTRAITS
  );

  useEffect(() => {
    if (cachedPortraits) return;

    let isCancelled = false;

    Promise.all([
      loadImage(CUTOUT_SRC),
      loadImage(MANDAP_BG_SRC),
      loadImage(AISLE_BG_SRC),
    ])
      .then(([coupleImg, mandapBg, aisleBg]) => {
        if (isCancelled) return;

        const createScene = (
          width: number,
          height: number,
          renderFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
        ): string => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return CUTOUT_SRC;
          renderFn(ctx, width, height);
          return canvas.toDataURL('image/jpeg', 0.92);
        };

        const drawCouple = (
          ctx: CanvasRenderingContext2D,
          w: number,
          h: number,
          scaleFactor: number,
          yOffsetRatio: number,
          glowColor: string
        ) => {
          const aspect = coupleImg.width / coupleImg.height;
          const drawH = h * scaleFactor;
          const drawW = drawH * aspect;
          const drawX = (w - drawW) / 2;
          const drawY = h * yOffsetRatio;

          const halo = ctx.createRadialGradient(
            w * 0.5,
            h * 0.42,
            drawW * 0.08,
            w * 0.5,
            h * 0.42,
            drawW * 0.68
          );
          halo.addColorStop(0, glowColor);
          halo.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = halo;
          ctx.fillRect(0, 0, w, h);

          ctx.save();
          ctx.shadowColor = 'rgba(12, 18, 28, 0.38)';
          ctx.shadowBlur = 28;
          ctx.shadowOffsetY = 12;
          ctx.drawImage(coupleImg, drawX, drawY, drawW, drawH);
          ctx.restore();
        };

        // Tilakotsav & Preetibhoj Royal Evening Portrait (05 Dec 2026)
        const tilakotsav = createScene(900, 1100, (ctx, w, h) => {
          const royalGrad = ctx.createLinearGradient(0, 0, 0, h);
          royalGrad.addColorStop(0, '#1B2E46');
          royalGrad.addColorStop(0.55, '#2A4362');
          royalGrad.addColorStop(1, '#142234');
          ctx.fillStyle = royalGrad;
          ctx.fillRect(0, 0, w, h);

          ctx.strokeStyle = 'rgba(225, 210, 185, 0.35)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(w / 2, h * 0.42, w * 0.39, Math.PI, 0);
          ctx.lineTo(w * 0.89, h);
          ctx.moveTo(w * 0.11, h * 0.42);
          ctx.lineTo(w * 0.11, h);
          ctx.stroke();

          drawBokehAndPetals(
            ctx,
            w,
            h,
            {
              orbs: ['rgba(255, 232, 175, 0.35)', 'rgba(205, 222, 240, 0.38)'],
              petals: ['rgba(235, 215, 180, 0.6)', 'rgba(255, 238, 195, 0.55)'],
            },
            3
          );

          drawCouple(ctx, w, h, 1.32, 0.07, 'rgba(220, 235, 255, 0.52)');
        });

        // Shubh Vivah Mandap Portrait (09 Dec 2026)
        const weddingMandap = createScene(900, 1100, (ctx, w, h) => {
          ctx.save();
          ctx.filter = 'blur(14px) brightness(1.04)';
          ctx.drawImage(mandapBg, -w * 0.05, 0, w * 1.35, h);
          ctx.restore();

          const roseGrad = ctx.createLinearGradient(0, 0, 0, h);
          roseGrad.addColorStop(0, 'rgba(255, 238, 242, 0.42)');
          roseGrad.addColorStop(1, 'rgba(180, 145, 135, 0.45)');
          ctx.fillStyle = roseGrad;
          ctx.fillRect(0, 0, w, h);

          drawCouple(ctx, w, h, 1.38, 0.06, 'rgba(255, 245, 238, 0.82)');

          drawBokehAndPetals(
            ctx,
            w,
            h,
            {
              orbs: ['rgba(255, 225, 232, 0.38)', 'rgba(255, 248, 235, 0.42)'],
              petals: ['rgba(244, 162, 184, 0.72)', 'rgba(252, 220, 230, 0.78)'],
            },
            2
          );
        });

        // Royal Aisle / Baraat Welcome Scene
        const grandReception = createScene(900, 1100, (ctx, w, h) => {
          ctx.save();
          ctx.filter = 'blur(12px) brightness(1.04)';
          ctx.drawImage(aisleBg, -w * 0.1, 0, w * 1.25, h);
          ctx.restore();

          const softWash = ctx.createRadialGradient(
            w * 0.5,
            h * 0.4,
            w * 0.1,
            w * 0.5,
            h * 0.5,
            w * 0.7
          );
          softWash.addColorStop(0, 'rgba(255, 252, 248, 0.45)');
          softWash.addColorStop(1, 'rgba(40, 32, 28, 0.25)');
          ctx.fillStyle = softWash;
          ctx.fillRect(0, 0, w, h);

          drawCouple(ctx, w, h, 1.35, 0.06, 'rgba(255, 250, 244, 0.82)');

          drawBokehAndPetals(
            ctx,
            w,
            h,
            {
              orbs: ['rgba(255, 240, 245, 0.38)', 'rgba(255, 250, 235, 0.42)'],
              petals: ['rgba(238, 152, 175, 0.7)', 'rgba(252, 228, 236, 0.75)'],
            },
            4
          );
        });

        cachedPortraits = {
          haldi: ORIGINAL_HALDI_SRC,
          mehndi: ORIGINAL_MEHNDI_SRC,
          tilakotsav,
          weddingMandap,
          royalSangeet: tilakotsav,
          grandReception,
        };
        setPortraits(cachedPortraits);
      })
      .catch(() => {
        // Fallback to original uploaded images
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return portraits;
}
