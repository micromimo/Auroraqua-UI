import { useState } from 'react';
import { MessageCircle, Repeat, Heart, Share2, MoreHorizontal, ZoomIn } from 'lucide-react';

function SocialPost({ post, onLike, onFollow, onImageClick }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    setNewComment('');
    setShowComments(false);
  };

  const formatContent = (content) => {
    return content.replace(/#(\w+)/g, '<span class="text-blue-500 font-medium">#$1</span>');
  };

  const maxWidth = 560;
  const maxHeight = 400;

  return (
    <div className="liquid-glass rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
          {post.avatar.startsWith('http') ? (
            <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-semibold">
              {post.avatar}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">{post.user}</span>
            {post.handle && (
              <span className="text-sm text-slate-500">@{post.handle.replace(/^@/, '')}</span>
            )}
            {post.verified && (
              <span className="text-yellow-500 text-xs">✓</span>
            )}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">{post.time}</div>
        </div>

        <button 
          onClick={() => onFollow && onFollow(post.id)}
          className={`ml-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            post.isFollowed 
              ? 'bg-white/30 text-slate-600' 
              : 'bg-gradient-to-r from-pink-400/80 to-purple-400/80 text-white hover:shadow-lg hover:shadow-pink-400/30'
          }`}
        >
          {post.isFollowed ? '已关注' : '+ 关注'}
        </button>

        <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <p 
        className="text-sm text-slate-700 leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
      />

      {post.image && post.image.startsWith('http') && (
        <div 
          className="w-full rounded-xl overflow-hidden mb-4 cursor-pointer group relative"
          onClick={() => onImageClick && onImageClick(post.image)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-400/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
              <ZoomIn className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          {!imageLoaded && (
            <div className="w-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 animate-pulse">
              <div className="aspect-video" />
            </div>
          )}
          <img 
            src={post.image} 
            alt="Post image" 
            className={`w-full h-auto object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
            style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
      )}

      {post.image && !post.image.startsWith('http') && post.image !== '' && (
        <div className="w-full rounded-xl overflow-hidden mb-4">
          <div className="w-full aspect-video bg-gradient-to-br from-pink-400/30 to-purple-400/30 flex items-center justify-center text-6xl">
            {post.image}
          </div>
        </div>
      )}

      <div className="flex items-center gap-8 pt-4 border-t border-white/20">
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 px-3 py-2 rounded-xl transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments}</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-green-500 hover:bg-green-500/10 px-3 py-2 rounded-xl transition-all">
          <Repeat className="w-5 h-5" />
          <span>{post.shares}</span>
        </button>

        <button 
          onClick={() => onLike && onLike(post.id)}
          className={`flex items-center gap-2 text-sm transition-all px-3 py-2 rounded-xl ${
            post.isLiked 
              ? 'text-pink-500 bg-pink-500/10' 
              : 'text-slate-500 hover:text-pink-500 hover:bg-pink-500/10'
          }`}
        >
          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes}</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 px-3 py-2 rounded-xl transition-all">
          <Share2 className="w-5 h-5" />
          <span>分享</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-white/20 space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xs text-white shrink-0">
              M
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                placeholder="写下评论..."
                className="input-glass w-full text-sm"
              />
            </div>
            <button 
              onClick={handleCommentSubmit}
              className="glass-button text-sm px-4 text-blue-500"
            >
              发送
            </button>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
              {post.avatar.startsWith('http') ? (
                <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-xs font-semibold">
                  {post.avatar[0]}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-700">{post.user}</span>
                <span className="text-[10px] text-slate-400">刚刚</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">Great work! 👏</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SocialPost;