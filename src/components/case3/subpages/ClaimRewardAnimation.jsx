import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const confettiInstance = confetti.create(null, { useWorker: false, resize: true });

export default function ClaimRewardAnimation({ active, x, y, onComplete }) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!active || firedRef.current) return;
    firedRef.current = true;

    const count = 120;
    const defaults = {
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      zIndex: 9999,
      particleCount: count,
      spread: 70,
      startVelocity: 55,
      gravity: 1,
      colors: [
        '#ec4899', '#8b5cf6', '#f59e0b', '#22c55e',
        '#3b82f6', '#f97316', '#e879f9', '#14b8a6',
      ],
    };

    // 主体爆炸
    confettiInstance({
      ...defaults,
      shapes: ['circle'],
    });

    // 二次延迟小爆炸
    setTimeout(() => {
      confettiInstance({
        ...defaults,
        particleCount: count * 0.5,
        spread: 55,
        drift: -0.5,
      });
    }, 150);

    const timer = setTimeout(() => {
      firedRef.current = false;
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timer);
  }, [active, x, y, onComplete]);

  return null;
}
