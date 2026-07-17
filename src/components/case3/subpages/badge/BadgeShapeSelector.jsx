import { motion } from 'framer-motion';

const SHAPES = [
  { id: '14-5', label: '14:5', name: '宽幅', aspectRatio: 14/5, borderRadius: 12 },
  { id: '3-2', label: '3:2', name: '经典', aspectRatio: 3/2, borderRadius: 16 },
  { id: '22-35', label: '22:35', name: '竖版', aspectRatio: 22/35, borderRadius: 14 },
  { id: '2-3', label: '2:3', name: '长竖', aspectRatio: 2/3, borderRadius: 18 },
  { id: '1-1', label: '1:1', name: '方形', aspectRatio: 1, borderRadius: 20 },
  { id: 'circle', label: '圆形', name: '圆盘', aspectRatio: 1, borderRadius: '50%' },
  { id: 'star', label: '星形', name: '八角星', aspectRatio: 1, borderRadius: 'star' },
];

export default function BadgeShapeSelector({ shape, onShapeChange }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-heading uppercase tracking-wider">
        形状选择
      </label>
      <div className="flex flex-wrap gap-2">
        {SHAPES.map((s, index) => (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onShapeChange(s.id)}
            className={`
              relative px-4 py-2.5 rounded-xl text-xs font-medium
              border transition-all duration-300
              ${shape === s.id 
                ? 'border-white bg-white/20 text-pink-700' 
                : 'border-white/20 hover:border-white/40 text-heading hover:bg-white/10'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{s.label}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export { SHAPES };
