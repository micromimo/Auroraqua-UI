import { useState } from 'react';
import { MessageCircle, Repeat, Heart, Share2, MoreHorizontal, Edit3, ExternalLink, Calendar, UserPlus, UserCheck, X, ChevronLeft } from 'lucide-react';
import SocialPost from './SocialPost';

const userData = {
  name: 'micromimo',
  handle: '@micromimo.bsky.social',
  avatar: 'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:vg4lorilmjn5ztscb5fh7y2n/bafkreiek3mwh7kpqivzsviwnbnw6ewzqgsva4767rx2dbups24s3bf523a',
  header: '',
  bio: '百合厨 | Rust | NeoLucifer | 赛博仓鼠 | lolicon | 猫猫之友',
  followers: 46,
  following: 46,
  posts: 1,
  joined: '2024年1月',
  badges: ['🍀', '✨', '💫'],
};

const posts = [
  {
    id: 1,
    user: 'micromimo',
    handle: '@micromimo.bsky.social',
    avatar: 'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:vg4lorilmjn5ztscb5fh7y2n/bafkreiek3mwh7kpqivzsviwnbnw6ewzqgsva4767rx2dbups24s3bf523a',
    time: '1 小時前',
    content: '#Arknights #アークナイツ #明日方舟 #迷迭香 #ロスモンティス #Rosmontis\n\n(Not Original Source)',
    image: 'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:6ia2d5o75usadxypphqjne2n/bafkreigeqislufiqiakjag673zun56vfimxh7mgmo54sruqof6gnzq4xii',
    likes: 3,
    comments: 0,
    shares: 0,
    isLiked: false,
    isFollowed: false,
  },
];

function SocialProfilePage({ onImageClick }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [postsState, setPostsState] = useState(posts);

  const handleLike = (postId) => {
    setPostsState(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const tabs = [
    { id: 'posts', label: '贴文', count: userData.posts },
    { id: 'replies', label: '回覆', count: 0 },
    { id: 'likes', label: '喜歡', count: 0 },
  ];

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-30 px-4 pb-2 bg-gradient-to-b from-background via-background/95 to-transparent">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-body">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-heading">{userData.name}</h2>
          <div className="w-10" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="liquid-glass rounded-2xl p-4 sticky top-0 z-30 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden avatar-border">
                  <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-heading">{userData.name}</h3>
                  <p className="text-sm text-muted">{userData.handle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isFollowing
                      ? 'bg-white/30 text-body'
                      : 'text-[#FAFAFA] hover:shadow-lg hover:shadow-pink-400/30'
                  }`}
                  style={!isFollowing ? {
                    background: 'linear-gradient(to right, #ec4899 0%, #FEBEBE 100%)'
                  } : {}}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Followed</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
                <button className="w-9 h-9 rounded-xl bg-white/30 flex items-center justify-center text-body hover:bg-white/50 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-xl bg-white/30 flex items-center justify-center text-body hover:bg-white/50 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="liquid-glass rounded-2xl p-5">
            <p className="text-sm text-body mb-4">{userData.bio}</p>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm text-body">
                <Calendar className="w-4 h-4" />
                <span>加入于 {userData.joined}</span>
              </div>
              {userData.badges.map((badge, index) => (
                <span key={index} className="text-lg">{badge}</span>
              ))}
            </div>

            <div className="flex gap-6">
              <div className="cursor-pointer hover:text-blue-500 transition-colors">
              <span className="font-bold text-heading">{userData.following}</span>
              <span className="text-sm text-muted ml-1">Follow中</span>
            </div>
            <div className="cursor-pointer hover:text-blue-500 transition-colors">
              <span className="font-bold text-heading">{userData.followers}</span>
              <span className="text-sm text-muted ml-1">追隨者</span>
            </div>
            </div>
          </div>

          <div className="liquid-glass rounded-2xl p-1 flex border-b border-white/20">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
                    isActive
                      ? 'text-pink-700'
                      : 'text-muted hover:text-body hover:bg-white/20'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
                    boxShadow: 'rgba(244, 114, 182, 0.3) 0px 0px 20px, rgba(255, 255, 255, 0.6) 0px 1px 0px inset'
                  } : {}}
                >
                  {isActive && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  )}
                  <span>{tab.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-pink-500/30' : 'bg-white/30'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            {postsState.map((post) => (
              <SocialPost
                key={post.id}
                post={post}
                onLike={handleLike}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialProfilePage;