export default function StatPill({ label, value, icon, color }) {
  return (
    <div className="glass-dark rounded-xl px-3 py-1.5 flex items-center gap-2">
      {icon}
      <span className="text-[10px] text-muted uppercase tracking-wide">{label}</span>
      <span className={`text-sm font-semibold ${color || 'text-heading'}`}>{value}</span>
    </div>
  )
}