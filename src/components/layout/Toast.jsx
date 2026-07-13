export default function Toast({ toast, onClose }) {
  if (!toast) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 toast">
      <div className={`glass rounded-xl px-5 py-3 flex items-center gap-3 shadow-lg ${
        toast.type === 'success' ? 'border-green-400/50' : 
        toast.type === 'error' ? 'border-red-400/50' : 
        toast.type === 'warning' ? 'border-yellow-400/50' :
        'border-white/50'
      }`}>
        <span className={`w-2 h-2 rounded-full ${
          toast.type === 'success' ? 'bg-green-500' : 
          toast.type === 'error' ? 'bg-red-500' : 
          toast.type === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`} />
        <span className="text-sm text-heading">{toast.message}</span>
      </div>
    </div>
  )
}