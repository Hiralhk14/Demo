import { useAuth } from "../../context/AuthContext";
import { styles } from "../../styles/styles";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <div style={styles.navbar}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "22px" }}>🏢</span>
        <div>
          <div style={{ fontWeight: "800", fontSize: "16px" }}>EMS Portal</div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>
            {currentUser?.role === "admin" ? "Admin Dashboard" : "Employee Portal"}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "14px", fontWeight: "600" }}>{currentUser?.name}</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{currentUser?.email}</div>
        </div>
        <button
          onClick={logout}
          style={{ ...styles.btnSmall("rgba(239,68,68,0.3)"), border: "1px solid rgba(239,68,68,0.4)" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}