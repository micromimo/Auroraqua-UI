export const managementTabs = [
  { id: 'orders', label: '订单管理' },
  { id: 'users', label: '用户管理' },
  { id: 'products', label: '产品管理' },
  { id: 'analytics', label: '数据分析' },
];

export const productsData = [
  { id: 1, name: '产品A', category: '电子产品', price: 299, status: 'active' },
  { id: 2, name: '产品B', category: '服装', price: 199, status: 'active' },
  { id: 3, name: '产品C', category: '食品', price: 99, status: 'inactive' },
  { id: 4, name: '产品D', category: '电子产品', price: 499, status: 'active' },
  { id: 5, name: '产品E', category: '家居', price: 399, status: 'active' },
];

export const usersData = [
  { id: 1, name: 'Manami', email: 'manami@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Chino', email: 'chino@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Sarah', email: 'sarah@example.com', role: 'user', status: 'inactive' },
  { id: 4, name: 'James', email: 'james@example.com', role: 'user', status: 'active' },
  { id: 5, name: 'Emily', email: 'emily@example.com', role: 'editor', status: 'active' },
];

export const ordersData = [
  { id: 1, orderNo: 'ORD-2024-001', customer: 'Manami', amount: 299, status: 'completed' },
  { id: 2, orderNo: 'ORD-2024-002', customer: 'Chino', amount: 199, status: 'pending' },
  { id: 3, orderNo: 'ORD-2024-003', customer: 'Sarah', amount: 499, status: 'processing' },
  { id: 4, orderNo: 'ORD-2024-004', customer: 'James', amount: 99, status: 'completed' },
  { id: 5, orderNo: 'ORD-2024-005', customer: 'Emily', amount: 399, status: 'pending' },
];

export const analyticsData = [
  { id: 1, metric: '总销售额', value: '¥128,456', change: '+12.5%' },
  { id: 2, metric: '订单数量', value: '1,234', change: '+8.3%' },
  { id: 3, metric: '活跃用户', value: '8,234', change: '+6.7%' },
  { id: 4, metric: '转化率', value: '6.7%', change: '+2.1%' },
];

export const defaultFormData = {
  products: { name: '', category: '', price: '', status: 'active' },
  users: { name: '', email: '', role: 'user', status: 'active' },
  orders: { orderNo: '', customer: '', amount: '', status: 'pending' },
};

export const tableHeaders = {
  products: ['名称', '分类', '价格', '操作'],
  users: ['名称', '邮箱', '角色', '操作'],
  orders: ['订单号', '客户', '金额', '操作'],
};