import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

export default function VideoSubpage() {
  const [likes, setLikes] = useState(1250);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(125000);
  const [showSubscribeToast, setShowSubscribeToast] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [sortBy, setSortBy] = useState('hot');
  const [showFavoriteMenu, setShowFavoriteMenu] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteFolder, setFavoriteFolder] = useState(null);

  const uploader = {
    name: 'すりぃ',
    avatar: 'S',
    verified: true,
    subscribers: subscriberCount,
  };

  const videoInfo = {
    title: 'めめしぃ / すりぃ feat.可不 ：この曲は、めめしぃというキャラクターをテーマにしたオリジナル曲',
    views: '12.5K',
    duration: '4:32',
    uploadDate: '2天前',
    category: '音乐',
    tags: ['VOCALOID', '可不', '原创'],
    description: '■ ストリーミング\nSpotify: https://open.spotify.com/track/xxxx\nApple Music: https://music.apple.com/jp/album/xxxx\n\n■ サポート\nこのチャンネルをサポートしていただけると大変嬉しいです！\n\n■ 使用楽器\n- ギター\n- ベース\n- ドラム\n- シンセサイザー\n\n■ コラボレーター\nイラスト: 〇〇〇\nミックス: △△△\n\nよかったらチャンネル登録と高評価をお願いします！',
  };

  const favoriteFolders = [
    { id: 1, name: '默认收藏夹', icon: '📁' },
    { id: 2, name: '音乐收藏', icon: '🎵' },
    { id: 3, name: '学习资料', icon: '📚' },
    { id: 4, name: '想看列表', icon: '📌' },
  ];

  const videos = [
    { id: 1, title: 'めめしぃ / すりぃ feat.可不', duration: '4:32', views: '12.5K', thumbnail: '🎵' },
    { id: 2, title: 'Rust进阶教程', duration: '5:23', views: '8.3K', thumbnail: '🎨' },
    { id: 3, title: 'WWDC 2026', duration: '12:45', views: '6.7K', thumbnail: '🤯' },
    { id: 4, title: 'MacOS使用手册', duration: '8:12', views: '4.2K', thumbnail: '🍎' },
    { id: 5, title: '组件库使用指南', duration: '15:30', views: '3.8K', thumbnail: '📚' },
    { id: 6, title: '动画效果详解', duration: '9:28', views: '2.9K', thumbnail: '✨' },
  ];

  const comments = [
    { id: 1, user: 'Chino', content: 'Amazing video, learned a lot!', time: '2 hours ago', likes: 12, timestamp: Date.now() - 2 * 3600 * 1000 },
    { id: 2, user: 'Sarah', content: 'Looking forward to more tutorials', time: '5 hours ago', likes: 8, timestamp: Date.now() - 5 * 3600 * 1000 },
    { id: 3, user: 'James', content: 'Thanks for sharing!', time: '1 day ago', likes: 5, timestamp: Date.now() - 24 * 3600 * 1000 },
  ];

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
    navigator.clipboard.writeText(window.location.href);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setCommentText('');
    }
  };

  const handleSubscribe = () => {
    if (!isSubscribed) {
      setIsSubscribed(true);
      setSubscriberCount(prev => prev + 1);
      setShowSubscribeToast(true);
      setTimeout(() => {
        setShowSubscribeToast(false);
      }, 3000);
    } else {
      setIsSubscribed(false);
      setSubscriberCount(prev => prev - 1);
    }
  };

  const handleFavorite = (folder) => {
    setIsFavorited(true);
    setFavoriteFolder(folder);
    setShowFavoriteMenu(false);
  };

  const toggleFavoriteMenu = () => {
    setShowFavoriteMenu(!showFavoriteMenu);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'hot') {
      return b.likes - a.likes;
    } else {
      return b.timestamp - a.timestamp;
    }
  });

  const formatSubscribers = (count) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + '万';
    }
    return count.toLocaleString();
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="liquid-glass rounded-2xl p-2 overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/mkP5Myd-YZU"
              title="めめしぃ / すりぃ feat.可不"
              className="w-full h-full aspect-video rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <motion.div
            className="liquid-glass rounded-2xl p-4 space-y-4"
            initial={{ height: 'auto' }}
            animate={{ height: 'auto' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div>
              <h3 className="font-bold text-slate-700 mb-2">{videoInfo.title}</h3>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>{videoInfo.views} 观看</span>
                <span>{videoInfo.duration}</span>
                <span>上传于 {videoInfo.uploadDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-sm text-white font-semibold">
                  {uploader.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-slate-700">{uploader.name}</span>
                    {uploader.verified && (
                      <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{formatSubscribers(uploader.subscribers)} 订阅者</div>
                </div>
              </div>
              <button
                onClick={handleSubscribe}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isSubscribed
                    ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    : 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl'
                }`}
              >
                <svg className={`w-4 h-4 transition-transform duration-300 ${isSubscribed ? '' : 'hover:scale-110'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isSubscribed ? (
                    <path d="M18 6 6 18M6 6l12 12"/>
                  ) : (
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  )}
                </svg>
                <span>{isSubscribed ? '已订阅' : '订阅'}</span>
              </button>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleLike}
                className={`glass-button text-sm flex items-center gap-2 transition-all duration-300 ${isLiked ? 'text-pink-600 bg-pink-500/10' : ''}`}
              >
                <svg className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-current scale-110' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className={`transition-all duration-300 ${isLiked ? 'font-bold scale-105' : ''}`}>{likes.toLocaleString()}</span>
              </button>
              <button className="glass-button text-sm flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </button>
              <button onClick={handleShare} className="glass-button text-sm flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
              <button 
                onClick={toggleFavoriteMenu}
                className={`glass-button text-sm flex items-center justify-center transition-all duration-300 ${isFavorited ? 'text-pink-600 bg-pink-500/10' : ''}`}
              >
                <Star className={`w-5 h-5 transition-all duration-300 ${isFavorited ? 'fill-current scale-110' : ''}`} />
              </button>
            </div>

            <div className="border-t border-white/60 pt-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-pink-100/50 text-pink-600 text-xs font-medium">{videoInfo.category}</span>
                {videoInfo.tags.map((tag, index) => (
                  <span key={index} className="text-xs text-pink-600">#{tag}</span>
                ))}
              </div>
              <motion.div
                className="overflow-hidden"
                initial={false}
                animate={{ height: showDescription ? 'auto' : '68px' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {videoInfo.description}
                </div>
              </motion.div>
              {videoInfo.description.split('\n').length > 3 && (
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="mt-2 text-xs text-pink-600 hover:text-pink-700 transition-colors flex items-center gap-1 group"
                >
                  <span>{showDescription ? '收起详细信息' : '展开详细信息'}</span>
                  <svg className={`w-3 h-3 transition-transform duration-300 ${showDescription ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>

          <div className="flex-1 liquid-glass rounded-2xl p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-700">评论 ({comments.length})</h3>
              <div className="flex bg-white/30 rounded-lg p-1">
                <button
                  onClick={() => setSortBy('hot')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                    sortBy === 'hot'
                      ? 'bg-white text-pink-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  按热度排序
                </button>
                <button
                  onClick={() => setSortBy('time')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                    sortBy === 'time'
                      ? 'bg-white text-pink-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  按时间排序
                </button>
              </div>
            </div>
            <div className="mb-4">
              <form onSubmit={handleCommentSubmit} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xs text-white shrink-0">
                  M
                </div>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="写下你的评论..."
                  className="flex-1 input-glass text-sm"
                />
                <button type="submit" className="glass-button text-sm px-4">
                  发送
                </button>
              </form>
            </div>
            <div className="space-y-4">
              {sortedComments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-xs text-white">
                    {comment.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700">{comment.user}</span>
                      <span className="text-xs text-slate-400">{comment.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{comment.content}</p>
                    <button className="text-xs text-pink-500 hover:text-pink-700 mt-2">
                      👍 {comment.likes}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 overflow-auto">
          {videos.map((video) => (
            <div key={video.id} className="flex gap-3 p-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
              <div className="w-28 h-16 rounded-lg bg-gradient-to-r from-pink-400/80 to-purple-400/80 flex items-center justify-center text-2xl shrink-0">
                {video.thumbnail}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-slate-700 truncate">{video.title}</h4>
                <div className="text-xs text-slate-500 mt-1">{video.views} 观看</div>
                <div className="text-xs text-slate-400">{video.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            className="fixed inset-0 modal-overlay z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="modal-panel p-6 w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="modal-title mb-5">分享视频</h3>
              <div className="modal-input p-3 mb-4">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="w-full bg-transparent text-sm text-slate-600 font-mono break-all outline-none"
                />
              </div>
              <p className="text-sm text-slate-600 mb-5 text-center">链接已复制到剪贴板！</p>
              <button 
                onClick={() => setShowShareModal(false)} 
                className="w-full modal-action-button"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
        {showFavoriteMenu && (
          <motion.div 
            className="fixed inset-0 modal-overlay z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="modal-panel p-6 w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="modal-title mb-5">选择收藏夹</h3>
              <div className="space-y-2">
                {favoriteFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => handleFavorite(folder)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/30 transition-colors text-sm"
                  >
                    <span className="text-xl">{folder.icon}</span>
                    <span className="text-slate-700">{folder.name}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowFavoriteMenu(false)} 
                className="w-full mt-5 modal-action-button-secondary"
              >
                取消
              </button>
            </motion.div>
          </motion.div>
        )}
        {showSubscribeToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="liquid-glass rounded-full px-6 py-3 shadow-xl flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm text-slate-700 font-medium">订阅成功！</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}