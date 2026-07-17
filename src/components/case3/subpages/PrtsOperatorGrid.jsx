import { motion } from 'framer-motion';
import { Users, Shield, Zap, Star, ChevronRight } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status) {
    case 'online': return '#00ff88';
    case 'offline': return '#6b7280';
    case 'rest': return '#fbbf24';
    default: return '#6b7280';
  }
};

const getRarityStars = (rarity) => {
  return Array.from({ length: rarity }, (_, i) => (
    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
  ));
};

export default function PrtsOperatorGrid({ operators, delay = 0 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {operators.map((op, index) => (
        <motion.div
          key={op.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + index * 0.03 }}
          whileHover={{ scale: 1.05, y: -4 }}
          className="relative group p-3 rounded-xl bg-white/15 hover:bg-white/25 cursor-pointer transition-all"
        >
          {/* 稀有度边框光晕 */}
          {op.rarity >= 6 && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          )}

          {/* 状态指示器 */}
          <div
            className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2 border-white/80"
            style={{ backgroundColor: getStatusColor(op.status) }}
          >
            {op.status === 'online' && (
              <div className="absolute inset-0 rounded-full animate-ping bg-green-500/50" />
            )}
          </div>

          {/* 头像 */}
          <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-3xl shadow-inner">
            {op.avatar}
          </div>

          {/* 名称 */}
          <div className="text-center mb-1">
            <span className="text-sm font-bold text-heading">{op.name}</span>
          </div>

          {/* 职业 */}
          <div className="text-center mb-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-muted">
              {op.class}
            </span>
          </div>

          {/* 稀有度 */}
          <div className="flex items-center justify-center gap-0.5">
            {getRarityStars(op.rarity)}
          </div>

          {/* 等级和信赖 */}
          <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-muted">
            <span className="flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5" />
              Lv.{op.level}
            </span>
            <span className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5" />
              {op.trust}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
