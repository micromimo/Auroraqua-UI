import { motion } from 'framer-motion';

export const MATERIALS = [
  { 
    id: 'fresh', 
    name: '青葱', 
    description: '清新淡雅',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    overlay: 'rgba(168, 237, 234, 0.2)',
  },
  { 
    id: 'sparkle', 
    name: '星闪', 
    description: '璀璨闪耀',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    overlay: 'rgba(255, 236, 210, 0.3)',
  },
  { 
    id: 'matte', 
    name: '磨砂', 
    description: '哑光质感',
    gradient: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
    overlay: 'rgba(192, 192, 192, 0.15)',
  },
  { 
    id: 'holo', 
    name: '镭射', 
    description: '彩虹幻彩',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 25%, #6bcb77 50%, #4d96ff 75%, #ff6b6b 100%)',
    overlay: 'rgba(255, 255, 255, 0.15)',
  },
  { 
    id: 'velvet', 
    name: '绒面', 
    description: '柔软绒感',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overlay: 'rgba(102, 126, 234, 0.15)',
  },
];

export default function BadgeMaterialSelector({ material, onMaterialChange }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-heading uppercase tracking-wider">
        材质选择
      </label>
      <div className="grid grid-cols-5 gap-2">
        {MATERIALS.map((mat, index) => (
          <motion.button
            key={mat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onMaterialChange(mat.id)}
            className={`
              relative group aspect-square rounded-xl overflow-hidden
              border-2 transition-all duration-300
              ${material === mat.id 
                ? 'border-white shadow-[0_0_20px_rgba(244,114,182,0.5)]' 
                : 'border-white/20 hover:border-white/40'
              }
            `}
            style={{ background: mat.gradient }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
              <span className="text-xs font-medium text-heading drop-shadow-sm">
                {mat.name}
              </span>
            </div>
            {material === mat.id && (
              <motion.div
                layoutId="material-indicator"
                className="absolute inset-0 bg-white/20"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
