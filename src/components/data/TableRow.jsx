export default function TableRow({ children, className = '', hover = true }) {
  return (
    <div 
      className={`grid grid-cols-4 gap-4 p-3 rounded-xl bg-white/20 transition-colors cursor-pointer ${
        hover ? 'hover:bg-white/30' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function TableHeader({ children }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-3 pb-3 border-b border-white/20">
      {children}
    </div>
  );
}