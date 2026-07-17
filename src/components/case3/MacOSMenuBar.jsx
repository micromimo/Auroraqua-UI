import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Flower,
  BatteryFull,
  Monitor,
  Volume2,
  WifiOff,
  BluetoothConnected,
  Accessibility,
  Settings,
  RotateCcw,
  Power,
  Lock,
  LogOut,
  Info,
} from 'lucide-react';

const appleMenuItems = [
  { label: '关于这台 Mac', icon: Info },
  { label: '系统设定...', icon: Settings },
  { type: 'separator' },
  { label: '重启...', icon: RotateCcw },
  { label: '关机...', icon: Power },
  { type: 'separator' },
  { label: '锁定荧幕', icon: Lock },
  { label: '登出...', icon: LogOut },
];

const menuItems = [
  {
    label: 'Finder',
    children: [
      { label: '关于本机', shortcut: '' },
      { label: '系统偏好设置...', shortcut: '' },
      { label: 'App Store...', shortcut: '' },
      { type: 'separator' },
      { label: '强制退出...', shortcut: '⌥⌘Esc' },
    ],
  },
  {
    label: '文件',
    children: [
      { label: '新建 Finder 窗口', shortcut: '⌘N' },
      { label: '新建文件夹', shortcut: '⇧⌘N' },
      { label: '打开', shortcut: '⌘O' },
      { type: 'separator' },
      { label: '关闭窗口', shortcut: '⌘W' },
      { label: '存储为...', shortcut: '⇧⌘S' },
    ],
  },
  {
    label: '编辑',
    children: [
      { label: '撤销', shortcut: '⌘Z' },
      { label: '重做', shortcut: '⇧⌘Z' },
      { type: 'separator' },
      { label: '剪切', shortcut: '⌘X' },
      { label: '拷贝', shortcut: '⌘C' },
      { label: '粘贴', shortcut: '⌘V' },
      { label: '全选', shortcut: '⌘A' },
    ],
  },
  {
    label: '显示',
    children: [
      { label: '显示/隐藏工具栏', shortcut: '⌥⌘T' },
      { label: '显示/隐藏路径栏', shortcut: '⌥⌘P' },
      { label: '显示/隐藏边栏', shortcut: '⌃⌘S' },
      { type: 'separator' },
      { label: '以图标显示', shortcut: '⌘1' },
      { label: '以列表显示', shortcut: '⌘2' },
      { label: '以分栏显示', shortcut: '⌘3' },
    ],
  },
  {
    label: '窗口',
    children: [
      { label: '最小化', shortcut: '⌘M' },
      { label: '缩放', shortcut: '' },
      { type: 'separator' },
      { label: '将窗口移至前台', shortcut: '⌥⌘M' },
      { label: '全部窗口前置', shortcut: '' },
    ],
  },
  {
    label: '帮助',
    children: [
      { label: 'macOS 帮助', shortcut: '⇧⌘/' },
      { label: 'Spotlight 搜索', shortcut: '' },
    ],
  },
];

function MenuDropdown({ items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-white/20 py-1.5 z-50 overflow-hidden"
      style={{
        background: 'rgba(40, 40, 40, 0.75)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.map((child, idx) =>
        child.type === 'separator' ? (
          <div key={idx} className="my-1 border-t border-white/10 mx-2" />
        ) : (
          <div
            key={idx}
            className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-white/90 hover:bg-[#007AFF] hover:text-white cursor-pointer rounded-md mx-1 transition-colors"
          >
            {child.icon && <child.icon size={14} strokeWidth={1.8} />}
            <span className="flex-1">{child.label}</span>
            {child.shortcut && (
              <span className="text-[11px] text-white/50">{child.shortcut}</span>
            )}
          </div>
        )
      )}
    </motion.div>
  );
}

export default function MacOSMenuBar({ onToggleNotification }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const now = new Date();
  const weekDay = now.toLocaleDateString('zh-CN', { weekday: 'short' });
  const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      ref={menuRef}
      className="w-full h-7 flex items-center px-3 select-none"
      style={{
        background: 'rgba(30, 30, 30, 0.65)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Apple logo + menus */}
      <div className="flex items-center gap-0.5">
        <div className="relative">
          <button
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
          >
            <Flower size={18} color="white" />
          </button>
          {activeMenu === 'apple' && (
            <MenuDropdown items={appleMenuItems} />
          )}
        </div>
        {menuItems.map((item) => (
          <div key={item.label} className="relative">
            <button
              className="px-2.5 py-0.5 text-[13px] font-semibold text-white/90 rounded hover:bg-white/10 transition-colors"
              onClick={() =>
                setActiveMenu(activeMenu === item.label ? null : item.label)
              }
            >
              {item.label}
            </button>
            {activeMenu === item.label && (
              <MenuDropdown items={item.children} />
            )}
          </div>
        ))}
      </div>

      {/* Right side - status icons + time */}
      <div className="ml-auto flex items-center gap-1.5">
        <WifiOff size={13} color="white" strokeWidth={1.8} />
        <BluetoothConnected size={13} color="white" strokeWidth={1.8} />
        <Accessibility size={13} color="white" strokeWidth={1.8} />
        <BatteryFull size={13} color="white" strokeWidth={1.8} />
        <Monitor size={13} color="white" strokeWidth={1.8} />
        <Volume2 size={13} color="white" strokeWidth={1.8} />
        <button
          className="px-2 py-0.5 text-[12px] text-white/90 font-medium rounded hover:bg-white/10 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onToggleNotification?.();
          }}
        >
          {weekDay} {timeStr}
        </button>
      </div>
    </div>
  );
}
