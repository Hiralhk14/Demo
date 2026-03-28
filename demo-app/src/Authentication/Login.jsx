import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { styles } from "../styles/styles";
import FormField from "../shared/ui/FormField";

// Login component - user login form
export default function Login({ onGoToRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Login handle function - validation and login call
  function handleLogin() {
    setErrorMsg("");
    setFieldErrors({});
    
    // Validation
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!email.includes("@") || !email.includes(".")) {
      errors.email = "Please enter a valid email";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 3) {
      errors.password = "Password must be at least 3 characters";
    }
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
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
            required={true}
            error={fieldErrors.email}
          />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            required={true}
            error={fieldErrors.password}
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