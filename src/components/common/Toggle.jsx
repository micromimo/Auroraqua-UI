export default function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-9 h-5 rounded-full transition-all relative border border-white/50"
      style={{
        background: checked
          ? 'linear-gradient(135deg, rgba(255, 211, 219, 0.85), rgba(255, 211, 219, 0.65))'
          : 'rgba(255, 255, 255, 0.25)',
        boxShadow: checked 
          ? '0 2px 8px rgba(255, 211, 219, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.4)' 
          : 'inset 0 1px 3px rgba(0,0,0,0.08)'
      }}
    >
      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-md transition-all ${
        checked ? 'left-[18px]' : 'left-0.5'
      }`} />
    </button>
  )
}