import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, LayoutDashboard, Database, MessageSquare, FileText, GitBranch, PlayCircle, Users, MessageCircle, Settings, Info, Music, ChevronLeft } from 'lucide-react';
import UserAvatar from '../components/common/UserAvatar';
import DashboardSubpage from './case3/DashboardSubpage';
import ManagementSubpage from './case3/ManagementSubpage';
import ChatSubpage from './case3/ChatSubpage';
import MarkdownSubpage from './case3/MarkdownSubpage';
import MindmapSubpage from './case3/MindmapSubpage';
import VideoSubpage from './case3/VideoSubpage';
import SocialSubpage from './case3/SocialSubpage';
import ForumSubpage from './case3/ForumSubpage';
import MusicSubpage from './case3/MusicSubpage';

const sidebarItems = [
  { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard, path: '/case3/dashboard' },
  { id: 'video', label: 'MeTube', icon: PlayCircle, path: '/case3/video' },
  { id: 'social', label: 'Social Media', icon: Users, path: '/case3/social/main' },
  { id: 'management', label: 'Management', icon: Database, path: '/case3/management' },
  { id: 'markdown', label: 'Markdown', icon: FileText, path: '/case3/markdown' },
  { id: 'mindmap', label: 'Mermaid Flowchart&Diagrams', icon: GitBranch, path: '/case3/mindmap' },
  { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/case3/chat' },
  { id: 'forum', label: 'Forum', icon: MessageCircle, path: '/case3/forum' },
  { id: 'music', label: 'Music', icon: Music, path: '/case3/music' },
];

function Case3() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSubpage, setCurrentSubpage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const path = location.pathname.replace('/case3/', '');
    const found = sidebarItems.find(item => item.path === location.pathname);
    if (found) {
      setCurrentSubpage(found.id);
    } else if (location.pathname.startsWith('/case3/social/')) {
      setCurrentSubpage('social');
    } else {
      setCurrentSubpage('dashboard');
    }
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const found = sidebarItems.find(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (found) {
        navigate(found.path);
        setSearchQuery('');
      }
    }
  };

  const isActive = (itemId) => currentSubpage === itemId;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderSubpage = () => {
    switch (currentSubpage) {
      case 'dashboard':
        return <DashboardSubpage />;
      case 'management':
        return <ManagementSubpage />;
      case 'chat':
        return <ChatSubpage />;
      case 'markdown':
        return <MarkdownSubpage />;
      case 'mindmap':
        return <MindmapSubpage />;
      case 'video':
        return <VideoSubpage />;
      case 'social':
        return <SocialSubpage />;
      case 'forum':
        return <ForumSubpage />;
      case 'music':
        return <MusicSubpage />;
      default:
        return <DashboardSubpage />;
    }
  };

  return (
    <div className="w-screen h-screen flex relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 40%, #E6E6FA 100%)'
    }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-30" 
             style={{ background: 'radial-gradient(circle, #ff6b9d 0%, transparent 70%)', top: '-10%', right: '-10%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-25" 
             style={{ background: 'radial-gradient(circle, #7b61ff 0%, transparent 70%)', bottom: '-5%', left: '20%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-20" 
             style={{ background: 'radial-gradient(circle, #ffb86b 0%, transparent 70%)', top: '40%', right: '30%' }} />
      </div>

      <div className="fixed left-0 top-[22px] bottom-4 z-50">
        <div className="sidebar-track" onClick={toggleSidebar} style={{ marginLeft: '8px', marginRight: '8px', top: '0' }}>
          <div className="sidebar-thumb" />
        </div>
        
        <aside className={`absolute left-6 top-0 bottom-0 w-[280px] transition-all duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'}`}>
          <div className="h-full liquid-glass rounded-2xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/favicon.ico" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-sm font-bold gradient-text">Aurorάqua UI</h2>
                <p className="text-[10px] text-slate-500">Case3</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all sidebar-white"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    active 
                      ? 'text-pink-700' 
                      : 'text-slate-600 hover:text-slate-800 hover:bg-white/20'
                  }`}
                  style={active ? {
                    background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
                    boxShadow: '0 0 20px rgba(244, 114, 182, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                  } : {}}
                >
                  {active && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </div>
                  )}
                  <Icon className={`w-5 h-5 relative z-10 ${active ? 'drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]' : ''}`} />
                  <span className="font-medium text-sm relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>9 个展示页面</span>
            </div>
          </div>
        </div>
      </aside>
      </div>

      <div className={`flex-1 relative transition-all duration-300 ${sidebarOpen ? 'pl-[304px]' : 'pl-16'}`}>
        <header className={`fixed top-0 right-0 h-16 z-40 px-6 flex items-center justify-end transition-all duration-300 ${sidebarOpen ? 'left-[304px]' : 'left-16'}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                placeholder=""
                className="input-glass pl-9 pr-4 py-2.5 text-sm w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            <Link to="/settings" className="glass-button text-sm flex items-center gap-2 hover:text-pink-700">
              <Settings className="w-4 h-4" />
              <span>设置</span>
            </Link>
            <Link to="/about" className="glass-button text-sm flex items-center gap-2 hover:text-pink-700">
              <Info className="w-4 h-4" />
              <span>关于</span>
            </Link>
            <Link to="/init" className="glass-button text-sm flex items-center gap-2 hover:text-pink-700">
              <Home className="w-4 h-4" />
              <span>Init</span>
            </Link>
            <UserAvatar />
          </div>
        </header>

        <main className="pt-20 px-6 pb-6 h-full overflow-auto">
          <div className="h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSubpage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {renderSubpage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Case3;