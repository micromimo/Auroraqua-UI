import { motion } from 'framer-motion';

const EFFECTS = {
  glow: {
    id: 'glow',
    name: '光晕',
    options: [
      { id: 'none', label: '无', value: 0 },
      { id: 'soft', label: '柔光', value: 20 },
      { id: 'medium', label: '中光', value: 40 },
      { id: 'strong', label: '强光', value: 70 },
    ],
  },
  shadow: {
    id: 'shadow',
    name: '阴影',
    options: [
      { id: 'none', label: '无', value: 0 },
      { id: 'soft', label: '柔影', value: 15 },
      { id: 'medium', label: '中影', value: 30 },
      { id: 'hard', label: '硬影', value: 50 },
    ],
  },
  highlight: {
    id: 'highlight',
    name: '高光',
    options: [
      { id: 'none', label: '无', value: 0 },
      { id: 'top', label: '顶部', value: 1 },
      { id: 'center', label: '中心', value: 2 },
      { id: 'corner', label: '角落', value: 3 },
    ],
  },
};

export default function BadgeEffectControls({ effects, onEffectChange }) {
  const updateEffect = (effectId, optionId) => {
    onEffectChange({
      ...effects,
      [effectId]: optionId,
    });
  };

  const getEffectValue = (effectId, optionId) => {
    const effect = EFFECTS[effectId];
    return effect.options.find(o => o.id === optionId)?.value ?? 0;
  };

  return (
    <div className="space-y-4">
      <label className="text-xs font-semibold text-heading uppercase tracking-wider">
        效果控制
      </label>
      
      {Object.values(EFFECTS).map((effect, effectIndex) => (
        <motion.div
          key={effect.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: effectIndex * 0.1 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-heading">{effect.name}</span>
            <span className="text-xs text-muted">
              {effect.options.find(o => o.id === effects[effect.id])?.label || '无'}
            </span>
          </div>
          <div className="flex gap-1.5">
            {effect.options.map((option) => (
              <button
                key={option.id}
                onClick={() => updateEffect(effect.id, option.id)}
                className={`
                  flex-1 py-1.5 px-2 rounded-lg text-xs font-medium
                  transition-all duration-200
                  ${effects[effect.id] === option.id
                    ? 'bg-white/25 text-pink-700 shadow-sm'
                    : 'bg-white/10 text-heading hover:bg-white/20'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export { EFFECTS };
