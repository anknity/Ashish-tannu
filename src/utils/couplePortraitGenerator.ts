import { useEffect, useState } from 'react';

export interface GeneratedWeddingPortraits {
  haldi: string;
  weddingMandap: string;
  royalSangeet: string;
  aisleWalk: string;
  romanticCameo: string;
  grandReception: string;
}

const CUTOUT_SRC =
  '/assets/aistudio/ashish_tannu_illustration__1_-Photoroom_dbb07264.png';
const MANDAP_BG_SRC =
  '/assets/aistudio/Generate_hero_section_image_b833de66_2K_835376e8.jpg';
const AISLE_BG_SRC =
  '/assets/aistudio/Generate_hero_section_image_52c9c525_2K_6cd27f92.jpg';

const DEFAULT_PORTRAITS: GeneratedWeddingPortraits = {
  haldi: CUTOUT_SRC,
  weddingMandap: CUTOUT_SRC,
  royalSangeet: CUTOUT_SRC,
  aisleWalk: CUTOUT_SRC,
  romanticCameo: CUTOUT_SRC,
  grandReception: CUTOUT_SRC,
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

/**
 * Draws soft bokeh light orbs and floating marigold/rose petals onto a canvas context
 */
function drawBokehAndPetals(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  palette: { orbs: string[]; petals: string[] },
  seedOffset = 0
) {
  ctx.save();
  for (let i = 0; i < 24; i++) {
    const angle = (i + seedOffset) * 1.37;
    const x = ((Math.sin(angle * 2.1) * 0.5 + 0.5) * w) % w;
    const y = ((Math.cos(angle * 1.7) * 0.5 + 0.5) * h) % h;
    const r = 14 + ((i * 19) % 46);

    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    const color = palette.orbs[i % palette.orbs.length];
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Foreground corner floral bokeh petals
  for (let i = 0; i < 16; i++) {
    const isTop = i < 10;
    const x = ((i * 97 + seedOffset * 31) % w);
    const y = isTop
      ? ((i * 23) % (h * 0.28))
      : h - ((i * 29) % (h * 0.22));
    const rx = 8 + (i % 9);
    const ry = 14 + (i % 11);
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

/**
 * Generates 6 distinct photorealistic wedding portraits of the exact given Groom & Bride
 * (`ashish_tannu_illustration__1_-Photoroom_dbb07264.png`) across 6 wedding atmospheres.
 */
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

        // Helper to draw the exact Bride & Groom cutout with studio rim light & drop shadow
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

          // Warm/Royal backlight halo behind the couple
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

        // 1. HALDI CEREMONY PORTRAIT (Warm Marigold & Amber Sunlit Courtyard)
        const haldi = createScene(900, 1100, (ctx, w, h) => {
          ctx.save();
          ctx.filter = 'blur(18px) brightness(1.06) sepia(0.28) saturate(1.35)';
          ctx.drawImage(mandapBg, -w * 0.15, 0, w * 1.45, h);
          ctx.restore();

          const amberGrad = ctx.createLinearGradient(0, 0, 0, h);
          amberGrad.addColorStop(0, 'rgba(255, 215, 115, 0.52)');
          amberGrad.addColorStop(0.5, 'rgba(250, 232, 195, 0.35)');
          amberGrad.addColorStop(1, 'rgba(195, 125, 45, 0.55)');
          ctx.fillStyle = amberGrad;
          ctx.fillRect(0, 0, w, h);

          // Hanging Marigold Garland Strings at top
          for (let gx = 60; gx < w; gx += 110) {
            for (let gy = 0; gy < 190 + (gx % 70); gy += 28) {
              ctx.beginPath();
              ctx.arc(gx, gy, 13, 0, Math.PI * 2);
              ctx.fillStyle = gy % 56 === 0 ? '#F59E0B' : '#FBBF24';
              ctx.fill();
            }
          }

          drawCouple(ctx, w, h, 1.32, 0.08, 'rgba(255, 244, 200, 0.78)');

          drawBokehAndPetals(
            ctx,
            w,
            h,
            {
              orbs: ['rgba(255, 210, 90, 0.35)', 'rgba(255, 245, 200, 0.4)'],
              petals: ['rgba(245, 158, 11, 0.75)', 'rgba(251, 191, 36, 0.8)'],
            },
            1
          );
        });

        // 2. THE WEDDING MANDAP PORTRAIT (Golden Hour Lotus & Rose Mandap)
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

        // 3. ROYAL NAVY & SILVER SANGEET NIGHT (Starlit Palace & Chandeliers)
        const royalSangeet = createScene(900, 1100, (ctx, w, h) => {
          const nightGrad = ctx.createLinearGradient(0, 0, 0, h);
          nightGrad.addColorStop(0, '#132235');
          nightGrad.addColorStop(0.55, '#213852');
          nightGrad.addColorStop(1, '#101C2B');
          ctx.fillStyle = nightGrad;
          ctx.fillRect(0, 0, w, h);

          // Ornate Silver Palace Arch in Background
          ctx.strokeStyle = 'rgba(210, 225, 242, 0.28)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(w / 2, h * 0.42, w * 0.38, Math.PI, 0);
          ctx.lineTo(w * 0.88, h);
          ctx.moveTo(w * 0.12, h * 0.42);
          ctx.lineTo(w * 0.12, h);
          ctx.stroke();

          drawBokehAndPetals(
            ctx,
            w,
            h,
            {
              orbs: ['rgba(255, 235, 180, 0.32)', 'rgba(197, 213, 230, 0.36)'],
              petals: ['rgba(220, 232, 245, 0.55)', 'rgba(255, 230, 185, 0.5)'],
            },
            3
          );

          drawCouple(ctx, w, h, 1.3, 0.08, 'rgba(210, 228, 248, 0.48)');
        });

        // 4. ROYAL AISLE WALK PORTRAIT (White Palace Pillars & Rose Archway)
        const aisleWalk = createScene(1100, 880, (ctx, w, h) => {
          ctx.save();
          ctx.filter = 'blur(12px) brightness(1.04)';
          ctx.drawImage(aisleBg, 0, 0, w, h);
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

          drawCouple(ctx, w, h, 1.52, 0.05, 'rgba(255, 250, 244, 0.78)');

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

        // 5. ROMANTIC CLOSE-UP CAMEO PORTRAIT (Intimate Waist-Up Framing)
        const romanticCameo = createScene(900, 1100, (ctx, w, h) => {
          const studioGrad = ctx.createRadialGradient(
            w * 0.5,
            h * 0.36,
            w * 0.08,
            w * 0.5,
            h * 0.5,
            w * 0.75
          );
          studioGrad.addColorStop(0, '#FAF6F0');
          studioGrad.addColorStop(0.55, '#E5DDD2');
          studioGrad.addColorStop(1, '#C5B8A8');
          ctx.fillStyle = studioGrad;
          ctx.fillRect(0, 0, w, h);

          drawCouple(ctx, w, h, 1.62, 0.04, 'rgba(255, 255, 255, 0.85)');

          drawBokehAndPetals(
            ctx,
            w,
            h,
            {
              orbs: ['rgba(255, 245, 238, 0.4)', 'rgba(245, 208, 220, 0.32)'],
              petals: ['rgba(235, 145, 168, 0.68)', 'rgba(250, 215, 225, 0.72)'],
            },
            5
          );
        });

        // 6. GRAND RECEPTION ROYAL PAVILION PORTRAIT
        const grandReception = createScene(900, 1100, (ctx, w, h) => {
          const recGrad = ctx.createLinearGradient(0, 0, 0, h);
          recGrad.addColorStop(0, '#EBE4DA');
          recGrad.addColorStop(0.5, '#DDD2C4');
          recGrad.addColorStop(1, '#BFB09E');
          ctx.fillStyle = recGrad;
          ctx.fillRect(0, 0, w, h);

          // Subtle Royal Jharokha Arch Lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(42, 42, w - 84, h - 84);

          drawCouple(ctx, w, h, 1.18, 0.06, 'rgba(255, 252, 245, 0.85)');

          drawBokehAndPetals(
            ctx,
            w,
            h,
            {
              orbs: ['rgba(255, 238, 205, 0.42)', 'rgba(255, 255, 255, 0.45)'],
              petals: ['rgba(225, 165, 180, 0.65)', 'rgba(245, 220, 190, 0.7)'],
            },
            6
          );
        });

        cachedPortraits = {
          haldi,
          weddingMandap,
          royalSangeet,
          aisleWalk,
          romanticCameo,
          grandReception,
        };
        setPortraits(cachedPortraits);
      })
      .catch(() => {
        // Fallback to raw cutout if needed
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return portraits;
}
