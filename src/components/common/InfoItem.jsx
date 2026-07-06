export default function InfoItem({ label, value, highlight }) {
  return (
    <div className="rounded-lg p-2 sidebar-white">
      <div className="text-[10px] text-gray-500 uppercase tracking-wide">{label}</div>
      <div className={`text-sm font-medium ${highlight ? 'text-purple-600' : 'text-gray-700'}`}>{value}</div>
    </div>
  )
}