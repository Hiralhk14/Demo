export const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7ff, #eef2ff, #e0e7ff)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#1e293b", // dark text instead of white
  },

  card: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  },

  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#1e293b",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    marginTop: "6px",
  },

  label: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "500",
    display: "block",
  },

  btnPrimary: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #818cf8, #6366f1)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
  },

  btnSmall: (color) => ({
    padding: "6px 14px",
    borderRadius: "8px",
    border: "none",
    background: color,
    color: "#fff",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
  }),

  badge: (status) => {
    const colors = {
      active: "#22c55e",
      pending: "#f59e0b",
      blocked: "#ef4444",
    };
    return {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: "700",
      background: colors[status] + "15",
      color: colors[status],
      border: `1px solid ${colors[status]}40`,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    };
  },

  error: {
    background: "#fee2e2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "12px",
  },  

  success: {
    background: "#dcfce7",
    border: "1px solid #bbf7d0",
    color: "#166534",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "12px",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 32px",
    background: "rgba(255,255,255,0.6)",
    borderBottom: "1px solid #e2e8f0",
    backdropFilter: "blur(8px)",
  },

  table: { width: "100%", borderCollapse: "collapse" },

  th: {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    borderBottom: "1px solid #e2e8f0",
  },

  td: {
    padding: "14px 16px",
    fontSize: "14px",
    borderBottom: "1px solid #f1f5f9",
    verticalAlign: "middle",
    color: "#334155",
  },
};