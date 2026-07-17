import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Maximize2 } from 'lucide-react';
import { MATERIALS } from './BadgeMaterialSelector';
import { SHAPES } from './BadgeShapeSelector';
import { EFFECTS } from './BadgeEffectControls';

export default function BadgePreview({ image, material, shape, effects }) {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: -15, y: 15 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastRotation, setLastRotation] = useState({ x: -15, y: 15 });
  const [isHovering, setIsHovering] = useState(false);

  const materialData = MATERIALS.find(m => m.id === material) || MATERIALS[0];
  const shapeData = SHAPES.find(s => s.id === shape) || SHAPES[0];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setLastRotation(rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation({
      x: lastRotation.x + deltaY * 0.3,
      y: lastRotation.y + deltaX * 0.3,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setRotation({ x: -15, y: 15 });
  };

  const getBadgeStyle = () => {
    const baseStyle = {
      background: materialData.gradient,
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(244, 114, 182, 0.2)',
      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
    };

    // Shape styling
    if (shape === 'circle') {
      baseStyle.borderRadius = '50%';
    } else if (shape === 'star') {
      baseStyle.borderRadius = '20%';
      baseStyle.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    } else {
      baseStyle.borderRadius = `${shapeData.borderRadius}px`;
    }

    // Glow effect
    if (effects.glow !== 'none') {
      const glowValue = getEffectValue('glow', effects.glow);
      baseStyle.boxShadow = `${baseStyle.boxShadow}, 0 0 ${glowValue}px rgba(244, 114, 182, 0.6)`;
    }

    // Shadow effect
    if (effects.shadow !== 'none') {
      const shadowValue = getEffectValue('shadow', effects.shadow);
      baseStyle.boxShadow = `${baseStyle.boxShadow}, 0 ${shadowValue}px ${shadowValue * 2}px rgba(0, 0, 0, 0.4)`;
    }

    // Highlight effect
    if (effects.highlight !== 'none') {
      const highlightValue = getEffectValue('highlight', effects.highlight);
      let highlightPos = '50% 0%';
      if (highlightValue === 2) highlightPos = '50% 50%';
      if (highlightValue === 3) highlightPos = '0% 0%';
      baseStyle.background = `radial-gradient(circle at ${highlightPos}, rgba(255,255,255,0.3) 0%, ${materialData.gradient.replace('linear-gradient(135deg, ', '').replace(')', '')} 50%)`;
      // Simplify for inline style
      baseStyle.background = materialData.gradient;
      baseStyle.boxShadow = `${baseStyle.boxShadow}, inset 0 0 ${highlightValue * 10}px rgba(255,255,255,0.3)`;
    }

    return baseStyle;
  };

  const getEffectValue = (effectId, optionId) => {
    const effect = EFFECTS[effectId];
    return effect.options.find(o => o.id === optionId)?.value ?? 0;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const previewSize = shape === 'circle' || shape === 'star' || shape === '1-1' ? 200 : 240;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold text-heading uppercase tracking-wider">
          实时预览
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-muted hover:text-heading transition-colors"
            title="重置视角"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center min-h-[300px] relative overflow-hidden rounded-2xl liquid-glass"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); if (!isDragging) handleMouseUp(); }}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <motion.div
          ref={badgeRef}
          className="relative flex items-center justify-center"
          style={{ 
            width: previewSize, 
            height: previewSize * (shape === '14-5' ? 5/14 : shape === '3-2' ? 2/3 : shape === '22-35' ? 35/22 : shape === '2-3' ? 3/2 : 1),
            perspective: 1000,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            className="w-full h-full relative overflow-hidden"
            style={getBadgeStyle()}
            animate={{ 
              rotateX: rotation.x,
              rotateY: rotation.y,
            }}
            transition={isDragging ? { duration: 0 } : { type: 'spring', stiffness: 100, damping: 15 }}
          >
            {/* Image content with material */}
            {image && (
              <div className="absolute inset-0">
                <img 
                  src={image} 
                  alt="Badge" 
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Material layer on top of image */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: materialData.overlay }}
                />
              </div>
            )}

            {/* Placeholder when no image */}
            {!image && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <span className="text-2xl">✨</span>
                </div>
                <span className="text-xs text-white/60 font-medium">Badge Preview</span>
              </div>
            )}

            {/* Material overlay for base layer */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ background: materialData.overlay, mixBlendMode: 'multiply' }}
            />

            {/* Shine effect for sparkle/holo materials */}
            {(material === 'sparkle' || material === 'holo') && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)',
                  transform: `translateX(${isHovering ? '100%' : '-100%'})`,
                  transition: 'transform 0.6s ease-in-out',
                }}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-xs text-muted">
            {isDragging ? '松开鼠标完成旋转' : '拖拽旋转查看 3D 效果'}
          </p>
        </div>
      </div>
    </div>
  );
}
