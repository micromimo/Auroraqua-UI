import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardSubpage() {
  const stats = [
    { label: '总访问量', value: '128,456', change: '+12.5%', color: 'pink' },
    { label: '活跃用户', value: '8,234', change: '+8.3%', color: 'purple' },
    { label: '转化率', value: '6.4%', change: '-1.3%', color: 'blue' },
    { label: '平均时长', value: '4m 32s', change: '+15.2%', color: 'green' },
  ];

  const recentActivities = [
    { time: '2分钟前', action: '用户注册', user: 'Manami' },
    { time: '5分钟前', action: '完成订单', user: 'Chino' },
    { time: '8分钟前', action: '发布评论', user: 'Sarah' },
    { time: '12分钟前', action: '登录系统', user: 'James' },
    { time: '15分钟前', action: '上传文件', user: 'Emily' },
  ];

  const pieData = [
    { label: '新用户数', value: 35, color: '#ec4899' },
    { label: '新增处理数据条目', value: 45, color: '#8b5cf6' },
    { label: '得出结果数', value: 20, color: '#f59e0b' },
  ];

  const tableData = [
    { id: 1, name: '产品A', category: '电子产品', sales: '¥29,900', growth: '+12.5%' },
    { id: 2, name: '产品B', category: '服装', sales: '¥19,900', growth: '+8.3%' },
    { id: 3, name: '产品C', category: '食品', sales: '¥9,900', growth: '-2.1%' },
    { id: 4, name: '产品D', category: '电子产品', sales: '¥49,900', growth: '+15.2%' },
    { id: 5, name: '产品E', category: '家居', sales: '¥39,900', growth: '+6.7%' },
  ];

  const chartData = [
    { month: 'Jan', newUsers: 25, processed: 120, results: 45 },
    { month: 'Feb', newUsers: 32, processed: 145, results: 58 },
    { month: 'Mar', newUsers: 28, processed: 130, results: 52 },
    { month: 'Apr', newUsers: 45, processed: 180, results: 72 },
    { month: 'May', newUsers: 38, processed: 155, results: 62 },
    { month: 'Jun', newUsers: 52, processed: 210, results: 84 },
    { month: 'Jul', newUsers: 68, processed: 245, results: 98 },
    { month: 'Aug', newUsers: 55, processed: 220, results: 88 },
    { month: 'Sep', newUsers: 48, processed: 195, results: 78 },
    { month: 'Oct', newUsers: 58, processed: 230, results: 92 },
  ];

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('case3_todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: '完成产品设计稿', completed: true, priority: 'high' },
      { id: 2, text: '代码审查', completed: false, priority: 'high' },
      { id: 3, text: '更新文档', completed: false, priority: 'medium' },
      { id: 4, text: '部署测试环境', completed: false, priority: 'medium' },
      { id: 5, text: '准备周会演示', completed: false, priority: 'low' },
    ];
  });

  const [selectedPieIndex, setSelectedPieIndex] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState('medium');

  useEffect(() => {
    localStorage.setItem('case3_todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const addTodo = () => {
    if (!newTodoText.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: newTodoText.trim(),
      completed: false,
      priority: newTodoPriority,
    };
    setTodos(prev => [...prev, newTodo]);
    setNewTodoText('');
    setNewTodoPriority('medium');
    setShowAddModal(false);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setNewTodoText(todo.text);
    setNewTodoPriority(todo.priority);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    if (!newTodoText.trim() || !editingTodo) return;
    setTodos(prev => prev.map(todo => 
      todo.id === editingTodo.id 
        ? { ...todo, text: newTodoText.trim(), priority: newTodoPriority }
        : todo
    ));
    setEditingTodo(null);
    setNewTodoText('');
    setNewTodoPriority('medium');
    setShowEditModal(false);
  };

  const calculatePiePaths = () => {
    let currentAngle = -90;
    return pieData.map((item) => {
      const angle = (item.value / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const x1 = 50 + 40 * Math.cos(startRad);
      const y1 = 50 + 40 * Math.sin(startRad);
      const x2 = 50 + 40 * Math.cos(endRad);
      const y2 = 50 + 40 * Math.sin(endRad);
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const centerAngle = startAngle + angle / 2;
      const centerRad = (centerAngle * Math.PI) / 180;
      
      return {
        ...item,
        path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
        centerX: 50 + 40 * Math.cos(centerRad),
        centerY: 50 + 40 * Math.sin(centerRad),
        centerAngle
      };
    });
  };

  const maxChartValue = Math.max(...chartData.flatMap(d => [d.newUsers, d.processed, d.results]));
  const [tooltip, setTooltip] = useState(null);
  const [tooltipTimeout, setTooltipTimeout] = useState(null);

  const createSmoothPath = (data, key, maxValue) => {
    const points = data.map((d, i) => ({
      x: 40 + (i / 9) * 340,
      y: 200 - (d[key] / maxValue) * 160
    }));

    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      path += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
    }
    
    path += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
    return path;
  };

  const createAreaPath = (data, key, maxValue) => {
    const linePath = createSmoothPath(data, key, maxValue);
    if (!linePath) return '';
    
    const lastX = 40 + (9 / 9) * 340;
    return `${linePath} L ${lastX} 200 L 40 200 Z`;
  };

  const handleMouseEnter = (data, index, event) => {
    if (tooltipTimeout) clearTimeout(tooltipTimeout);
    
    const rect = event.target.closest('svg').getBoundingClientRect();
    const x = 40 + (index / 9) * 340;
    const y = 200 - (data.newUsers / maxChartValue) * 160;
    
    setTooltip({
      data,
      x: rect.left + x,
      y: rect.top + y,
      month: data.month
    });
  };

  const handleMouseLeave = () => {
    setTooltipTimeout(setTimeout(() => {
      setTooltip(null);
    }, 200));
  };

  const ChartLine = ({ data, keyName, color, gradientId }) => (
    <>
      <path
        d={createAreaPath(data, keyName, maxChartValue)}
        fill={`url(#${gradientId})`}
        opacity="0.3"
      />
      <path
        d={createSmoothPath(data, keyName, maxChartValue)}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((d, i) => {
        const x = 40 + (i / 9) * 340;
        const y = 200 - (d[keyName] / maxChartValue) * 160;
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r="4"
              fill="white"
              stroke={color}
              strokeWidth="2"
              className="opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
              onMouseEnter={(e) => handleMouseEnter(d, i, e)}
              onMouseLeave={handleMouseLeave}
            />
            <circle
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className="opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
              onMouseEnter={(e) => handleMouseEnter(d, i, e)}
              onMouseLeave={handleMouseLeave}
            />
          </g>
        );
      })}
    </>
  );

  return (
    <div className="h-full flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="liquid-glass rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              <div className={`w-2 h-2 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
            <div className={`text-xs flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              <span>{stat.change.startsWith('+') ? '↑' : '↓'}</span>
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 liquid-glass rounded-2xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-700">数据趋势</h3>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-xs text-slate-500">新用户数</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-xs text-slate-500">处理数据</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-xs text-slate-500">得出结果</span>
              </div>
            </div>
          </div>
          <div className="h-56 md:h-64 relative">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {[0, 25, 50, 75, 100].map((y, i) => (
                <line key={i} x1="40" y1={200 - (y / 100) * 160} x2="380" y2={200 - (y / 100) * 160} 
                      stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4" />
              ))}
              {chartData.map((d, i) => (
                <text key={i} x={40 + (i / 9) * 340} y={195} textAnchor="middle" className="text-[10px] fill-slate-400">
                  {d.month}
                </text>
              ))}
              
              <ChartLine data={chartData} keyName="newUsers" color="#ec4899" gradientId="gradient1" />
              <ChartLine data={chartData} keyName="processed" color="#8b5cf6" gradientId="gradient2" />
              <ChartLine data={chartData} keyName="results" color="#f59e0b" gradientId="gradient3" />
              
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            
            {tooltip && (
              <div 
                className="fixed liquid-glass rounded-xl p-3 text-xs z-50 pointer-events-none shadow-lg"
                style={{ 
                  left: tooltip.x + 10, 
                  top: tooltip.y - 60,
                  minWidth: '120px'
                }}
              >
                <div className="font-bold text-slate-700 mb-2">{tooltip.month}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                    <span className="text-slate-600">新用户数: <span className="font-medium">{tooltip.data.newUsers}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-slate-600">处理数据: <span className="font-medium">{tooltip.data.processed}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-slate-600">得出结果: <span className="font-medium">{tooltip.data.results}</span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-6 overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-slate-700 mb-4">数据占比</h3>
          <div className="flex-1 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40">
              {calculatePiePaths().map((item, i) => {
                const isSelected = selectedPieIndex === i;
                const centerRad = (item.centerAngle * Math.PI) / 180;
                const offsetX = isSelected ? 3 * Math.cos(centerRad) : 0;
                const offsetY = isSelected ? 3 * Math.sin(centerRad) : 0;
                
                return (
                  <motion.path
                    key={i}
                    d={item.path}
                    fill={item.color}
                    opacity={isSelected ? 1 : 0.8}
                    className="cursor-pointer"
                    initial={{ opacity: 0.8 }}
                    animate={{ 
                      transform: isSelected ? `translate(${offsetX}px, ${offsetY}px)` : 'translate(0, 0)',
                      opacity: isSelected ? 1 : 0.8
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 25,
                      duration: 0.3
                    }}
                    onClick={() => setSelectedPieIndex(isSelected ? null : i)}
                    onMouseEnter={() => !selectedPieIndex && setSelectedPieIndex(i)}
                    onMouseLeave={() => selectedPieIndex === i && setSelectedPieIndex(null)}
                    style={{
                      filter: isSelected ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none'
                    }}
                  />
                );
              })}
              <circle cx="50" cy="50" r="20" fill="rgba(255,255,255,0.8)" />
              <text x="50" y="48" textAnchor="middle" className="text-[8px] fill-slate-600 font-bold">100%</text>
              <text x="50" y="56" textAnchor="middle" className="text-[6px] fill-slate-400">总计</text>
            </svg>
          </div>
          <div className="space-y-2 mt-3">
            {pieData.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-600 flex-1 truncate">{item.label}</span>
                <span className="text-xs font-bold text-slate-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 liquid-glass rounded-2xl p-6 overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-slate-700 mb-4">销售数据</h3>
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-4 gap-4 mb-3 pb-3 border-b border-white/20">
              <div className="font-semibold text-sm text-slate-600">产品名称</div>
              <div className="font-semibold text-sm text-slate-600">分类</div>
              <div className="font-semibold text-sm text-slate-600">销售额</div>
              <div className="font-semibold text-sm text-slate-600">增长率</div>
            </div>
            <div className="space-y-2">
              {tableData.map((item) => (
                <div key={item.id} className="grid grid-cols-4 gap-4 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors cursor-pointer">
                  <div className="text-sm font-medium text-slate-700">{item.name}</div>
                  <div className="text-sm text-slate-600">{item.category}</div>
                  <div className="text-sm font-mono text-slate-700">{item.sales}</div>
                  <div className={`text-sm ${item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {item.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-6 overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-slate-700 mb-4">代办清单</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="glass-button text-sm text-pink-700 w-full hover:text-pink-800 mb-4"
          >
            + 添加任务
          </button>
          <div className="flex-1 space-y-3 overflow-auto">
            {todos.map((todo) => (
              <div key={todo.id} className={`flex items-center gap-3 p-3 rounded-xl ${todo.completed ? 'bg-green-500/10' : 'bg-white/20'}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 rounded border-white/30 bg-white/20 text-pink-500 focus:ring-pink-500/50 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm ${todo.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {todo.text}
                  </div>
                  <div className={`text-[10px] ${
                    todo.priority === 'high' ? 'text-red-500' :
                    todo.priority === 'medium' ? 'text-amber-500' : 'text-green-500'
                  }`}>
                    {todo.priority === 'high' ? '高优先级' : todo.priority === 'medium' ? '中优先级' : '低优先级'}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => openEditModal(todo)}
                    className="p-1.5 rounded-lg hover:bg-white/30 text-slate-500 hover:text-pink-600 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showAddModal && (
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
                <h3 className="modal-title mb-5">添加任务</h3>
                <div className="space-y-4">
                  <div>
                    <label className="modal-label mb-1.5 block">任务内容</label>
                    <input
                      type="text"
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                      className="modal-input w-full"
                      placeholder="输入任务内容"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">优先级</label>
                    <select
                      value={newTodoPriority}
                      onChange={(e) => setNewTodoPriority(e.target.value)}
                      className="modal-input w-full"
                    >
                      <option value="high">高优先级</option>
                      <option value="medium">中优先级</option>
                      <option value="low">低优先级</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-7">
                  <button 
                    onClick={() => { setShowAddModal(false); setNewTodoText(''); }} 
                    className="flex-1 modal-action-button-secondary"
                  >
                    取消
                  </button>
                  <button onClick={addTodo} className="flex-1 modal-action-button">
                    添加
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEditModal && (
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
                <h3 className="modal-title mb-5">编辑任务</h3>
                <div className="space-y-4">
                  <div>
                    <label className="modal-label mb-1.5 block">任务内容</label>
                    <input
                      type="text"
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      className="modal-input w-full"
                      placeholder="输入任务内容"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">优先级</label>
                    <select
                      value={newTodoPriority}
                      onChange={(e) => setNewTodoPriority(e.target.value)}
                      className="modal-input w-full"
                    >
                      <option value="high">高优先级</option>
                      <option value="medium">中优先级</option>
                      <option value="low">低优先级</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-7">
                  <button 
                    onClick={() => { setShowEditModal(false); setEditingTodo(null); }} 
                    className="flex-1 modal-action-button-secondary"
                  >
                    取消
                  </button>
                  <button onClick={saveEdit} className="flex-1 modal-action-button">
                    保存
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="liquid-glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-700 mb-4">最近活动</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {recentActivities.map((activity, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-pink-500 mt-2.5 animate-pulse" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-700 truncate">{activity.action}</div>
                <div className="text-xs text-slate-500 mt-1">{activity.user} · {activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}