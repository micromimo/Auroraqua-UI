export const forumCategories = ['全部', '设计', '开发', '讨论', '资源'];

export const defaultPosts = [
  {
    id: 1,
    title: '《真愛の百合は赤く染まる》本庄真奈美的角色塑造太神了',
    category: '讨论',
    author: 'micromimo',
    content: '刚通完《真愛の百合は赤く染まる》，本庄真奈美这个角色真的让人印象深刻。从一开始的冷静克制到最后彻底崩坏的过程，每一步都踩得很准。特别是她面对自己感情时的矛盾心理——明明已经意识到这份感情是不被允许的，却还是无法抑制地想要靠近对方。这种挣扎写得太过细腻了。\n\n个人觉得本庄线的高潮部分（图书馆那场戏）是全作最精彩的一段，台词和演出配合得天衣无缝。最后那个收尾虽然不算圆满，但正是这种不完美才更让人唏嘘。有没有同好来聊聊对本庄这个人物的理解？',
    replies: 56,
    views: 1840,
    time: '3小时前',
    likes: 234,
    isLiked: false,
    comments: [
      { id: 1, author: '百合好き', content: '本庄那句「私はもう戻れない」直接给我整破防了 😭 整个角色弧光太完整了', time: '2小时前' },
      { id: 2, author: 'Chino', content: '图书馆那段的演出确实封神，bgm一起眼泪直接下来了', time: '1小时前' },
      { id: 3, author: 'sakura', content: '最绝的是她的自白那段，CV的演绎真的绝了，那种压抑又失控的感觉拿捏得刚刚好', time: '45分钟前' },
    ]
  },
  {
    id: 2,
    title: '夜羊社作品入坑指南——从哪部开始补比较好？',
    category: '资源',
    author: 'AnimeFan',
    content: '久仰夜羊社大名，之前一直没找到入坑的机会。听说风格比较独特，想问问各位大佬：\n\n1. 入坑推荐从哪一部开始？\n2. 有没有什么雷区需要注意？\n3. 整体风格偏向是什么样的？\n\n补完了回来反馈！',
    replies: 89,
    views: 3200,
    time: '6小时前',
    likes: 156,
    isLiked: false,
    comments: [
      { id: 1, author: '百合推し', content: '建议从《été》开始，最能代表夜羊社的水准，然后再补《NarKarma&A》。注意剧情比较慢热，要有耐心', time: '5小时前' },
      { id: 2, author: 'micromimo', content: '夜羊社的画风辨识度极高，每一帧都可以当壁纸。剧情偏细腻慢热，不适合快进看', time: '4小时前' },
      { id: 3, author: '新参者', content: '从op和ed开始迷上的，音乐品味太棒了', time: '3小时前' },
      { id: 4, author: 'Chino', content: '一定要开BD观看，网络版画质损失很多', time: '2小时前' },
    ]
  },
  {
    id: 3,
    title: 'Asahi Linux 在 Apple Silicon 上的表现越来越好了',
    category: '讨论',
    author: 'LinuxFan',
    content: '最近把 Asahi Linux 装到了我的 M2 Air 上，体验了一段时间，感觉进步真的很大。\n\n**硬件支持方面：**\n- WiFi 和 蓝牙已经基本无压力\n- 触控板和键盘手感接近原生\n- 续航虽然不如 macOS，但日常用 4-5 小时没问题\n\n**注意事项：**\n- 安装过程需要一定的 Linux 操作基础\n- 部分硬件（比如 SD 卡槽）暂时不支持\n- 适合折腾党和好奇心强的人\n\n总体来说，作为 Apple Silicon 上的 Linux 发行版，Asahi 已经达到了可用级别，未来可期。',
    replies: 47,
    views: 1560,
    time: '1天前',
    likes: 98,
    isLiked: false,
    comments: [
      { id: 1, author: 'Rustacean', content: 'Linux on Apple Silicon 是大势所趋，Asahi 团队功不可没', time: '20小时前' },
      { id: 2, author: 'micromimo', content: '有试过在上面跑 Rust 项目吗？编译速度怎么样', time: '18小时前' },
      { id: 3, author: 'OpenSourceLover', content: '希望早日看到 Wayland 完美支持', time: '12小时前' },
    ]
  },
  {
    id: 4,
    title: '微信到底有多难用？让我来吐槽一下',
    category: '讨论',
    author: '吐槽帝',
    content: '真的忍不了了，来吐槽一下微信这个逆天软件：\n\n- **文件管理灾难**：你永远找不到你之前存的某个文件，微信会默默地把它「清理」掉，不告诉你一声\n- **图片压缩地狱**：原图？不存在的，发出去自动给你压到糊成一团\n- **多端不同步**：手机删了电脑还能看到，电脑删了手机也删了——取决于腾讯的心情\n- **内存占用怪兽**：一个聊天软件占你几个 G 的内存，不知道的还以为你在跑虚拟机\n- **接口封得死死的**：你想做点个性化？抱歉，连个 hook 都 hook 不到\n\n作为一个工具，微信是真的反人类。但没办法，周围人都在用，你不得不用 😅\n\n大家还有什么要补充的？',
    replies: 203,
    views: 8900,
    time: '2天前',
    likes: 892,
    isLiked: false,
    comments: [
      { id: 1, author: 'micromimo', content: '「文件过期无法查看」这个设计堪称21世纪最伟大的「 feature 」💀', time: '1天前' },
      { id: 2, author: 'Chino', content: '最逆天的是 PC 微信聊天记录不能云同步，换电脑等于失忆', time: '1天前' },
      { id: 3, author: 'TechTired', content: '微信 == 中国特色的「基础设施性垃圾软件」', time: '20小时前' },
      { id: 4, author: '忍无可忍', content: '昨天刚好遇到一个事：PC 微信发的文件，手机微信打不开，提示「文件类型不支持」，最后不得不发邮件给自己…', time: '16小时前' },
      { id: 5, author: '过来人', content: '不知道大家有没有发现，微信保存到「我的电脑」的文件，如果手机端清理了缓存，电脑端也可能看不到了', time: '12小时前' },
    ]
  },
  {
    id: 5,
    title: 'Rust 接入 SwiftUI 的几种实现方式讨论',
    category: '开发',
    author: 'Rustacean',
    content: '最近想把一些核心逻辑用 Rust 重写，然后在 SwiftUI 里调用，调研了一下目前主流的几种方案：\n\n**方案一：UniFFI（Mozilla）**\n- 自动生成 Swift/Kotlin 绑定\n- 适合 FFI 比较重的场景\n- 编译产物稍大\n\n**方案二：FFI + C ABI**\n- 最传统也最稳定的方式\n- 手动写 bridging header\n- 性能最好，但繁琐\n\n**方案三：SwiftRustBridge（社区项目）**\n- 更 Swift 友好的抽象层\n- 还在早期，API 可能变动\n\n**方案四：通过 WASM + WebView**\n- 开发体验最好，性能最差\n\n目前倾向方案一或二，有没有踩过坑的大佬分享一下经验？特别是在内存管理和错误处理方面有什么要注意的？',
    replies: 34,
    views: 980,
    time: '3天前',
    likes: 67,
    isLiked: false,
    comments: [
      { id: 1, author: 'micromimo', content: '推荐 UniFFI，我实际用过，比纯 FFI 省心很多，尤其是复杂数据结构的情况', time: '2天前' },
      { id: 2, author: 'SwiftDev', content: '如果是比较轻量的场景，直接用 C FFI 也够了，UniFFI 的编译时间有点长', time: '2天前' },
      { id: 3, author: 'iOS工程师', content: '请问有没有 Swift Package Manager 集成方面的教程？', time: '1天前' },
    ]
  },
  {
    id: 6,
    title: '分享一些我私藏的高质量百合作品',
    category: '资源',
    author: '百合推し',
    content: '来分享一波我心目中 Tier 0 级别的百合作品，涵盖漫画、动画和小说：\n\n**🎬 动画**\n- 《やがて君になる》—— 细腻的心理描写，角色成长线极佳\n- 《citrus》—— 关系的张力拉满，作画精良\n- 《百合是我的工作》—— 轻百合轻松治愈\n- 《终将成为你》同作者的短篇集也推荐\n\n**📚 漫画**\n- 《私の百合はお仕事です！》—— 喜剧与百合的完美结合\n- 《やがて君になる》漫画版—— 细节比动画更丰富\n- 《あの娘のeyeにハートる》—— 短篇，甜度满分\n\n**📖 小说**\n- 《マリア様がみてる》系列—— 经典中的经典\n- 《奇異な家族》—— 氛围感极强\n\n有同好的话欢迎推荐你们私藏的！',
    replies: 127,
    views: 4520,
    time: '4天前',
    likes: 456,
    isLiked: false,
    comments: [
      { id: 1, author: 'micromimo', content: 'やがて君になる 是真的神作，配乐和画面都是顶级', time: '3天前' },
      { id: 2, author: 'Chino', content: 'citrus 后期的剧情有点崩，但是前中期是真的好看', time: '3天前' },
      { id: 3, author: '新入坑', content: '马克了！请问 anime 从哪部入比较好？', time: '2天前' },
      { id: 4, author: '百合推し', content: '新人建议从《やがて君になる》入手，节奏舒缓不劝退', time: '1天前' },
    ]
  },
  {
    id: 7,
    title: '分享我的 iTerm2 配置方案',
    category: '资源',
    author: 'micromimo',
    content: '分享我的 iTerm2 配色和字体配置，用了很久了，越看越喜欢：\n\n**配色方案**\n- 背景色：暗夜紫 `#260033`\n- 字体色：裸粉 `#DA9FA1`\n- 搜索/选中：睦头小黄瓜绿 `#D7FB91`\n- 光标：薰衣草紫 `#E9C6F0`\n- 行指示器：雾紫 `#F1CBFA`\n\n**字体设置**\n- 字体：Monaco 17\n- 非 ASCII：SF Mono Semibold 17\n\n整体走一个低饱和紫粉路线，长时间盯代码眼睛也不累，粉色系看起来心情好 🩷',
    replies: 42,
    views: 1280,
    time: '1天前',
    likes: 189,
    isLiked: false,
    comments: [
      { id: 1, author: 'Chino', content: '这个配色好清爽！求导出文件', time: '20小时前' },
      { id: 2, author: 'Rustacean', content: '裸粉 + 暗夜紫，这组合太懂了，已抄', time: '18小时前' },
      { id: 3, author: 'VimUser', content: '请问用 Vim 的时候光标颜色会冲突吗？', time: '14小时前' },
      { id: 4, author: 'micromimo', content: '@VimUser 我用的 Neovim，没有冲突，不过建议在 init.lua 里也把 cursor_color 改一下', time: '10小时前' },
    ]
  },
];

export const defaultNewPost = { title: '', content: '', category: '设计' };
