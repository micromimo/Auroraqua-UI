export default function ControlButton({ children, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="glass-btn rounded-lg p-2 flex items-center justify-center text-gray-600 hover:text-gray-900"
    >
      {children}
    </button>
  )
}