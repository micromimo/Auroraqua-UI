export default function TabButton({ 
  children, 
  isActive, 
  onClick, 
  className = '',
  activeClassName = '',
  inactiveClassName = ''
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${className} ${
        isActive
          ? activeClassName || 'text-pink-700'
          : inactiveClassName || 'bg-white/30 text-body hover:bg-white/50'
      }`}
      style={isActive ? {
        background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
        boxShadow: '0 0 20px rgba(244, 114, 182, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
      } : {}}
    >
      {isActive && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}