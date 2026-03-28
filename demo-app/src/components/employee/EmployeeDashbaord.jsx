import { useAuth } from "../../context/AuthContext";
import { styles } from "../../styles/styles";
import Navbar from "../shared/Navbar";

export default function EmployeeDashboard() {
  const { currentUser } = useAuth();

  return (
    <div style={styles.app}>
      <Navbar />
      <div style={{ padding: "32px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ ...styles.card, textAlign: "center", padding: "48px" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>👋</div>
          <h2 style={{ margin: "0 0 8px", fontSize: "26px", fontWeight: "800" }}>
            Welcome, {currentUser?.name}!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", margin: "0 0 28px" }}>You are logged in as an Employee.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", textAlign: "left" }}>
            {[
              { label: "Email", value: currentUser?.email, icon: "📧" },
              { label: "Department", value: currentUser?.department || "Not assigned", icon: "🏬" },
              { label: "Status", value: currentUser?.status, icon: "✅" },
              { label: "Role", value: "Employee", icon: "👤" },
            ].map((item) => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "16px" }}>
                <div style={{ fontSize: "20px", marginBottom: "6px" }}>{item.icon}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>{item.label}</div>
                <div style={{ fontWeight: "600", fontSize: "14px" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}