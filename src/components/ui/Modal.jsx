import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  onOverlayClick = true,
  className = '' 
}) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 modal-overlay z-50 flex items-center justify-center ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onOverlayClick ? onClose : undefined}
        >
          <motion.div
            className={`modal-panel p-6 w-full ${sizeClasses[size]}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && <h3 className="modal-title mb-5">{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ModalTitle({ children }) {
  return <h3 className="modal-title mb-5">{children}</h3>;
}

export function ModalLabel({ children, className = '' }) {
  return <label className={`modal-label mb-1.5 block ${className}`}>{children}</label>;
}

export function ModalInput({ className = '', ...props }) {
  return <input className={`modal-input w-full ${className}`} {...props} />;
}

export function ModalActionButton({ children, className = '', ...props }) {
  return <button className={`modal-action-button ${className}`} {...props}>{children}</button>;
}

export function ModalActionButtonSecondary({ children, className = '', ...props }) {
  return <button className={`modal-action-button-secondary ${className}`} {...props}>{children}</button>;
}

export function ModalCloseButton({ onClick, className = '' }) {
  return (
    <button 
      onClick={onClick}
      className={`p-2 hover:bg-white/20 rounded-lg transition-colors ${className}`}
    >
      <svg className="w-5 h-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}