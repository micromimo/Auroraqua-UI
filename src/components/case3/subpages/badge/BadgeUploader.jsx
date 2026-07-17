import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export default function BadgeUploader({ image, onImageChange, onImageRemove }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('仅支持 PNG、JPG、WEBP 格式');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('文件大小不能超过 10MB');
      return false;
    }
    setError('');
    return true;
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => onImageChange(e.target.result);
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => onImageChange(e.target.result);
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-heading uppercase tracking-wider">
        素材图片
      </label>
      
      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
              transition-all duration-300
              ${isDragging 
                ? 'border-pink-400 bg-pink-500/10' 
                : 'border-white/30 hover:border-white/50 hover:bg-white/5'
              }
              ${error ? 'border-red-400' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('badge-file-input').click()}
          >
            <input
              id="badge-file-input"
              type="file"
              accept={ACCEPTED_TYPES.join(',')}
              onChange={handleFileChange}
              className="hidden"
            />
            <motion.div 
              className="flex flex-col items-center gap-3"
              animate={{ y: isDragging ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                <Upload className="w-7 h-7 text-muted" />
              </div>
              <div>
                <p className="text-sm font-medium text-heading">
                  点击或拖拽上传图片
                </p>
                <p className="text-xs text-muted mt-1">
                  PNG、JPG、WEBP，最大 10MB
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative rounded-2xl overflow-hidden border border-white/20 liquid-glass"
          >
            <div className="aspect-video relative">
              <img 
                src={image} 
                alt="上传的素材" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={onImageRemove}
                  className="p-2 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-muted" />
                <span className="text-xs text-muted">素材已加载</span>
              </div>
              <button
                onClick={onImageRemove}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                移除
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
