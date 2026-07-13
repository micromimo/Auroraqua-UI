export default function GlassButton({ 
  children, 
  onClick, 
  className = "", 
  disabled = false,
  glow = false 
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`glass-button ${
        disabled ? "text-muted cursor-not-allowed" : ""
      } ${glow ? "liquid-glass-glow" : ""} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}