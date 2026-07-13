export default function StatCard({ label, value, change, icon, color }) {
  const isPositive = change && change.startsWith('+');
  
  return (
    <div className="liquid-glass rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-muted font-medium">{label}</div>
        {icon || <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} />}
      </div>
      <div className="text-2xl font-bold text-heading mb-1">{value}</div>
      {change && (
        <div className={`text-xs flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}