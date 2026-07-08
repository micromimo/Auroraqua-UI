import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForumSubpage() {
  const categories = ['全部', '设计', '开发', '讨论', '资源'];
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [expandedPost, setExpandedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: '周末露营装备推荐', 
      category: '讨论', 
      author: 'Manami', 
      content: '最近天气越来越暖和了，打算去露营的朋友看过来！我整理了一份新手入门的装备清单，包括帐篷、睡袋、防潮垫这些基础装备，还有一些实用的小物件比如折叠桌椅和户外电源。最重要的是要选轻便易携带的，毕竟徒步的时候不想背太重的东西。大家有什么好的装备推荐吗？',
      replies: 128, 
      views: 2560, 
      time: '2小时前',
      likes: 256,
      isLiked: false,
      comments: [
        { id: 1, author: 'Chino', content: '推荐带个驱蚊液，上次去被咬惨了', time: '1小时前' },
        { id: 2, author: 'Sarah', content: '折叠水壶很实用，不用带笨重的水瓶', time: '30分钟前' },
      ]
    },
    { 
      id: 2, 
      title: '健身小白的一周训练计划', 
      category: '讨论', 
      author: 'Chino', 
      content: '刚开始健身不知道怎么安排计划，特意查了很多资料，分享一下我的一周训练安排。周一练胸和三头，周二练背和二头，周三休息或者做有氧，周四练腿，周五练肩，周末休息或者做些户外运动。每次训练大概一个小时左右，强度适中，不会太累。有没有健身大佬给点建议？',
      replies: 86, 
      views: 1840, 
      time: '5小时前',
      likes: 184,
      isLiked: false,
      comments: [
        { id: 1, author: 'James', content: '新手建议先从自重训练开始', time: '3小时前' },
      ]
    },
    { 
      id: 3, 
      title: '春日赏花好去处', 
      category: '资源', 
      author: 'Sarah', 
      content: '春天到了，正是赏花的好时候。给大家推荐几个我去过的地方，樱花、桃花、油菜花都开得很美。市区公园人比较多，可以去周边的郊野公园，人少景美还能野餐。记得带好相机，拍出来的照片特别好看。最近有计划去赏花的朋友吗？',
      replies: 42, 
      views: 980, 
      time: '1天前',
      likes: 98,
      isLiked: false,
      comments: []
    },
    { 
      id: 4, 
      title: '最近玩的几款游戏推荐', 
      category: '讨论', 
      author: 'James', 
      content: '最近闲暇时间玩了几款不错的游戏，想和大家分享一下。有一款开放世界的冒险游戏，画面精美剧情也很棒，玩了快一周还没通关。还有一款策略类游戏，需要合理规划资源和兵力，很考验脑力。另外还有一款轻松治愈的模拟经营游戏，适合放松的时候玩。大家最近在玩什么游戏？',
      replies: 67, 
      views: 1240, 
      time: '1天前',
      likes: 67,
      isLiked: false,
      comments: [
        { id: 1, author: 'Emily', content: '那个策略游戏听起来很有意思', time: '12小时前' },
        { id: 2, author: 'Manami', content: '模拟经营游戏求推荐', time: '8小时前' },
        { id: 3, author: 'Chino', content: '冒险游戏可以联机吗', time: '5小时前' },
      ]
    },
    { 
      id: 5, 
      title: '居家办公效率提升技巧', 
      category: '讨论', 
      author: 'Emily', 
      content: '在家办公已经一段时间了，总结了一些提升效率的小技巧。首先要有一个专门的工作区域，和生活区分开，这样更容易进入工作状态。然后制定每日计划，把任务分成小块，完成一个就打勾，很有成就感。定时休息也很重要，每隔一小时站起来活动一下，保护眼睛和颈椎。大家有什么好的居家办公经验吗？',
      replies: 35, 
      views: 870, 
      time: '2天前',
      likes: 87,
      isLiked: false,
      comments: []
    },
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '', category: '设计' });
  const [replyInput, setReplyInput] = useState({});
  const [errors, setErrors] = useState({});

  const filteredPosts = selectedCategory === '全部' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const togglePost = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleReply = (postId) => {
    setReplyInput(prev => ({
      ...prev,
      [postId]: (prev[postId] || '')
    }));
  };

  const submitReply = (postId, content) => {
    if (!content.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: post.replies + 1,
          comments: [...post.comments, {
            id: Date.now(),
            author: 'Anonymous',
            content: content.trim(),
            time: '刚刚'
          }]
        };
      }
      return post;
    }));
    
    setReplyInput(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const handleForward = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${post.title}\n${window.location.href}`).then(() => {
        alert('链接已复制到剪贴板');
      });
    }
  };

  const validatePost = () => {
    const newErrors = {};
    if (!newPost.title.trim()) {
      newErrors.title = '请输入标题';
    } else if (newPost.title.length < 5) {
      newErrors.title = '标题至少需要5个字符';
    }
    if (!newPost.content.trim()) {
      newErrors.content = '请输入内容';
    } else if (newPost.content.length < 10) {
      newErrors.content = '内容至少需要10个字符';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostSubmit = () => {
    if (!validatePost()) return;
    
    const post = {
      id: Date.now(),
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      category: newPost.category,
      author: 'Anonymous',
      replies: 0,
      views: 0,
      time: '刚刚',
      likes: 0,
      isLiked: false,
      comments: []
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: '设计' });
    setShowPostModal(false);
    setErrors({});
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">论坛</h2>
        <button 
          onClick={() => setShowPostModal(true)}
          className="glass-button hover:text-pink-700 flex items-center gap-2"
        >
          <span>+</span>
          <span>发帖</span>
        </button>
      </div>

      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
              selectedCategory === category
                ? 'text-pink-700'
                : 'bg-white/30 text-slate-600 hover:bg-white/50'
            }`}
            style={selectedCategory === category ? {
              background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
              boxShadow: '0 0 20px rgba(244, 114, 182, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            } : {}}
          >
            {selectedCategory === category && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 liquid-glass rounded-2xl p-6 overflow-auto">
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className="rounded-xl bg-white/20 transition-all duration-300"
            >
              <div 
                onClick={() => togglePost(post.id)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/30 transition-colors rounded-xl"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-700 hover:text-pink-600 transition-colors flex items-center gap-2">
                    {post.title}
                    <svg 
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedPost === post.id ? 'rotate-180' : ''}`} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span className="px-2 py-0.5 rounded-lg bg-pink-100/50 text-pink-600">{post.category}</span>
                    <span>{post.author}</span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-600">{post.replies} 回复</div>
                  <div className="text-xs text-slate-400">{post.views} 浏览</div>
                </div>
              </div>

              {expandedPost === post.id && (
                <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
                    
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                        className={`flex items-center gap-1.5 text-sm transition-all ${post.isLiked ? 'text-pink-600' : 'text-slate-500 hover:text-pink-600'}`}
                      >
                        <svg className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleReply(post.id); }}
                        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>回复</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleForward(post); }}
                        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-green-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                        <span>转发</span>
                      </button>
                    </div>

                    {(replyInput[post.id] !== undefined) && (
                      <div className="mt-4">
                        <textarea
                          value={replyInput[post.id] || ''}
                          onChange={(e) => setReplyInput(prev => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder="输入回复内容..."
                          className="w-full p-3 bg-white/30 rounded-xl border border-white/40 text-sm text-slate-700 resize-none focus:outline-none focus:border-pink-400/50 transition-all"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setReplyInput(prev => ({ ...prev, [post.id]: undefined })); }}
                            className="modal-action-button-secondary text-sm"
                          >
                            取消
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); submitReply(post.id, replyInput[post.id]); }}
                            className="modal-action-button text-sm"
                          >
                            发送
                          </button>
                        </div>
                      </div>
                    )}

                    {post.comments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/20 space-y-3">
                        <h4 className="text-sm font-medium text-slate-600">回复 ({post.comments.length})</h4>
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-white/10 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-slate-600">{comment.author}</span>
                              <span className="text-xs text-slate-400">{comment.time}</span>
                            </div>
                            <p className="text-sm text-slate-500">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center modal-overlay"
            onClick={() => setShowPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl mx-4 modal-panel p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="modal-title">发布新帖</h3>
                <button onClick={() => setShowPostModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="modal-label mb-1.5 block">标题</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full p-3 bg-white/30 rounded-xl border text-sm text-slate-700 focus:outline-none transition-all ${errors.title ? 'border-red-400/50' : 'border-white/40 focus:border-pink-400/50'}`}
                    placeholder="请输入帖子标题..."
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="modal-label mb-1.5 block">分类</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 bg-white/30 rounded-xl border border-white/40 text-sm text-slate-700 focus:outline-none focus:border-pink-400/50 transition-all"
                  >
                    {categories.filter(c => c !== '全部').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="modal-label mb-1.5 block">内容</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    className={`w-full p-3 bg-white/30 rounded-xl border text-sm text-slate-700 resize-none focus:outline-none transition-all ${errors.content ? 'border-red-400/50' : 'border-white/40 focus:border-pink-400/50'}`}
                    placeholder="请输入帖子内容..."
                    rows={6}
                  />
                  {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowPostModal(false)}
                    className="flex-1 modal-action-button-secondary"
                  >
                    取消
                  </button>
                  <button
                    onClick={handlePostSubmit}
                    className="flex-1 modal-action-button"
                  >
                    发布
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}