import { useAuth } from "../../context/AuthContext";
import Navbar from "../../shared/ui/Navbar";
import { styles } from "../../styles/styles";

// Employee Dashboard component - employee welcome page
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
          <p style={{ margin: "0 0 28px" }}>You are logged in as an Employee.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", textAlign: "left" }}>
            {[
              { label: "Email", value: currentUser?.email, icon: "📧" },
              { label: "Department", value: currentUser?.department || "Not assigned", icon: "🏬" },
              { label: "Status", value: currentUser?.status, icon: "✅" },
              { label: "Role", value: "Employee", icon: "👤" },
            ].map((item) => (
              // <div key={item.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "16px" }}>
              //   <div style={{ fontSize: "20px", marginBottom: "6px" }}>{item.icon}{item.label}</div>
              //   <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>{item.label}</div>
              //   <div style={{ fontWeight: "600", fontSize: "14px" }}>{item.value}</div>
              // </div>
              <div
                key={item.label}
                style={{
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "14px",
                  padding: "18px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                }}
              >
                {/* Top Row (Icon + Label) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                    color: "#64748b",
                    fontSize: "13px",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  {item.label}
                </div>

                {/* Value */}
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "20px",
                    color: "#1e293b",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}