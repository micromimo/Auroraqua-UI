import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManagementSubpage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const tabs = [
    { id: 'orders', label: '订单管理' },
    { id: 'users', label: '用户管理' },
    { id: 'products', label: '产品管理' },
    { id: 'analytics', label: '数据分析' },
  ];

  const products = [
    { id: 1, name: '产品A', category: '电子产品', price: 299, status: 'active' },
    { id: 2, name: '产品B', category: '服装', price: 199, status: 'active' },
    { id: 3, name: '产品C', category: '食品', price: 99, status: 'inactive' },
    { id: 4, name: '产品D', category: '电子产品', price: 499, status: 'active' },
    { id: 5, name: '产品E', category: '家居', price: 399, status: 'active' },
  ];

  const users = [
    { id: 1, name: 'Manami', email: 'manami@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Chino', email: 'chino@example.com', role: 'user', status: 'active' },
    { id: 3, name: 'Sarah', email: 'sarah@example.com', role: 'user', status: 'inactive' },
    { id: 4, name: 'James', email: 'james@example.com', role: 'user', status: 'active' },
    { id: 5, name: 'Emily', email: 'emily@example.com', role: 'editor', status: 'active' },
  ];

  const orders = [
    { id: 1, orderNo: 'ORD-2024-001', customer: 'Manami', amount: 299, status: 'completed' },
    { id: 2, orderNo: 'ORD-2024-002', customer: 'Chino', amount: 199, status: 'pending' },
    { id: 3, orderNo: 'ORD-2024-003', customer: 'Sarah', amount: 499, status: 'processing' },
    { id: 4, orderNo: 'ORD-2024-004', customer: 'James', amount: 99, status: 'completed' },
    { id: 5, orderNo: 'ORD-2024-005', customer: 'Emily', amount: 399, status: 'pending' },
  ];

  const analytics = [
    { id: 1, metric: '总销售额', value: '¥128,456', change: '+12.5%' },
    { id: 2, metric: '订单数量', value: '1,234', change: '+8.3%' },
    { id: 3, metric: '活跃用户', value: '8,234', change: '+6.7%' },
    { id: 4, metric: '转化率', value: '6.7%', change: '+2.1%' },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    const defaultForm = activeTab === 'products' 
      ? { name: '', category: '', price: '', status: 'active' }
      : activeTab === 'users'
      ? { name: '', email: '', role: 'user', status: 'active' }
      : { orderNo: '', customer: '', amount: '', status: 'pending' };
    setFormData(defaultForm);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id, dataType) => {
    if (dataType === 'products') setProducts(prev => prev.filter(item => item.id !== id));
    if (dataType === 'users') setUsers(prev => prev.filter(item => item.id !== id));
    if (dataType === 'orders') setOrders(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = () => {
    setShowModal(false);
  };

  const [productsState, setProducts] = useState(products);
  const [usersState, setUsers] = useState(users);
  const [ordersState, setOrders] = useState(orders);

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <div className="flex-1 overflow-auto space-y-2">
            {productsState.map((item) => (
              <div key={item.id} className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
                </div>
                <div className="text-sm text-slate-600">{item.category}</div>
                <div className="text-sm font-mono text-slate-700">¥{item.price}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-white/40 hover:bg-white/60 transition-colors text-slate-600">
                    编辑
                  </button>
                  <button onClick={() => handleDelete(item.id, 'products')} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-600">
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'users':
        return (
          <div className="flex-1 overflow-auto space-y-2">
            {usersState.map((item) => (
              <div key={item.id} className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
                </div>
                <div className="text-sm text-slate-600">{item.email}</div>
                <div className="text-sm text-slate-600">{item.role}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-white/40 hover:bg-white/60 transition-colors text-slate-600">
                    编辑
                  </button>
                  <button onClick={() => handleDelete(item.id, 'users')} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-600">
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'orders':
        return (
          <div className="flex-1 overflow-auto space-y-2">
            {ordersState.map((item) => (
              <div key={item.id} className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === 'completed' ? 'bg-green-100 text-green-600' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {item.status === 'completed' ? '已完成' : item.status === 'pending' ? '待处理' : '处理中'}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{item.orderNo}</span>
                </div>
                <div className="text-sm text-slate-600">{item.customer}</div>
                <div className="text-sm font-mono text-slate-700">¥{item.amount}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-white/40 hover:bg-white/60 transition-colors text-slate-600">
                    查看
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'analytics':
        return (
          <div className="grid grid-cols-2 gap-4">
            {analytics.map((item) => (
              <div key={item.id} className="liquid-glass rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-2">{item.metric}</div>
                <div className="text-2xl font-bold text-slate-700">{item.value}</div>
                <div className={`text-xs mt-2 ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const renderHeaders = () => {
    switch (activeTab) {
      case 'products':
        return ['名称', '分类', '价格', '操作'];
      case 'users':
        return ['名称', '邮箱', '角色', '操作'];
      case 'orders':
        return ['订单号', '客户', '金额', '操作'];
      default:
        return [];
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">数据管理</h2>
        {activeTab !== 'analytics' && (
          <button onClick={handleAdd} className="glass-button hover:text-pink-700 flex items-center gap-2">
            <span>+</span>
            <span>添加</span>
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
              activeTab === tab.id
                ? 'text-pink-700'
                : 'bg-white/30 text-slate-600 hover:bg-white/50'
            }`}
            style={activeTab === tab.id ? {
              background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
              boxShadow: '0 0 20px rgba(244, 114, 182, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            } : {}}
          >
            {activeTab === tab.id && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 liquid-glass rounded-2xl p-6 overflow-hidden flex flex-col">
        {activeTab !== 'analytics' && (
          <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-white/20">
            {renderHeaders().map((header) => (
              <div key={header} className="font-semibold text-sm text-slate-600">{header}</div>
            ))}
          </div>
        )}
        {renderContent()}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 modal-overlay z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="modal-panel p-6 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="modal-title mb-5">{editingItem ? '编辑项目' : '添加项目'}</h3>
            <div className="space-y-4">
              {activeTab === 'products' && (
                <>
                  <div>
                    <label className="modal-label mb-1.5 block">名称</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入名称"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">分类</label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入分类"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">价格</label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || '' })}
                      className="modal-input w-full"
                      placeholder="输入价格"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">状态</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="modal-input w-full"
                    >
                      <option value="active">活跃</option>
                      <option value="inactive">停用</option>
                    </select>
                  </div>
                </>
              )}
              {activeTab === 'users' && (
                <>
                  <div>
                    <label className="modal-label mb-1.5 block">名称</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入名称"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">邮箱</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入邮箱"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">角色</label>
                    <select
                      value={formData.role || 'user'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="modal-input w-full"
                    >
                      <option value="admin">管理员</option>
                      <option value="editor">编辑</option>
                      <option value="user">用户</option>
                    </select>
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">状态</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="modal-input w-full"
                    >
                      <option value="active">活跃</option>
                      <option value="inactive">停用</option>
                    </select>
                  </div>
                </>
              )}
              {activeTab === 'orders' && (
                <>
                  <div>
                    <label className="modal-label mb-1.5 block">订单号</label>
                    <input
                      type="text"
                      value={formData.orderNo || ''}
                      onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入订单号"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">客户</label>
                    <input
                      type="text"
                      value={formData.customer || ''}
                      onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入客户名称"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">金额</label>
                    <input
                      type="number"
                      value={formData.amount || ''}
                      onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || '' })}
                      className="modal-input w-full"
                      placeholder="输入金额"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">状态</label>
                    <select
                      value={formData.status || 'pending'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="modal-input w-full"
                    >
                      <option value="pending">待处理</option>
                      <option value="processing">处理中</option>
                      <option value="completed">已完成</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-3 mt-7">
              <button onClick={() => setShowModal(false)} className="flex-1 modal-action-button-secondary">
                取消
              </button>
              <button onClick={handleSave} className="flex-1 modal-action-button">
                保存
              </button>
            </div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}