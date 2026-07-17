import { useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const confettiInstance = confetti.create(null, { useWorker: false, resize: true });

export default function ConfettiCard({ preset, onClick }) {
  const cardRef = useRef(null);

  const handlePlay = () => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    preset.fire(confettiInstance, {
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    onClick?.();
  };

  return (
    <motion.button
      ref={cardRef}
      onClick={handlePlay}
      whileTap={{ scale: 0.97 }}
      className="h-full min-h-[180px] liquid-glass rounded-2xl p-5 flex flex-col gap-3 text-left transition-all duration-300 hover:shadow-[0_0_25px_rgba(244,114,182,0.25)] border border-white/20 group relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-pink-400/10 to-purple-400/10" />

      <div className="flex items-center justify-between relative z-10">
        <h3 className="text-base font-bold text-heading">{preset.label}</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/30 text-muted border border-white/30">
          {preset.category}
        </span>
      </div>

      <p className="text-xs text-muted leading-relaxed relative z-10 line-clamp-2 flex-1">
        {preset.description}
      </p>

      <div className="flex items-center gap-2 text-[11px] text-pink-700 relative z-10">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pink-500/20 border border-pink-400/40">
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </span>
        <span className="font-medium">点击预览动画</span>
      </div>
    </motion.button>
  );
}
