import { useState } from 'react';
import { Plus, MoreHorizontal, ChevronRight } from 'lucide-react';

const feeds = [
  { id: 1, name: 'Discover', icon: '🔵', followed: false },
  { id: 2, name: 'Following', icon: '🔵', followed: false },
  { id: 3, name: 'Video', icon: '🔵', followed: false },
  { id: 4, name: 'Rust Language', icon: '🔴', followed: false },
  { id: 5, name: 'ブルアカ！【Blue Archive】', icon: '🔵', followed: false },
  { id: 6, name: 'Blue Archive', icon: '🔵', followed: false },
  { id: 7, name: 'Arknights', icon: '🔵', followed: false },
  { id: 8, name: 'Arknights Media', icon: '🔵', followed: false },
  { id: 9, name: 'Arknights Album(アークナイツ)', icon: '🔵', followed: false },
  { id: 10, name: 'Arknights Endfield Posts', icon: '🔵', followed: false },
  { id: 11, name: 'アークナイツ/Arknights R18', icon: '🔵', followed: false },
  { id: 12, name: 'macOS', icon: '🔵', followed: false },
];

const trends = [
  { rank: 1, tag: 'Cruel Jaws', posts: '12.5K' },
  { rank: 2, tag: 'Nintendo', posts: '10.2K' },
  { rank: 3, tag: 'Love Island', posts: '8.7K' },
  { rank: 4, tag: "Ryan O'Hearn", posts: '6.3K' },
  { rank: 5, tag: 'Royals', posts: '5.1K' },
];

function SocialRightPanel() {
  const [followedFeeds, setFollowedFeeds] = useState([]);

  const toggleFollowFeed = (feedId) => {
    setFollowedFeeds(prev => 
      prev.includes(feedId) 
        ? prev.filter(id => id !== feedId)
        : [...prev, feedId]
    );
  };

  return (
    <aside className="w-80 flex flex-col gap-4 shrink-0">
      <div className="liquid-glass rounded-2xl p-4 flex flex-col shadow-sm shadow-slate-300/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">动态源</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600">+ 更多動態源</button>
        </div>

        <div className="space-y-2 flex-1 overflow-auto">
          {feeds.map((feed) => (
            <div 
              key={feed.id} 
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span className="text-lg">{feed.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-slate-700 truncate">{feed.name}</span>
              </div>
              <button 
                onClick={() => toggleFollowFeed(feed.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  followedFeeds.includes(feed.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/30 text-slate-500 hover:bg-white/50'
                }`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-4 flex flex-col shadow-sm shadow-slate-300/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">流行趨勢</h3>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 text-slate-400 hover:text-slate-600 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 flex-1 overflow-auto">
          {trends.map((trend) => (
            <div 
              key={trend.rank}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-400/30 to-purple-400/30 flex items-center justify-center text-xs font-bold text-slate-500">
                {trend.rank}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-slate-700 truncate">{trend.tag}</span>
                <div className="text-xs text-slate-400">{trend.posts} 贴文</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-4 shadow-sm shadow-slate-300/20">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
          <span>意見回饋</span>
          <span>·</span>
          <span>隱私</span>
          <span>·</span>
          <span>條款</span>
          <span>·</span>
          <span>幫助</span>
        </div>
      </div>
    </aside>
  );
}

export default SocialRightPanel;