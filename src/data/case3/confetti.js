import confetti from 'canvas-confetti';

const presets = {
  basic: {
    id: 'basic',
    label: 'Basic',
    category: '基础',
    description: '默认参数，经典五彩纸屑效果',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 120,
        spread: 70,
        startVelocity: 45,
        ...extra,
      });
    },
  },
  burst: {
    id: 'burst',
    label: 'Burst',
    category: '基础',
    description: '高密度一次性爆发',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 300,
        spread: 100,
        startVelocity: 60,
        ...extra,
      });
    },
  },
  pop: {
    id: 'pop',
    label: 'Pop',
    category: '基础',
    description: '小巧、快速的小爆炸',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 60,
        spread: 50,
        startVelocity: 35,
        gravity: 1.2,
        decay: 0.92,
        ...extra,
      });
    },
  },
  gentle: {
    id: 'gentle',
    label: 'Gentle',
    category: '基础',
    description: '柔和、缓慢飘落',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 80,
        angle: 90,
        spread: 60,
        startVelocity: 25,
        gravity: 0.6,
        decay: 0.94,
        ...extra,
      });
    },
  },
  circles: {
    id: 'circles',
    label: 'Circles',
    category: '形状',
    description: '纯圆形粒子',
    fire: (instance, extra = {}) => {
      instance({
        shapes: ['circle'],
        particleCount: 100,
        spread: 80,
        startVelocity: 45,
        ...extra,
      });
    },
  },
  stars: {
    id: 'stars',
    label: 'Stars',
    category: '形状',
    description: '星形粒子',
    fire: (instance, extra = {}) => {
      instance({
        shapes: ['star'],
        particleCount: 100,
        spread: 70,
        startVelocity: 45,
        ...extra,
      });
    },
  },
  squares: {
    id: 'squares',
    label: 'Squares',
    category: '形状',
    description: '方形粒子',
    fire: (instance, extra = {}) => {
      instance({
        shapes: ['square'],
        particleCount: 100,
        spread: 70,
        startVelocity: 45,
        ...extra,
      });
    },
  },
  mixed: {
    id: 'mixed',
    label: 'Mixed',
    category: '形状',
    description: '圆形、方形、星形混合',
    fire: (instance, extra = {}) => {
      instance({
        shapes: ['circle', 'square', 'star'],
        particleCount: 120,
        spread: 70,
        startVelocity: 45,
        ...extra,
      });
    },
  },
  center: {
    id: 'center',
    label: 'Center',
    category: '方向',
    description: '从页面中心向四周扩散',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 150,
        angle: 90,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        startVelocity: 35,
        ...extra,
      });
    },
  },
  left: {
    id: 'left',
    label: 'Left',
    category: '方向',
    description: '从左侧边缘发射',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        startVelocity: 55,
        ...extra,
      });
    },
  },
  right: {
    id: 'right',
    label: 'Right',
    category: '方向',
    description: '从右侧边缘发射',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        startVelocity: 55,
        ...extra,
      });
    },
  },
  directional: {
    id: 'directional',
    label: 'Directional',
    category: '方向',
    description: '定向发射带漂移',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 100,
        angle: 90,
        spread: 30,
        origin: { x: 0.5, y: 0.7 },
        drift: 0.4,
        startVelocity: 55,
        ...extra,
      });
    },
  },
  gravity: {
    id: 'gravity',
    label: 'Gravity',
    category: '物理',
    description: '强重力加速下落',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 100,
        spread: 70,
        startVelocity: 45,
        gravity: 2,
        ...extra,
      });
    },
  },
  drift: {
    id: 'drift',
    label: 'Drift',
    category: '物理',
    description: '明显侧向漂移',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 120,
        angle: 90,
        spread: 45,
        drift: -0.6,
        startVelocity: 40,
        ...extra,
      });
    },
  },
  flat: {
    id: 'flat',
    label: 'Flat',
    category: '物理',
    description: '关闭倾斜与摆动',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 120,
        spread: 70,
        startVelocity: 45,
        flat: true,
        ...extra,
      });
    },
  },
  slow: {
    id: 'slow',
    label: 'Slow',
    category: '物理',
    description: '慢动作漂浮效果',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 100,
        spread: 60,
        startVelocity: 20,
        gravity: 0.3,
        decay: 0.96,
        ticks: 320,
        ...extra,
      });
    },
  },
  continuous: {
    id: 'continuous',
    label: 'Continuous',
    category: '高级',
    description: '持续发射 2 秒',
    fire: (instance) => {
      const duration = 2000;
      const end = Date.now() + duration;

      (function frame() {
        instance({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        instance({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    },
  },
  fireworks: {
    id: 'fireworks',
    label: 'Fireworks',
    category: '高级',
    description: '连续多方向烟花式发射',
    fire: (instance) => {
      const duration = 2000;
      const end = Date.now() + duration;

      (function frame() {
        const left = Math.random();
        const right = Math.random();

        instance({
          particleCount: 8,
          angle: 60,
          spread: 55,
          origin: { x: left },
        });
        instance({
          particleCount: 8,
          angle: 120,
          spread: 55,
          origin: { x: right },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    },
  },
  snow: {
    id: 'snow',
    label: 'Snow',
    category: '高级',
    description: '顶部缓慢飘落',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 120,
        angle: 90,
        spread: 40,
        origin: { x: 0.5, y: -0.1 },
        startVelocity: 15,
        gravity: 0.4,
        decay: 0.96,
        ticks: 400,
        ...extra,
      });
    },
  },
  realistic: {
    id: 'realistic',
    label: 'Realistic',
    category: '高级',
    description: '多层次、带颜色的真实纸屑',
    fire: (instance, extra = {}) => {
      const defaults = {
        origin: { x: 0.5, y: 0.5 },
        zIndex: 9999,
        particleCount: 100,
        spread: 70,
        startVelocity: 45,
        gravity: 1,
        colors: [
          '#ec4899',
          '#8b5cf6',
          '#f59e0b',
          '#22c55e',
          '#3b82f6',
          '#f97316',
          '#e879f9',
          '#14b8a6',
        ],
        ...extra,
      };

      instance({
        ...defaults,
        shapes: ['circle'],
      });

      setTimeout(() => {
        instance({
          ...defaults,
          particleCount: 60,
          spread: 55,
          drift: -0.5,
        });
      }, 150);
    },
  },
  'custom-shape': {
    id: 'custom-shape',
    label: 'Custom Shape',
    category: '自定义',
    description: '使用 SVG Path 自定义三角形',
    fire: (instance, extra = {}) => {
      const triangle = instance.shapeFromPath({
        path: 'M0 10 L5 0 L10 10z',
      });
      instance({
        shapes: [triangle],
        particleCount: 80,
        spread: 70,
        startVelocity: 45,
        ...extra,
      });
    },
  },
  emoji: {
    id: 'emoji',
    label: 'Emoji',
    category: '自定义',
    description: '使用 emoji 作为粒子',
    fire: (instance, extra = {}) => {
      const scalar = 2;
      const pineapple = instance.shapeFromText({ text: '🍍', scalar });
      instance({
        shapes: [pineapple],
        particleCount: 40,
        spread: 70,
        scalar,
        startVelocity: 45,
        ...extra,
      });
    },
  },
  text: {
    id: 'text',
    label: 'Text',
    category: '自定义',
    description: '使用文字作为粒子',
    fire: (instance, extra = {}) => {
      const scalar = 2;
      const heart = instance.shapeFromText({ text: '❤️', scalar, color: '#ec4899' });
      instance({
        shapes: [heart],
        particleCount: 40,
        spread: 70,
        scalar,
        startVelocity: 45,
        ...extra,
      });
    },
  },
  'custom-colors': {
    id: 'custom-colors',
    label: 'Custom Colors',
    category: '自定义',
    description: '自定义主题配色',
    fire: (instance, extra = {}) => {
      instance({
        particleCount: 150,
        spread: 70,
        startVelocity: 45,
        colors: ['#6366f1', '#a855f7', '#ec4899', '#f43f5e'],
        ...extra,
      });
    },
  },
};

export const categories = [
  { id: 'all', label: '所有' },
  { id: '基础', label: '基础' },
  { id: '形状', label: '形状' },
  { id: '方向', label: '方向' },
  { id: '物理', label: '物理' },
  { id: '高级', label: '高级' },
  { id: '自定义', label: '自定义' },
];

export const confettiPresets = Object.values(presets);

export default presets;
