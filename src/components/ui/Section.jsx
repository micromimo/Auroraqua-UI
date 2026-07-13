export default function Section({ title, icon, children }) {
  return (
    <div className="glass-dark rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-sm font-semibold text-heading">{title}</h3>
      </div>
      {children}
    </div>
  )
}