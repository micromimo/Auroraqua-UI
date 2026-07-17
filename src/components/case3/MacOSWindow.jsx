import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MacOSWindow({ 
  title, 
  children, 
  onClose, 
  isActive = true, 
  style = {},
  onFocus,
  dragConstraints,
}) {
  const [isHoveringClose, setIsHoveringClose] = useState(false);

  return (
    <motion.div
      className="absolute flex flex-col rounded-xl overflow-hidden border border-white/30"
      style={{
        background: 'rgba(240, 240, 240, 0.85)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        boxShadow: isActive
          ? '0 20px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.4)'
          : '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)',
        minWidth: 320,
        minHeight: 240,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag
      dragConstraints={dragConstraints}
      dragMomentum={false}
      onClick={(e) => {
        e.stopPropagation();
        onFocus?.();
      }}
    >
      {/* Title bar - drag handle */}
      <div 
        className="h-11 flex items-center px-4 gap-2 border-b border-black/5 shrink-0 cursor-default"
        style={{ background: 'rgba(230, 230, 230, 0.6)' }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onMouseEnter={() => setIsHoveringClose(true)}
            onMouseLeave={() => setIsHoveringClose(false)}
            className="w-3 h-3 rounded-full flex items-center justify-center transition-all"
            style={{
              background: '#FF5F57',
              boxShadow: isHoveringClose
                ? '0 0 0 1px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.3)'
                : 'none',
            }}
          >
            {isHoveringClose && (
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 2l4 4M6 2l-4 4" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
          </button>
          <button className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-all" />
          <button className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-110 transition-all" />
        </div>
        <span className="flex-1 text-center text-xs font-medium text-gray-600 truncate px-4">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 text-gray-800">
        {children}
      </div>
    </motion.div>
  );
}
