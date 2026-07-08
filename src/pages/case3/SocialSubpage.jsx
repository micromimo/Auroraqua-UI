import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SocialSidebar from '../../components/case3/SocialSidebar';
import SocialHeader from '../../components/case3/SocialHeader';
import SocialPost from '../../components/case3/SocialPost';
import SocialRightPanel from '../../components/case3/SocialRightPanel';
import SocialProfilePage from '../../components/case3/SocialProfilePage';
import SocialSettingsPage from '../../components/case3/SocialSettingsPage';
import { motion, AnimatePresence } from 'framer-motion';

const posts = [
  {
    id: 1,
    user: '',
    handle: 'moorina.bsky.social',
    avatar: 'https://picsum.photos/id/64/100/100',
    time: '1 分鐘前',
    content: '#香风智乃 菜の花畑チノちゃん',
    image: 'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:vg4lorilmjn5ztscb5fh7y2n/bafkreids5lh455qsxgmzgdeodq227q5kxe2nkbmreklougpueykx5u7tz4',
    likes: 1,
    comments: 0,
    shares: 0,
    isLiked: false,
    isFollowed: false,
  },
  {
    id: 2,
    user: 'micromimo',
    handle: 'micromimo.bsky.social',
    avatar: 'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:vg4lorilmjn5ztscb5fh7y2n/bafkreiek3mwh7kpqivzsviwnbnw6ewzqgsva4767rx2dbups24s3bf523a',
    time: '9 分鐘前',
    content: '#Arknights #アークナイツ #明日方舟 #迷迭香 #ロスモンティス #Rosmontis\n\n(Not Original Source)',
    image: 'https://i.17173cdn.com/2fhnvk/YWxqaGBf/cms3/biSaKbbrtExficE.png!a-3-854x.jpg',
    likes: 3,
    comments: 0,
    shares: 0,
    isLiked: false,
    isFollowed: false,
  },
  {
    id: 3,
    user: 'Anime NSFW',
    handle: 'animensfw.bsky.social',
    avatar: 'https://picsum.photos/id/91/100/100',
    time: '1 小時前',
    content: '#feet #soles #toes #legs #girl #art #anime\n\nhttps://www.pixiv.net/artworks/146...\n\nsource: www.pixiv.net/artworks/146...',
    image: '',
    likes: 6,
    comments: 1,
    shares: 1,
    isLiked: false,
    isFollowed: false,
  },
  {
    id: 4,
    user: 'goose',
    handle: '@goosesletter.bsky.social',
    avatar: 'https://picsum.photos/id/76/100/100',
    time: '15 天前',
    content: '自由飞翔的感觉真好，蓝天白云下尽情翱翔',
    image: null,
    likes: 12,
    comments: 3,
    shares: 2,
    isLiked: false,
    isFollowed: false,
  },
];

export default function SocialSubpage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('discover');
  const [activeSidebarItem, setActiveSidebarItem] = useState('home');
  const [postsState, setPostsState] = useState(posts);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/profile')) {
      setActiveSidebarItem('profile');
    } else if (path.includes('/settings')) {
      setActiveSidebarItem('settings');
    } else {
      setActiveSidebarItem('home');
    }
  }, [location.pathname]);

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

  const handleFollow = (postId) => {
    setPostsState(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isFollowed: !post.isFollowed,
        };
      }
      return post;
    }));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const renderContent = () => {
    if (location.pathname.includes('/profile')) {
      return <SocialProfilePage onImageClick={handleImageClick} />;
    }
    if (location.pathname.includes('/settings')) {
      return <SocialSettingsPage />;
    }

    return (
      <div className="min-h-full">
        <SocialHeader activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-4 space-y-4">
          <AnimatePresence mode="wait">
            {postsState.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <SocialPost
                  post={post}
                  onLike={handleLike}
                  onFollow={handleFollow}
                  onImageClick={handleImageClick}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex gap-6 overflow-hidden">
      <SocialSidebar activeItem={activeSidebarItem} onItemClick={setActiveSidebarItem} />
      
      <main className="flex-1 overflow-auto px-4 py-4">
        {renderContent()}
      </main>

      {!location.pathname.includes('/profile') && !location.pathname.includes('/settings') && (
        <SocialRightPanel />
      )}

      <AnimatePresence>
        {showImageModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[80vh] p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              {selectedImage.startsWith('http') ? (
                <img
                  src={selectedImage}
                  alt="Full size"
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                />
              ) : (
                <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-pink-400/50 to-purple-400/50 flex items-center justify-center text-9xl">
                  {selectedImage}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}