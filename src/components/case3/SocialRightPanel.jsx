import { useState } from 'react';
import { Plus, MoreHorizontal, ChevronRight } from 'lucide-react';

const feeds = [
  { id: 1, name: 'Yuri Manga', icon: '🔵', followed: false },
  { id: 2, name: 'Arknights Endfield', icon: '🔵', followed: false },
  { id: 3, name: 'NSFW Games', icon: '🔵', followed: false },
  { id: 4, name: 'Rust Language', icon: '🔴', followed: false },
  { id: 5, name: 'Blue Archive', icon: '🔵', followed: false },
  { id: 6, name: 'Arknights', icon: '🔵', followed: false },
  { id: 7, name: 'Lolicon', icon: '🟣', followed: false },
  { id: 8, name: 'アークナイツ/Arknights R18', icon: '🔵', followed: false },
  { id: 9, name: 'MacOS', icon: '🔵', followed: false },
];

const trends = [
  { rank: 1, tag: 'ご注文はうさぎですか', posts: '12.5K' },
  { rank: 2, tag: '齐奥塞斯库被处决', posts: '10.2K' },
  { rank: 3, tag: 'GTA6不提供实体光碟', posts: '8.7K' },
  { rank: 4, tag: "MacOS27", posts: '6.3K' },
  { rank: 5, tag: 'Nintendo', posts: '5.1K' },
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
    <aside className="w-full h-full min-h-0 flex flex-col gap-4 overflow-y-auto p-2">
      <div className="liquid-glass rounded-2xl p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-heading">Dynamic Sources</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600">+ more source</button>
        </div>

        <div className="space-y-2">
          {feeds.map((feed) => (
            <div 
              key={feed.id} 
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span className="text-lg">{feed.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-heading truncate">{feed.name}</span>
              </div>
              <button 
                onClick={() => toggleFollowFeed(feed.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  followedFeeds.includes(feed.id)
                    ? 'bg-blue-500 text-[#FAFAFA]'
                    : 'bg-white/30 text-muted hover:bg-white/50'
                }`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-heading">Trending</h3>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 text-muted hover:text-body transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {trends.map((trend) => (
            <div 
              key={trend.rank}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-400/30 to-purple-400/30 flex items-center justify-center text-xs font-bold text-muted">
                {trend.rank}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-heading truncate">{trend.tag}</span>
                <div className="text-xs text-muted">{trend.posts} 贴文</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
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