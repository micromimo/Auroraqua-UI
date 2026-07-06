export default function SettingRow({ label, children }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-600">{label}</span>
      <div className="flex-1 max-w-[160px]">{children}</div>
    </div>
  )
}