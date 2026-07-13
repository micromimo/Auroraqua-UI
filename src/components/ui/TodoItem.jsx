export default function TodoItem({ 
  todo, 
  onToggle, 
  onEdit, 
  onDelete 
}) {
  const priorityColors = {
    high: 'text-red-500',
    medium: 'text-amber-500',
    low: 'text-green-500'
  };

  const priorityLabels = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${todo.completed ? 'bg-green-500/10' : 'bg-white/20'}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 rounded border-white/30 bg-white/20 text-pink-500 focus:ring-pink-500/50 cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <div className={`text-sm ${todo.completed ? 'line-through text-muted' : 'text-heading'}`}>
          {todo.text}
        </div>
        <div className={`text-[10px] ${priorityColors[todo.priority]}`}>
          {priorityLabels[todo.priority]}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onEdit(todo)}
          className="p-1.5 rounded-lg hover:bg-white/30 text-muted hover:text-pink-600 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
        <button 
          onClick={() => onDelete(todo.id)}
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
  );
}