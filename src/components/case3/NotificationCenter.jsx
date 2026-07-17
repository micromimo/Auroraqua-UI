import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wifi, BatteryFull } from 'lucide-react';

const notifications = [
  {
    id: 1,
    app: '集战',
    icon: '🎮',
    title: '集战战略全新主题现已开启！',
    desc: '黑流之下，树海之中，埋藏着不止一个秘密。',
    time: '16:20',
  },
  {
    id: 2,
    app: '微博',
    icon: '📱',
    title: '明日方舟 Arknights',
    desc: '《沦沧者的黑流树海》集成战略主题现已开启！官网链接：网页链接',
    time: '16:02',
  },
  {
    id: 3,
    app: '压缩',
    icon: '📦',
    title: '压缩完成',
    desc: '已建立「AoruraquaUI.zip」档案',
    time: '09:16',
  },
];

function CalendarWidget() {
  const now = new Date();
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), i - 3);
    return {
      day: d.getDate(),
      month: d.getMonth(),
      isCurrentMonth: d.getMonth() === now.getMonth(),
      isToday: d.toDateString() === now.toDateString(),
    };
  });

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="rounded-2xl p-4 border border-white/20" style={{
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
    }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/90 text-sm font-medium">
          {now.getMonth() + 1}月 {now.toLocaleDateString('zh-CN', { day: 'numeric' })}日
        </span>
        <span className="text-white/60 text-xs">
          六月初四
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-white/70 mb-1">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
        {days.map((d, i) => (
          <div
            key={i}
            className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
              d.isToday
                ? 'bg-[#007AFF] text-white font-semibold'
                : d.isCurrentMonth
                ? 'text-white/80 hover:bg-white/10'
                : 'text-white/30'
            }`}
          >
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClockWidget() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  return (
    <div className="rounded-2xl p-4 border border-white/20" style={{
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
    }}>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          {/* Clock face */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30" />
          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = 50 + 40 * Math.cos(rad);
            const y = 50 + 40 * Math.sin(rad);
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/80"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              />
            );
          })}
          {/* Hour hand */}
          <div
            className="absolute left-1/2 top-1/2 origin-bottom bg-white/90 rounded-full"
            style={{
              width: '3px',
              height: '28px',
              marginLeft: '-1.5px',
              marginTop: '-28px',
              transform: `rotate(${hourAngle}deg)`,
              transformOrigin: 'bottom center',
            }}
          />
          {/* Minute hand */}
          <div
            className="absolute left-1/2 top-1/2 origin-bottom bg-white/80 rounded-full"
            style={{
              width: '2px',
              height: '40px',
              marginLeft: '-1px',
              marginTop: '-40px',
              transform: `rotate(${minuteAngle}deg)`,
              transformOrigin: 'bottom center',
            }}
          />
          {/* Second hand */}
          <div
            className="absolute left-1/2 top-1/2 origin-bottom bg-[#FF3B30] rounded-full"
            style={{
              width: '1px',
              height: '44px',
              marginLeft: '-0.5px',
              marginTop: '-44px',
              transform: `rotate(${secondAngle}deg)`,
              transformOrigin: 'bottom center',
            }}
          />
          {/* Center dot */}
          <div className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}

function WeatherWidget() {
  const weatherData = [
    { time: '18时', temp: '34°', icon: '☀️' },
    { time: '19时', temp: '33°', icon: '⛅' },
    { time: '19:15', temp: '32°', icon: '🌤️' },
    { time: '20时', temp: '32°', icon: '🌙' },
    { time: '21时', temp: '31°', icon: '🌙' },
    { time: '22时', temp: '31°', icon: '🌙' },
  ];

  return (
    <div className="rounded-2xl p-4 border border-white/20" style={{
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
    }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-1 text-white/90 text-sm">
            <span>新建区</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
            </svg>
          </div>
          <div className="text-4xl font-light text-white mt-1">35°</div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <span>☁️</span>
            <span>多云</span>
          </div>
          <div className="text-white/60 text-xs mt-1">
            最高36° 最低30°
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        {weatherData.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-white/60">{item.time}</span>
            <span className="text-lg">{item.icon}</span>
            <span className="text-[11px] text-white/80">{item.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenTimeWidget() {
  const apps = [
    { name: '信息', time: '4时53分', color: '#34C759', icon: '💬' },
    { name: '照片', time: '1时16分', color: '#FF9500', icon: '🖼️' },
  ];

  return (
    <div className="rounded-2xl p-4 border border-white/20" style={{
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
    }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/90 text-sm font-medium">9时15分</span>
        <span className="text-white/60 text-xs">使用时间</span>
      </div>
      <div className="space-y-2">
        {apps.map((app, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-lg">
              {app.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-white/90 text-xs">{app.name}</span>
                <span className="text-white/60 text-xs">{app.time}</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${60 - i * 20}%`, background: app.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NotificationCenter({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute top-7 right-4 w-96 max-h-[calc(100vh-60px)] rounded-2xl border border-white/30 overflow-hidden z-50"
      style={{
        background: 'rgba(40, 40, 40, 0.65)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h3 className="text-white/90 text-sm font-semibold">通知中心</h3>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={14} color="white" />
        </button>
      </div>

      {/* Notifications */}
      <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">
                  {notif.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 text-sm font-medium truncate">{notif.title}</span>
                    <span className="text-white/40 text-[10px] shrink-0 ml-2">{notif.time}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-1 line-clamp-2">{notif.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Widgets */}
      <div className="p-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <CalendarWidget />
          <ClockWidget />
        </div>
        <WeatherWidget />
        <ScreenTimeWidget />
      </div>
    </motion.div>
  );
}
