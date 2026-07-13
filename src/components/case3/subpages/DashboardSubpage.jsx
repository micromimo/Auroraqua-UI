import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dashboardStats, recentActivities, pieData, tableData, chartData, defaultTodos } from '../../../data/case3/dashboard';

export default function DashboardSubpage() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('case3_todos');
    return saved ? JSON.parse(saved) : defaultTodos;
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
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="liquid-glass rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-muted font-medium">{stat.label}</div>
              <div className={`w-2 h-2 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            <div className="text-2xl font-bold text-heading mb-1">{stat.value}</div>
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
            <h3 className="text-lg font-bold text-heading">数据趋势</h3>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C4B5FD' }} />
                <span className="text-xs text-muted">新用户数</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#93C5FD' }} />
                <span className="text-xs text-muted">处理数据</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#86EFAC' }} />
                <span className="text-xs text-muted">得出结果</span>
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
              
              <ChartLine data={chartData} keyName="newUsers" color="#C4B5FD" gradientId="gradient1" />
              <ChartLine data={chartData} keyName="processed" color="#93C5FD" gradientId="gradient2" />
              <ChartLine data={chartData} keyName="results" color="#86EFAC" gradientId="gradient3" />
              
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C4B5FD" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#93C5FD" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#86EFAC" />
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
                <div className="font-bold text-heading mb-2">{tooltip.month}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C4B5FD' }} />
                    <span className="text-body">新用户数: <span className="font-medium">{tooltip.data.newUsers}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#93C5FD' }} />
                    <span className="text-body">处理数据: <span className="font-medium">{tooltip.data.processed}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#86EFAC' }} />
                    <span className="text-body">得出结果: <span className="font-medium">{tooltip.data.results}</span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-6 overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-heading mb-4">数据占比</h3>
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
                <span className="text-xs text-body flex-1 truncate">{item.label}</span>
                <span className="text-xs font-bold text-heading">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 liquid-glass rounded-2xl p-6 overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-heading mb-4">销售数据</h3>
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-4 gap-4 mb-3 pb-3 border-b border-white/20">
              <div className="font-semibold text-sm text-body">产品名称</div>
              <div className="font-semibold text-sm text-body">分类</div>
              <div className="font-semibold text-sm text-body">销售额</div>
              <div className="font-semibold text-sm text-body">增长率</div>
            </div>
            <div className="space-y-2">
              {tableData.map((item) => (
                <div key={item.id} className="grid grid-cols-4 gap-4 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors cursor-pointer">
                  <div className="text-sm font-medium text-heading">{item.name}</div>
                  <div className="text-sm text-body">{item.category}</div>
                  <div className="text-sm font-mono text-heading">{item.sales}</div>
                  <div className={`text-sm ${item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {item.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-6 overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-heading mb-4">代办清单</h3>
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
                  <div className={`text-sm ${todo.completed ? 'line-through text-muted' : 'text-heading'}`}>
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
                    className="p-1.5 rounded-lg hover:bg-white/30 text-muted hover:text-pink-600 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-600 transition-colors"
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
        <h3 className="text-lg font-bold text-heading mb-4">最近活动</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {recentActivities.map((activity, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-pink-500 mt-2.5 animate-pulse" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-heading truncate">{activity.action}</div>
                <div className="text-xs text-muted mt-1">{activity.user} · {activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}