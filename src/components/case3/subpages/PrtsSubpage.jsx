import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Gift, Zap, Users, Star, Bell, BookOpen, Award, Radio, Gamepad2, Trophy, Target, Sparkles } from 'lucide-react';
import DiamondIcon from 'lucide-react/dist/esm/icons/diamond';
import BoneFractureIcon from 'lucide-react/dist/esm/icons/bone-fracture';
import PodcastIcon from 'lucide-react/dist/esm/icons/podcast';
import DroneIcon from 'lucide-react/dist/esm/icons/drone';
import ClockIcon from 'lucide-react/dist/esm/icons/clock';
import BatteryIcon from 'lucide-react/dist/esm/icons/battery';
import { FadeInCard } from '../../ui/animations';
import PillTabBar from '../../ui/PillTabBar';
import PrtsOperatorGrid from './PrtsOperatorGrid';
import ClaimRewardAnimation from './ClaimRewardAnimation';

const operators = [
  { id: 1, name: '水月', class: '特种', rarity: 6, element: '特种', status: 'offline', level: 90, trust: 255, avatar: '🪼' },
  { id: 2, name: '阿米娅', class: '术士', rarity: 6, element: '术', status: 'online', level: 90, trust: 200, avatar: '🎀' },
  { id: 3, name: '凯尔希', class: '医疗', rarity: 6, element: '医疗', status: 'online', level: 90, trust: 255, avatar: '🐱' },
  { id: 4, name: '艾雅法拉', class: '术士', rarity: 6, element: '术', status: 'online', level: 90, trust: 255, avatar: '🐑' },
  { id: 5, name: '巫恋', class: '辅助', rarity: 6, element: '远程', status: 'rest', level: 90, trust: 255, avatar: '👿' },
  { id: 6, name: '史尔特尔', class: '近卫', rarity: 6, element: '近卫', status: 'online', level: 90, trust: 255, avatar: '🔥' },
  { id: 7, name: '塞雷娅', class: '重装', rarity: 6, element: '防御', status: 'offline', level: 90, trust: 255, avatar: '🛡️' },
  { id: 8, name: '迷迭香', class: '狙击', rarity: 6, element: '远程', status: 'rest', level: 90, trust: 255, avatar: '🐱' },
  { id: 9, name: '铃兰', class: '辅助', rarity: 6, element: '远程', status: 'online', level: 90, trust: 255, avatar: '🦁' },
  { id: 10, name: '白面鸮', class: '医疗', rarity: 5, element: '医疗', status: 'rest', level: 80, trust: 180, avatar: '🦉' },
  { id: 11, name: '德克萨斯', class: '先锋', rarity: 5, element: '先锋', status: 'online', level: 80, trust: 200, avatar: '🐺' },
  { id: 12, name: '拉普兰德', class: '近卫', rarity: 5, element: '近卫', status: 'offline', level: 80, trust: 190, avatar: '🐺' },
];

const announcements = [
  { id: 1, title: '「孤星」复刻活动即将开启', time: '2小时前', type: 'event', isNew: true },
  { id: 2, title: '本期「领航者试炼」已更新', time: '6小时前', type: 'battle', isNew: true },
  { id: 3, title: '六星干员「Mon3tr」UP限时寻访', time: '1天前', type: 'gacha', isNew: false },
  { id: 4, title: '制作组通讯第64期', time: '2天前', type: 'maintenance', isNew: false },
];

const initialLoginRewards = [
  { day: 1, reward: '合成玉 x200', claimed: true },
  { day: 2, reward: '龙门币 x5000', claimed: true },
  { day: 3, reward: '招聘许可 x2', claimed: true },
  { day: 4, reward: '技能书 x3', claimed: false, isToday: true },
  { day: 5, reward: '龙门币 x10000', claimed: false },
  { day: 6, reward: '至纯源石 x1', claimed: false },
  { day: 7, reward: '十连寻访凭证', claimed: false },
];

const dailyTasks = [
  { id: 1, title: '完成 3 次战斗', progress: 3, total: 3, reward: 100, completed: true },
  { id: 2, title: '消耗 100 理智', progress: 85, total: 100, reward: 50, completed: false },
  { id: 3, title: '访问好友基建', progress: 1, total: 1, reward: 30, completed: true },
  { id: 4, title: '完成 1 次公开招募', progress: 0, total: 1, reward: 20, completed: false },
  { id: 5, title: '访问好友会客厅', progress: 0, total: 1, reward: 10, completed: false },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'online': return '#00ff88';
    case 'offline': return '#6b7280';
    case 'rest': return '#fbbf24';
    default: return '#6b7280';
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'event': return '#ec4899';
    case 'battle': return '#8b5cf6';
    case 'gacha': return '#f59e0b';
    case 'maintenance': return '#ef4444';
    default: return '#6b7280';
  }
};

function PrtsHeader({ currentTime, formatTime, formatDate }) {
  return (
    <div className="liquid-glass rounded-2xl p-6 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-500/10 to-transparent translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <DiamondIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">PRTS</h1>
            <p className="text-sm text-muted">Priestess is Watching You 👀</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-muted mb-1">今日日期</div>
            <div className="text-sm font-medium text-heading">{formatDate(currentTime)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted mb-1">罗德岛时间</div>
            <div className="text-lg font-mono font-bold text-heading">{formatTime(currentTime)}</div>
          </div>
          <button className="glass-button text-sm flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">通知</span>
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginRewardItem({ reward, index, isClaiming, onClaim, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
        reward.isToday && !reward.claimed
          ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 hover:border-amber-500/50'
          : reward.claimed
          ? 'bg-emerald-500/5 border border-emerald-500/10'
          : 'bg-white/10 hover:bg-white/20'
      }`}
      onClick={onClick}
      whileHover={reward.isToday && !reward.claimed ? { scale: 1.02 } : {}}
      whileTap={reward.isToday && !reward.claimed ? { scale: 0.98 } : {}}
    >
      <motion.div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
          reward.claimed
            ? 'bg-emerald-500/20 text-emerald-600'
            : reward.isToday && !reward.claimed
            ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
            : 'bg-white/20 text-muted'
        }`}
          key={reward.claimed ? 'claimed' : 'unclaimed'}
          animate={!reward.claimed && isClaiming ? { scale: [1, 1.4, 0], rotate: [0, 180, 360] } : {}}
          transition={!reward.claimed && isClaiming ? { duration: 0.6 } : {}}
        >
        {reward.claimed ? <Star className="w-4 h-4" /> : reward.day}
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium ${reward.claimed ? 'text-emerald-600' : 'text-heading'}`}>
          {reward.reward}
        </div>
        <div className="text-[10px] text-muted">
          {reward.claimed ? '已领取' : reward.isToday ? '点击领取' : `第 ${reward.day} 天`}
        </div>
      </div>
      {reward.isToday && !reward.claimed && (
        <Gift className="w-5 h-5 text-amber-500 animate-bounce" />
      )}
    </motion.div>
  );
}

function LoginRewardsPanel({ rewards, isClaiming, onClaim }) {
  return (
    <FadeInCard className="liquid-glass rounded-2xl p-5 flex flex-col" delay={0.3}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-500" />
          <h3 className="text-base font-bold text-heading">签到奖励</h3>
        </div>
        <span className="text-xs text-muted">第 {rewards.findIndex(r => r.isToday && !r.claimed) >= 0 ? rewards.findIndex(r => r.isToday) + 1 : rewards.filter(r => r.claimed).length + 1}/7 天</span>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-auto">
        {rewards.map((reward, index) => (
          <LoginRewardItem
            key={reward.day}
            reward={reward}
            index={index}
            isClaiming={isClaiming && reward.isToday}
            onClaim={onClaim}
            onClick={reward.isToday && !reward.claimed ? onClaim : undefined}
          />
        ))}
      </div>
    </FadeInCard>
  );
}

function DailyTasksPanel({ tasks }) {
  return (
    <FadeInCard className="liquid-glass rounded-2xl p-5 flex flex-col" delay={0.25}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-500" />
          <h3 className="text-base font-bold text-heading">每日任务</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10">
          <Zap className="w-3.5 h-3.5 text-cyan-500" />
          <span className="text-xs font-bold text-cyan-600">
            {tasks.filter(t => t.completed).length * 20}/{tasks.length * 20}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-auto">
        {tasks.map((task, index) => {
          const progressPercent = (task.progress / task.total) * 100;
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.05 }}
              className={`p-3 rounded-xl transition-all ${
                task.completed ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${task.completed ? 'text-emerald-600' : 'text-heading'}`}>
                  {task.title}
                </span>
                <span className="text-xs text-muted flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  +{task.reward}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${task.completed ? 'bg-gradient-to-r from-emerald-500 to-green-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
                />
              </div>
              <div className="text-[10px] text-muted mt-1 text-right">
                {task.progress}/{task.total}
              </div>
            </motion.div>
          );
        })}
      </div>
    </FadeInCard>
  );
}

function AnnouncementsPanel({ announcements }) {
  return (
    <FadeInCard className="liquid-glass rounded-2xl p-5 flex flex-col" delay={0.2}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-cyan-500" />
          <h3 className="text-base font-bold text-heading">官方公告</h3>
        </div>
        <button className="text-xs text-muted hover:text-heading flex items-center gap-1 transition-colors">
          查看全部
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-auto">
        {announcements.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer transition-all"
          >
            <div
              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: getTypeColor(item.type) }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-heading truncate">{item.title}</span>
                {item.isNew && (
                  <span className="px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-600 text-[10px] font-bold">NEW</span>
                )}
              </div>
              <div className="text-xs text-muted mt-0.5">{item.time}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted flex-shrink-0" />
          </motion.div>
        ))}
      </div>
    </FadeInCard>
  );
}

function StatusInfoBar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FadeInCard className="liquid-glass rounded-xl p-4 flex items-center gap-3" delay={0.4}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
          <ClockIcon className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <div className="text-xs text-muted">在线时长</div>
          <div className="text-sm font-bold text-heading">3 小时 28 分</div>
        </div>
      </FadeInCard>

      <FadeInCard className="liquid-glass rounded-xl p-4 flex items-center gap-3" delay={0.45}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
          <BatteryIcon className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <div className="text-xs text-muted">理智值</div>
          <div className="text-sm font-bold text-heading">135 / 135</div>
        </div>
      </FadeInCard>

      <FadeInCard className="liquid-glass rounded-xl p-4 flex items-center gap-3" delay={0.5}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-pink-500" />
        </div>
        <div>
          <div className="text-xs text-muted">当前活动</div>
          <div className="text-sm font-bold text-heading">淬火尘霾</div>
        </div>
      </FadeInCard>
    </div>
  );
}

function QuickActions({ onSwitchTab }) {
  const quickActions = [
    { icon: BoneFractureIcon, label: 'Wiki', color: 'from-red-500 to-rose-600', desc: '泰拉百科', href: 'https://prts.wiki', target: '_blank' },
    { icon: Users, label: '干员列表', color: 'from-blue-500 to-indigo-600', desc: '查看干员', onClick: () => onSwitchTab?.('operators') },
    { icon: PodcastIcon, label: '塞壬唱片', color: 'from-pink-500 to-rose-600', desc: 'MSR', href: 'https://monster-siren.hypergryph.com/', target: '_blank' },
    { icon: Sparkles, label: '星门', color: 'from-amber-500 to-orange-600', desc: '前往塔卫Ⅱ', href: 'https://endfield.hypergryph.com/', target: '_blank' },
    { icon: Gamepad2, label: '集成战略', color: 'from-purple-500 to-violet-600', desc: '黑流树海来咯' },
    { icon: DroneIcon, label: '危机合约', color: 'from-emerald-500 to-teal-600', desc: '合约轮换' },
  ];

  return (
    <FadeInCard className="liquid-glass rounded-2xl p-5" delay={0.15}>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {quickActions.map((item, index) => {
          const Icon = item.icon;
          const btn = (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group flex flex-col items-center justify-center p-4 rounded-xl bg-white/20 hover:bg-white/30 transition-all overflow-hidden cursor-pointer"
              onClick={item.onClick}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-15 transition-opacity`} />
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-2 shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-bold text-heading">{item.label}</div>
              {item.desc && <div className="text-[10px] text-muted">{item.desc}</div>}
            </motion.div>
          );
          return item.href ? (
            <a key={item.label} href={item.href} target={item.target || '_blank'} rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}>
              {btn}
            </a>
          ) : btn;
        })}
      </div>
    </FadeInCard>
  );
}


export default function PrtsSubpage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('home');
  const [loginRewards, setLoginRewards] = useState(initialLoginRewards);
  const [rewardAnim, setRewardAnim] = useState({ active: false, x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).replace('星期', '周');
  };

  const handleClaimReward = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRewardAnim({ active: true, x: rect.left + rect.width / 2, y: rect.top });

    setTimeout(() => {
      setLoginRewards(prev => prev.map(r =>
        r.isToday ? { ...r, claimed: true } : r
      ));
    }, 400);
  }, []);

  const onRewardComplete = useCallback(() => {
    setRewardAnim(prev => ({ ...prev, active: false }));
  }, []);

  return (
    <div className="h-full flex flex-col gap-5">
      <FadeInCard className="relative" delay={0}>
        <PrtsHeader currentTime={currentTime} formatTime={formatTime} formatDate={formatDate} />
      </FadeInCard>

      <FadeInCard className="p-1.5" delay={0.1}>
        <PillTabBar
          tabs={[
            { id: 'home', label: '主页' },
            { id: 'operators', label: '编队' },
            { id: 'store', label: '商店' },
            { id: 'missions', label: '任务' },
            { id: 'social', label: '社交' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </FadeInCard>

      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            <QuickActions onSwitchTab={setActiveTab} />

            <StatusInfoBar />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <AnnouncementsPanel announcements={announcements} />
              <LoginRewardsPanel
                rewards={loginRewards}
                isClaiming={rewardAnim.active}
                onClaim={handleClaimReward}
              />
              <DailyTasksPanel tasks={dailyTasks} />
            </div>
          </motion.div>
        )}

        {activeTab === 'operators' && (
          <motion.div
            key="operators"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <FadeInCard className="liquid-glass rounded-2xl p-6" delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <Users className="w-5 h-5 text-cyan-500" />
                <h3 className="text-lg font-bold text-heading">我的干员</h3>
              </div>
              <PrtsOperatorGrid operators={operators} delay={0.15} />
            </FadeInCard>
          </motion.div>
        )}

        {activeTab === 'missions' && (
          <motion.div
            key="missions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="liquid-glass rounded-2xl p-8 flex items-center justify-center min-h-[400px]"
          >
            <div className="text-center">
              <Target className="w-16 h-16 text-cyan-500/50 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-heading mb-2">任务中心</h3>
              <p className="text-sm text-muted">任务系统即将上线...</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'store' && (
          <motion.div
            key="store"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="liquid-glass rounded-2xl p-8 flex items-center justify-center min-h-[400px]"
          >
            <div className="text-center">
              <Award className="w-16 h-16 text-cyan-500/50 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-heading mb-2">商店</h3>
              <p className="text-sm text-muted">可露希尔大减价功能筹备中...</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'social' && (
          <motion.div
            key="social"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="liquid-glass rounded-2xl p-8 flex items-center justify-center min-h-[400px]"
          >
            <div className="text-center">
              <Radio className="w-16 h-16 text-cyan-500/50 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-heading mb-2">社交中心</h3>
              <p className="text-sm text-muted">社交功能建设中...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 奖励领取动画 */}
      <ClaimRewardAnimation
        active={rewardAnim.active}
        x={rewardAnim.x}
        y={rewardAnim.y}
        onComplete={onRewardComplete}
      />
    </div>
  );
}
