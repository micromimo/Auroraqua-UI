import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import DynamicIcon from 'lucide-react/dist/esm/DynamicIcon';

export default function LucideIconCard({ name, index, copied, onCopy }) {
  // 将 PascalCase 转回 kebab-case，用于 DynamicIcon 的 name 属性
  const kebabName = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.01, duration: 0.2 }}
      className="group relative flex flex-col items-center justify-center p-4 rounded-xl liquid-glass hover:bg-white/20 transition-all cursor-pointer"
      onClick={onCopy}
      title={`${name} - 点击复制导入代码`}
    >
      <div className="w-10 h-10 flex items-center justify-center mb-2 text-heading">
        <DynamicIcon
          name={kebabName}
          strokeWidth={1.5}
          fallback={() => <span className="text-xs text-muted">?</span>}
        />
      </div>
      
      <span className="text-xs text-muted text-center truncate w-full font-mono">
        {name}
      </span>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Copy className="w-4 h-4 text-muted" />
        )}
      </div>
    </motion.div>
  );
}
