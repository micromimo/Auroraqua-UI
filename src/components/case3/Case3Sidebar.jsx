import { Link } from 'react-router-dom';
import { ChevronLeft, Command, Airplay } from 'lucide-react';
import { motion } from 'framer-motion';
import NavBar from './NavBar';

const sidebarItems = [
  { id: 'dashboard', label: 'Admin Dashboard', icon: 'Command', path: '/case3/dashboard' },
  { id: 'video', label: 'MeTube', icon: 'PlayCircle', path: '/case3/video' },
  { id: 'social', label: 'Prysm™ Social ', icon: 'Users', path: '/case3/social/main' },
  { id: 'chat', label: 'Messenger', icon: 'MessageSquare', path: '/case3/chat' },
  { id: 'music', label: 'Music', icon: 'Music', path: '/case3/music' },
  { id: 'mindmap', label: 'Mermaid Flowchart&Diagrams', icon: 'GitBranch', path: '/case3/mindmap' },
  { id: 'markdown', label: 'Markdown', icon: 'FileText', path: '/case3/markdown' },
  { id: 'prts', label: 'PRTS', icon: 'Diamond', path: '/case3/prts' },
  { id: 'macos', label: 'MacOS', icon: 'Airplay', path: '/case3/macos' },
  { id: 'forum', label: 'Forum', icon: 'MessageCircle', path: '/case3/forum' },
  { id: 'lucide', label: 'Lucide Exposé', icon: 'Sparkles', path: '/case3/lucide' },
  { id: 'management', label: 'Management', icon: 'Database', path: '/case3/management' },
  { id: 'confetti', label: 'Confetti Booth', icon: 'PartyPopper', path: '/case3/confetti' },
  { id: 'badge', label: 'Badge Inspect', icon: 'BadgeCheck', path: '/case3/badge' },
];

const iconMap = {
  LayoutDashboard: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Command: ({ className }) => (
    <Command className={className} />
  ),
  PlayCircle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  ),
  Users: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Database: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  FileText: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  GitBranch: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  MessageSquare: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  MessageCircle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Music: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  HardDrive: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="12" x2="2" y2="12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" y1="16" x2="6.01" y2="16" />
      <line x1="10" y1="16" x2="10.01" y2="16" />
    </svg>
  ),
  Diamond: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
    </svg>
  ),
  Monitor: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Airplay: ({ className }) => (
    <Airplay className={className} />
  ),
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  PartyPopper: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.8 11.3 2 22l10.7-3.79" />
      <path d="M4 3h.01" />
      <path d="M22 8h.01" />
      <path d="M15 2h.01" />
      <path d="M22 20h.01" />
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44a6 6 0 0 0 .37 2.64c.23.72.85 1.26 1.59 1.26h.38c.86 0 1.6-.6 1.76-1.44a2.9 2.9 0 0 0 .03-1.3" />
      <path d="m22 13-2.24.75a2.9 2.9 0 0 1-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44a6 6 0 0 1 .37 2.64c.23.72.85 1.26 1.59 1.26h.38c.86 0 1.6-.6 1.76-1.44a2.9 2.9 0 0 1 .03-1.3" />
      <path d="M16 16h.01" />
      <path d="M8 16h.01" />
      <path d="M12 20h.01" />
      <path d="M17 18h.01" />
      <path d="M7 18h.01" />
    </svg>
  ),
  BadgeCheck: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
};

export { sidebarItems };

export default function Case3Sidebar({ 
  sidebarOpen, 
  onToggle, 
  currentSubpage 
}) {
  const isActive = (itemId) => currentSubpage === itemId;

  return (
    <div className="fixed left-0 top-[22px] bottom-4 z-50">
      <NavBar onToggle={onToggle} style={{ marginLeft: '8px', marginRight: '8px', top: '0' }} />
      
      <aside className={`absolute left-6 top-0 bottom-0 w-[280px] transition-all duration-500 ease-out ${sidebarOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'}`}>
        <motion.div 
          className="h-full liquid-glass rounded-2xl p-4 flex flex-col"
          initial={false}
          animate={{ 
            scale: sidebarOpen ? 1 : 0.95,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden avatar-border">
              <img src="/favicon.ico" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-sm font-bold gradient-text">Aurorαqua UI</h2>
              <p className="text-[10px] text-muted">Case3</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all sidebar-white"
            style={{ color: '#666666' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-1">
          {sidebarItems.map((item, index) => {
            const Icon = iconMap[item.icon];
            const active = isActive(item.id);
            return (
              <motion.div
                key={item.id}
                initial={sidebarOpen ? { opacity: 0, x: -20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: sidebarOpen ? index * 0.05 : 0,
                  ease: 'easeOut'
                }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    active 
                      ? 'text-pink-700' 
                      : 'hover:bg-white/20'
                  }`}
                  style={active ? {
                    background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
                    boxShadow: '0 0 8px rgba(244, 114, 182, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                  } : { color: 'var(--text-body)' }}
                >
                  {active && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </div>
                  )}
                  <Icon className={`w-5 h-5 relative z-10 ${active ? 'drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]' : ''}`} />
                  <span className="font-medium text-sm relative z-10">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-xs text-muted mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>{sidebarItems.length} 个展示页面</span>
          </div>
        </div>
        </motion.div>
      </aside>
    </div>
  );
}