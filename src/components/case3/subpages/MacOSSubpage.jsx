import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stars } from 'lucide-react';
import { defaultApps } from '../MacOSAppIcon';
import MacOSDock from '../MacOSDock';
import MacOSMenuBar from '../MacOSMenuBar';
import MacOSWindow from '../MacOSWindow';
import NotificationCenter from '../NotificationCenter';

const windowContent = {
  finder: (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 border-b border-white/50">
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-lg bg-white/60 flex items-center justify-center hover:bg-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/60 flex items-center justify-center hover:bg-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
        <div className="flex-1 h-7 rounded-lg bg-white/60 border border-white/80 flex items-center px-2 gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <span className="text-[11px] text-gray-500">桌面</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          <span className="text-[11px] text-gray-400">文稿</span>
        </div>
        <div className="flex items-center gap-1">
          {['列表', '分栏', '画廊'].map((view, i) => (
            <div key={view} className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${i === 2 ? 'bg-[#5AC8FA]/30' : 'hover:bg-white/60'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={i === 2 ? '#5AC8FA' : '#777'} strokeWidth="2">
                {i === 0 && <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /> </>}
                {i === 1 && <><rect x="3" y="3" width="18" height="5" /><rect x="3" y="10" width="18" height="5" /><rect x="3" y="17" width="18" height="5" /></>}
                {i === 2 && <><rect x="3" y="3" width="5" height="5" /><rect x="10" y="3" width="5" height="5" /><rect x="17" y="3" width="5" height="5" /><rect x="3" y="10" width="5" height="5" /><rect x="10" y="10" width="5" height="5" /><rect x="17" y="10" width="5" height="5" /><rect x="3" y="17" width="5" height="5" /><rect x="10" y="17" width="5" height="5" /><rect x="17" y="17" width="5" height="5" /></>}
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 bg-white/30 border-r border-white/40 p-2 space-y-0.5">
          {[
            { name: '桌面', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: true },
            { name: '文稿', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6', active: false },
            { name: '下载', icon: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3', active: false },
            { name: '应用', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', active: false },
            { name: '图片', icon: 'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M21 15l-5-5L5 21', active: false },
            { name: '音乐', icon: 'M9 18V5l12-2v13 M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M18 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', active: false },
            { name: '影片', icon: 'M23 7l-7 5 7 5V7z M16 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z', active: false },
            { name: '废纸篓', icon: 'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', active: false },
          ].map((item) => (
            <div key={item.name} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[11px] transition-colors ${item.active ? 'bg-[#5AC8FA]/25 text-[#007AFF] font-medium' : 'text-gray-600 hover:bg-white/50'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span>{item.name}</span>
            </div>
          ))}
          <div className="border-t border-white/30 my-2" />
          {['iCloud 云盘', 'AirDrop'].map((name) => (
            <div key={name} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[11px] text-gray-500 hover:bg-white/50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
              <span>{name}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-3 overflow-auto">
          <div className="grid grid-cols-4 gap-2.5">
            {[
              { name: '项目文档', type: 'folder' },
              { name: '设计素材', type: 'folder' },
              { name: '会议记录', type: 'folder' },
              { name: '旅行计划', type: 'folder' },
              { name: '预算表', type: 'numbers' },
              { name: '产品说明', type: 'pages' },
              { name: '演示文稿', type: 'keynote' },
              { name: '截图存档', type: 'folder' },
            ].map((item, i) => {
              const typeColor = {
                folder: 'bg-[#5AC8FA]',
                numbers: 'bg-[#34C759]',
                pages:   'bg-[#FF2D55]',
                keynote: 'bg-[#FFCC00]',
              }[item.type] || 'bg-[#8E8E93]';
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.5)' }}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-white/40 transition-colors cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl ${typeColor} flex items-center justify-center shadow-md`}>
                    {item.type === 'folder' ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    ) : (
                      <span className="text-white text-xs font-bold">{item.type[0].toUpperCase()}</span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-700 text-center truncate w-full">{item.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-white/50 border-t border-white/40 text-[10px] text-gray-500">
        <span>8 个项目</span>
        <span>可用 234 GB</span>
      </div>
    </div>
  ),

  music: (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#E8A0A0] to-[#D48B8B] flex items-center justify-center shadow-xl">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-800">正在播放</p>
        <p className="text-xs text-gray-500 mt-1">随机播放您的音乐库</p>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#666"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  ),

  photos: (
    <div className="h-full p-4">
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200"
            style={{ aspectRatio: '1' }}
          />
        ))}
      </div>
    </div>
  ),

  steam: (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-3 border-b border-black/5">
        <div className="w-6 h-6 rounded bg-[#9BB8D0] flex items-center justify-center text-white text-xs font-bold">S</div>
        <span className="text-sm font-medium text-gray-700">Steam 商店</span>
      </div>
      <div className="flex-1 p-4 space-y-3">
        {['艾尔登法环', '博德之门3', '星露谷物语', '空洞骑士'].map((game, i) => (
          <div key={game} className="flex items-center gap-3 p-2 rounded-lg bg-white/50 border border-white/60">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-xs">
              {game[0]}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">{game}</p>
              <p className="text-[10px] text-gray-500">¥ 198.00</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  preview: (
    <div className="h-full flex items-center justify-center bg-white/30">
      <div className="w-64 h-64 rounded-xl bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center shadow-lg">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9BB8D0" strokeWidth="1">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </div>
    </div>
  ),

  notes: (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-2 border-b border-black/5">
        <div className="w-5 h-5 rounded bg-[#E8D4B0] flex items-center justify-center text-white text-[10px] font-bold">N</div>
        <span className="text-xs font-medium text-gray-700">备忘录</span>
      </div>
      <div className="flex-1 p-3 space-y-2">
        {['会议记录', '待办事项', '项目笔记', '灵感想法'].map((title) => (
          <div key={title} className="p-3 rounded-lg bg-white/60 border border-white/70 hover:bg-white/80 transition-colors cursor-pointer">
            <p className="text-xs font-medium text-gray-700">{title}</p>
            <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">点击编辑内容...</p>
          </div>
        ))}
      </div>
    </div>
  ),

  vscode: (
    <div className="h-full flex flex-col bg-[#1E1E1E]">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] text-gray-400">welcome.js — VSCode</span>
      </div>
      <div className="flex-1 flex">
        <div className="w-10 border-r border-white/5 py-2 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-6 h-6 mx-auto rounded bg-white/10" />
          ))}
        </div>
        <div className="flex-1 p-3 font-mono text-[11px] text-gray-300 leading-5">
          <p><span className="text-purple-400">const</span> <span className="text-blue-400">app</span> = <span className="text-yellow-400">'macOS'</span>;</p>
          <p className="mt-1"><span className="text-purple-400">function</span> <span className="text-green-400">hello</span>() {'{'}</p>
          <p className="ml-4">console.<span className="text-yellow-400">log</span>(<span className="text-green-400">'Hello World'</span>);</p>
          <p>{'}'}</p>
        </div>
      </div>
    </div>
  ),

  firefox: (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 bg-white/60 border-b border-white/50">
        <Stars size={14} color="#D4B898" strokeWidth={2} />
        <div className="flex-1 h-5 rounded bg-white/70 border border-white/80 flex items-center px-2">
          <span className="text-[10px] text-gray-400">搜索或输入网址</span>
        </div>
      </div>
      <div className="flex-1 bg-white/40 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4B898] to-[#B8956E] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 shadow-lg">
            <Stars size={32} color="white" strokeWidth={2} />
          </div>
          <p className="text-sm font-medium text-gray-700">Firefox 浏览器</p>
          <p className="text-xs text-gray-500 mt-1">安全、快速、自由</p>
        </div>
      </div>
    </div>
  ),

  terminal: (
    <div className="h-full flex flex-col bg-black">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] text-gray-500">Terminal — zsh</span>
      </div>
      <div className="flex-1 p-3 font-mono text-[11px] text-gray-300 leading-5">
        <p><span className="text-green-400">user@macOS</span> <span className="text-gray-500">~</span> % <span className="text-white">ls -la</span></p>
        <p className="text-gray-400">total 48</p>
        <p className="text-gray-400">drwxr-xr-x  12 user  staff   384  7 17 10:00 .</p>
        <p className="text-gray-400">drwxr-xr-x   6 user  staff   192  7 16 18:20 ..</p>
        <p className="mt-2"><span className="text-green-400">user@macOS</span> <span className="text-gray-500">~</span> % <span className="animate-pulse text-white">|</span></p>
      </div>
    </div>
  ),
};

export default function MacOSSubpage() {
  const [windows, setWindows] = useState([]);
  const zIndexCounterRef = useRef(10);
  const [runningApps, setRunningApps] = useState([]);
  const desktopRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleLaunch = useCallback((app) => {
    setRunningApps((prev) => (prev.includes(app.id) ? prev : [...prev, app.id]));

    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === app.id);
      if (existing) {
        zIndexCounterRef.current += 1;
        return prev.map((w) =>
          w.id === existing.id ? { ...w, zIndex: zIndexCounterRef.current } : w
        );
      }

      zIndexCounterRef.current += 1;
      const newWindow = {
        id: `${app.id}-${Date.now()}`,
        appId: app.id,
        title: app.name,
        zIndex: zIndexCounterRef.current,
        x: 50 + prev.length * 20,
        y: 50 + prev.length * 20,
        width: 480,
        height: 360,
      };
      return [...prev, newWindow];
    });
  }, []);

  const handleClose = useCallback((windowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const handleFocus = useCallback((windowId) => {
    zIndexCounterRef.current += 1;
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, zIndex: zIndexCounterRef.current } : w))
    );
  }, []);

  const handleDragEnd = useCallback((windowId, info) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== windowId) return w;
        return {
          ...w,
          x: w.x + info.offset.x,
          y: w.y + info.offset.y,
        };
      })
    );
  }, []);

  const bringToFront = useCallback(() => {
    if (windows.length === 0) return;
    const topWindow = windows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
    handleFocus(topWindow.id);
  }, [windows, handleFocus]);

  const maxZIndex = Math.max(...windows.map((w) => w.zIndex), 0);

  return (
    <div
      ref={desktopRef}
      className="h-full w-full relative overflow-hidden rounded-2xl"
      onClick={bringToFront}
    >
      {/* Desktop wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://cn.bing.com/th?id=OHR.SunbeamsForest_ZH-CN5358008117_UHD.jpg&rf=LaDigue_1920x1080.jpg&pid=hp)',
        }}
      >
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)',
        }} />
      </div>

      {/* Menu Bar */}
      <div className="absolute top-0 left-0 right-0 z-40">
        <MacOSMenuBar onToggleNotification={() => setShowNotification((v) => !v)} />
      </div>

      {/* Notification Center */}
      <AnimatePresence>
        {showNotification && (
          <NotificationCenter onClose={() => setShowNotification(false)} />
        )}
      </AnimatePresence>

      {/* Windows */}
      <div className="absolute inset-0 pt-7 pb-20">
        <AnimatePresence>
          {windows.map((win) => {
            const app = defaultApps.find((a) => a.id === win.appId);
            const content = windowContent[win.appId];
            const isActive = win.zIndex === maxZIndex;
            return (
              <MacOSWindow
                key={win.id}
                title={app?.name || win.title}
                isActive={isActive}
                onClose={() => handleClose(win.id)}
                onFocus={() => handleFocus(win.id)}
                dragConstraints={desktopRef}
                style={{
                  left: win.x,
                  top: win.y,
                  width: win.width,
                  height: win.height,
                  zIndex: win.zIndex,
                }}
                onDragEnd={(e, info) => handleDragEnd(win.id, info)}
              >
                {content}
              </MacOSWindow>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <MacOSDock
          apps={defaultApps}
          onLaunch={handleLaunch}
          runningApps={runningApps}
        />
      </div>
    </div>
  );
}
