import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { styles } from "../styles/styles";
import FormField from "../shared/ui/FormField";

export default function Login({ onGoToRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleLogin() {
    setErrorMsg("");
    if (!email || !password) { setErrorMsg("Please fill in all fields."); return; }
    const result = login(email, password);
    if (!result.success) setErrorMsg(result.message);
  }

  return (
    <div style={{ ...styles.app, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "40px" }}>🏢</div>
          <h1 style={{ margin: "8px 0 0", fontSize: "28px", fontWeight: "800" }}>
            EMS Portal
          </h1>
          <p style={{ fontSize: "14px" }}>
            Employee Management System
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={{ marginTop: 0, marginBottom: "24px", fontSize: "18px" }}>
            Sign In
          </h2>
          {errorMsg && <div style={styles.error}>{errorMsg}</div>}
          <FormField
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@company.com"
          />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />
          <button style={styles.btnPrimary} onClick={handleLogin}>Sign In</button>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#a78bfa", }}>
            New employee?{" "}
            <span onClick={onGoToRegister}
              style={{ color: "#a78bfa", cursor: "pointer", fontWeight: "600" }}>
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}