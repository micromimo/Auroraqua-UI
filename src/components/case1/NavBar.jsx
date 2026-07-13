export default function NavBar({ onToggle, className, style }) {
  return (
    <div
      className={`sidebar-track ${className || ''}`}
      onClick={onToggle}
      style={style || {}}
    >
      <div className="sidebar-thumb" />
    </div>
  )
}