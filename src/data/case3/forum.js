export const forumCategories = ['全部', '设计', '开发', '讨论', '资源'];

export const defaultPosts = [
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
];

export const defaultNewPost = { title: '', content: '', category: '设计' };