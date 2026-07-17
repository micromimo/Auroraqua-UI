import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Check } from 'lucide-react';
import { EFFECTS } from './BadgeEffectControls';

export default function BadgeExport({ image, material, shape, effects, shapeData, materialData }) {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const getBadgeStyle = (size) => {
    const baseStyle = {
      background: materialData.gradient,
      transform: 'rotateX(-15deg) rotateY(15deg)',
    };

    if (shape === 'circle') {
      baseStyle.borderRadius = '50%';
    } else if (shape === 'star') {
      baseStyle.borderRadius = '20%';
      baseStyle.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    } else {
      baseStyle.borderRadius = `${shapeData.borderRadius}px`;
    }

    if (effects.glow !== 'none') {
      const glowValue = EFFECTS.glow.options.find(o => o.id === effects.glow)?.value || 0;
      baseStyle.boxShadow = `0 0 ${glowValue}px rgba(244, 114, 182, 0.6)`;
    }

    if (effects.shadow !== 'none') {
      const shadowValue = EFFECTS.shadow.options.find(o => o.id === effects.shadow)?.value || 0;
      baseStyle.boxShadow = `${baseStyle.boxShadow || ''} 0 ${shadowValue}px ${shadowValue * 2}px rgba(0, 0, 0, 0.4)`;
    }

    return baseStyle;
  };

  const getEffectValue = (effectId, optionId) => {
    const effect = EFFECTS[effectId];
    return effect.options.find(o => o.id === optionId)?.value ?? 0;
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 512;
      
      canvas.width = size;
      canvas.height = shape === '14-5' ? size * (5/14) : 
                      shape === '3-2' ? size * (2/3) : 
                      shape === '22-35' ? size * (35/22) : 
                      shape === '2-3' ? size * (3/2) : 
                      size;

      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#ff6b6b');
      gradient.addColorStop(0.5, '#ffd93d');
      gradient.addColorStop(1, '#6bcb77');
      ctx.fillStyle = gradient;
      
      if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(size/2, canvas.height/2, size/2, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape === 'star') {
        drawStar(ctx, size/2, canvas.height/2, 5, size/2, size/4);
      } else {
        ctx.beginPath();
        ctx.roundRect(0, 0, size, canvas.height, shapeData.borderRadius || 16);
        ctx.fill();
      }

      if (image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = image;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        const padding = 20;
        ctx.drawImage(
          img, 
          padding, 
          padding, 
          size - padding * 2, 
          canvas.height - padding * 2
        );
      }

      const link = document.createElement('a');
      link.download = `badge-${material}-${shape}-${Date.now()}.${format}`;
      link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`, 0.9);
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  };

  const handleCopyImage = async () => {
    if (!image) return;
    
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-heading uppercase tracking-wider">
        导出成品
      </label>

      <div className="liquid-glass rounded-2xl p-4 space-y-4">
        <div className="flex justify-center">
          <div 
            className="relative overflow-hidden"
            style={{
              width: 120,
              height: shape === '14-5' ? 120 * (5/14) : 
                      shape === '3-2' ? 120 * (2/3) : 
                      shape === '22-35' ? 120 * (35/22) : 
                      shape === '2-3' ? 120 * (3/2) : 120,
              ...getBadgeStyle(120),
            }}
          >
            {image && (
              <div className="absolute inset-0">
                <img src={image} alt="Badge" className="w-full h-full object-cover" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: materialData.overlay }} />
              </div>
            )}
            {!image && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/40 text-xs">No Image</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleExport('png')}
            disabled={isExporting}
            className="glass-button flex items-center justify-center gap-2 py-2.5"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">PNG</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleExport('jpg')}
            disabled={isExporting}
            className="glass-button flex items-center justify-center gap-2 py-2.5"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">JPG</span>
          </motion.button>
        </div>

        {image && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyImage}
            className="w-full glass-button flex items-center justify-center gap-2 py-2.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">已复制到剪贴板</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-sm font-medium">复制图片</span>
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
