import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Droplets } from 'lucide-react';
import { motion, MotionValue } from 'motion/react';

interface Droplet {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

interface InteractiveWatercolorBannerProps {
  bannerUrl: string;
  onOpenImageModal?: () => void;
  scrollYProgress?: MotionValue<number>;
}

const WATERCOLOR_COLORS = [
  '#FA4E74', // Coral vibrante
  '#68C9EA', // Azul turquesa
  '#56C45F', // Verde primavera
  '#F9DC3F', // Amarelo sol
  '#8D72A8', // Lilás arteterapia
  '#E58B92', // Rosa suave
  '#D4AF37', // Dourado
];

export const InteractiveWatercolorBanner: React.FC<InteractiveWatercolorBannerProps> = ({
  bannerUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const dropletIdRef = useRef(0);
  const lastSpawnTime = useRef(0);

  // =========================================================
  // INTERACTIVE PAINT DROPLETS (Click & Move & Touch)
  // =========================================================
  const spawnDroplet = useCallback((clientX: number, clientY: number, sizeMultiplier = 1) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

    dropletIdRef.current += 1;
    const color = WATERCOLOR_COLORS[Math.floor(Math.random() * WATERCOLOR_COLORS.length)];
    const size = (Math.random() * 32 + 28) * sizeMultiplier;
    const rotation = Math.random() * 360;

    const newDroplet: Droplet = {
      id: dropletIdRef.current,
      x,
      y,
      color,
      size,
      rotation,
    };

    setDroplets((prev) => [...prev.slice(-14), newDroplet]);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastSpawnTime.current > 120) {
      lastSpawnTime.current = now;
      spawnDroplet(e.clientX, e.clientY, 0.9);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    spawnDroplet(e.clientX, e.clientY, 1.4);
    setTimeout(() => {
      spawnDroplet(e.clientX + (Math.random() * 20 - 10), e.clientY + (Math.random() * 20 - 10), 0.8);
    }, 80);
  };

  useEffect(() => {
    if (droplets.length === 0) return;
    const timer = setTimeout(() => {
      setDroplets((prev) => prev.slice(1));
    }, 1800);
    return () => clearTimeout(timer);
  }, [droplets]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      className="relative group/banner w-full h-[85vh] sm:h-[420px] md:h-[460px] lg:h-[490px] min-h-[520px] sm:min-h-0 overflow-hidden bg-gradient-to-b from-[#FAF5F0] via-[#F5EFEB] to-[#FAF8F5] cursor-crosshair select-none touch-manipulation"
    >
      {/* ========================================================= */}
      {/* 1. STATIC CRISP HERO WATERCOLOR IMAGE (Sem fade-out)      */}
      {/* ========================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={bannerUrl}
          alt="Materiais de Arteterapia e Aquarela Infantil"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[59%_center] sm:object-center"
        />

        {/* Ambient paper texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/5 via-transparent to-white/10 pointer-events-none" />
      </div>

      {/* ========================================================= */}
      {/* 2. LIVING PAINT WELLS: Ambient liquid watercolor glow     */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cyan well pulse */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[42%] left-[29%] sm:left-[41%] w-16 h-16 sm:w-20 sm:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#68C9EA]/45 blur-xl mix-blend-multiply"
        />

        {/* Coral well pulse */}
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute top-[38%] left-[49%] sm:left-[51%] w-16 h-16 sm:w-20 sm:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FA4E74]/45 blur-xl mix-blend-multiply"
        />

        {/* Emerald green well pulse */}
        <motion.div
          animate={{
            scale: [0.95, 1.18, 0.95],
            opacity: [0.3, 0.65, 0.3],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute top-[40%] left-[69%] sm:left-[62%] w-16 h-16 sm:w-20 sm:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#56C45F]/45 blur-xl mix-blend-multiply"
        />

        {/* Sunny yellow well pulse */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.45, 0.8, 0.45],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute top-[58%] left-[40%] sm:left-[48%] w-16 h-16 sm:w-20 sm:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F9DC3F]/55 blur-xl mix-blend-multiply"
        />

        {/* Purple well pulse */}
        <motion.div
          animate={{
            scale: [1.15, 0.95, 1.15],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          className="absolute top-[58%] left-[61%] sm:left-[60%] w-16 h-16 sm:w-20 sm:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8D72A8]/45 blur-xl mix-blend-multiply"
        />
      </div>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE WATERCOLOR BLOOMS (Pointer clicks & moves) */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {droplets.map((drop) => (
          <motion.div
            key={drop.id}
            initial={{ scale: 0.2, opacity: 0.85 }}
            animate={{
              scale: [0.2, 1.4, 1.9],
              opacity: [0.85, 0.65, 0],
            }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{
              left: drop.x - drop.size / 2,
              top: drop.y - drop.size / 2,
              width: drop.size,
              height: drop.size,
              transform: `rotate(${drop.rotation}deg)`,
            }}
            className="absolute will-change-transform"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full filter blur-[1.5px] mix-blend-multiply"
              style={{ color: drop.color }}
            >
              <path
                d="M50 8 C68 9, 88 24, 91 45 C94 65, 80 86, 58 92 C37 98, 14 84, 9 62 C4 40, 28 8, 50 8 Z"
                fill="currentColor"
                fillOpacity="0.45"
              />
              <circle cx="48" cy="48" r="28" fill="currentColor" fillOpacity="0.3" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 4. TOP FLOATING BADGES & INTERACTIVE TAG                  */}
      {/* ========================================================= */}
      <div className="absolute top-3 inset-x-3 sm:inset-x-auto sm:top-6 sm:left-6 z-20 flex flex-col sm:flex-row items-center sm:items-start gap-2 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D8B08C]/60 shadow-md text-center max-w-full">
          <span className="flex h-2 w-2 rounded-full bg-[#56C45F] animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs font-bold text-[#606060] tracking-wide">
            Neurociência • Psicopedagogia • Arteterapia Infantil
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
        </div>

        {/* Small interactive tag for mobile & desktop */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#FA4E74]/50 shadow-md text-[11px] sm:text-xs font-extrabold text-[#FA4E74] animate-pulse">
          <Droplets className="w-3.5 h-3.5 text-[#FA4E74] shrink-0" />
          <span>Toque na imagem para interagir ✨</span>
        </div>
      </div>

      {/* Mobile scroll down cue */}
      <div className="sm:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-[#606060] shadow-sm border border-gray-200/60 animate-bounce">
          <span>Deslize para ver os detalhes</span>
          <span>↓</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. LOGO DO EVENTO NO CANTO INFERIOR DIREITO DA IMAGEM     */}
      {/* ========================================================= */}
      <div className="absolute bottom-6 right-3 sm:bottom-4 sm:right-6 z-25 pointer-events-none">
        <img
          src="https://i.ibb.co/zVYV3chb/patitour-2026-09-10-T133725-835.png"
          alt="Logo Oficina de Aprendizagem"
          referrerPolicy="no-referrer"
          className="h-12 sm:h-20 md:h-24 w-auto object-contain drop-shadow-md"
        />
      </div>

      {/* ========================================================= */}
      {/* 6. PAPER INTEGRATION WAVE AT BOTTOM                       */}
      {/* ========================================================= */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10">
        <div className="relative h-14 sm:h-20 w-full">
          <svg
            className="absolute inset-x-0 bottom-0 w-full h-12 sm:h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,45 C150,75 350,20 500,55 C650,90 850,25 1000,60 C1120,88 1180,40 1200,50 L1200,120 L0,120 Z"
              fill="#FA4E74"
              fillOpacity="0.06"
            />
            <path
              d="M0,60 C200,25 400,85 600,45 C800,10 980,70 1200,35 L1200,120 L0,120 Z"
              fill="#68C9EA"
              fillOpacity="0.08"
            />
            <path
              d="M0,70 C180,45 360,95 560,65 C760,35 940,85 1200,55 L1200,120 L0,120 Z"
              fill="#FFFFFF"
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
      </div>
    </div>
  );
};
