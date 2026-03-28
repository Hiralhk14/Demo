export default function StatsCard({ label, count, icon, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderTop: `3px solid ${color}`,
        borderRadius: "16px",
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <div style={{ fontSize: "24px", marginBottom: "6px" }}>{icon}</div>
      <div style={{ fontSize: "28px", fontWeight: "800", color }}>{count}</div>
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
        {label}
      </div>
    </div>
  );
}