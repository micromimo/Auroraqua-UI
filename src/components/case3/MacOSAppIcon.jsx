import { motion } from 'framer-motion';
import {
  Music,
  Package,
  Gamepad2,
  Code2,
  Terminal,
  Album,
  View,
  Stars,
  Save,
} from 'lucide-react';

const iconMap = {
  music: Music,
  finder: Package,
  steam: Gamepad2,
  vscode: Code2,
  terminal: Terminal,
  photos: Album,
  preview: View,
  firefox: Stars,
  notes: Save,
};

const defaultApps = [
  { id: 'finder', name: 'Finder', color: '#C9B1FF', icon: 'finder' },
  { id: 'music', name: 'AppleMusic', color: '#FFB5C2', icon: 'music' },
  { id: 'photos', name: 'Photos', color: '#FFD1A4', icon: 'photos' },
  { id: 'steam', name: 'Steam', color: '#A2D2FF', icon: 'steam' },
  { id: 'preview', name: 'Preview', color: '#B5EAD7', icon: 'preview' },
  { id: 'notes', name: 'Notes', color: '#FFE5B4', icon: 'notes' },
  { id: 'vscode', name: 'VSCode', color: '#9DB8D4', icon: 'vscode' },
  { id: 'firefox', name: 'Firefox', color: '#FFB7B2', icon: 'firefox' },
  { id: 'terminal', name: 'Terminal', color: '#C1E1C1', icon: 'terminal' },
];

export { defaultApps };

export default function MacOSAppIcon({ app, onClick, scale = 1, running = false, isActive = false }) {
  const IconComponent = iconMap[app.icon];
  const iconSize = 52 * scale;
  const iconInnerSize = Math.max(iconSize - 18, 16);

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer select-none"
      onClick={() => onClick?.(app)}
      whileTap={{ scale: 0.9 }}
      animate={{ scale }}
      transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.5 }}
    >
      <div className="relative">
        <div
          className="rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200"
          style={{
            width: iconSize,
            height: iconSize,
            boxShadow: isActive
              ? '0 0 0 3px rgba(255,255,255,0.6), 0 4px 16px rgba(0,0,0,0.3)'
              : '0 4px 12px rgba(0,0,0,0.25)',
          }}
        >
          {IconComponent && (
            <IconComponent
              className="transition-colors"
              style={{ width: iconInnerSize, height: iconInnerSize, color: app.color }}
            />
          )}
        </div>
      </div>
      <div className="h-2 w-full flex items-center justify-center">
        {running && (
          <div className="w-1 h-1 rounded-full bg-white/90" />
        )}
      </div>
    </motion.div>
  );
}
