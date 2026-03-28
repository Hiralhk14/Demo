import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles/styles";
import FormField from "../shared/ui/FormField";
import { DEFAULT_ADMIN } from "../constants";
import { validateForm, loginValidationRules } from "../utils/validation";
import PropTypes from "prop-types";

// Login component - user login form

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Clear error when user starts typing
  function handleEmailChange(value) {
    setEmail(value);
    if (fieldErrors.email) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  }

  function handlePasswordChange(value) {
    setPassword(value);
    if (fieldErrors.password) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  }

  // Login handle function - validation and login call
  function handleLogin() {
    setErrorMsg("");
    setFieldErrors({});
    
    // Validation using optimized validation
    const formData = { email, password };
    const validation = validateForm(formData, loginValidationRules);
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
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
          <div style={{ marginBottom: "12px", fontSize: "13px", color: "#86898d" }}>
            Demo admin credentials: {DEFAULT_ADMIN.email} / {DEFAULT_ADMIN.password}
          </div>
          {errorMsg && <div style={styles.error}>{errorMsg}</div>}
          <FormField
            label="Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@company.com"
            required={true}
            error={fieldErrors.email}
          />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            required={true}
            error={fieldErrors.password}
          />
          <button style={styles.btnPrimary} onClick={handleLogin}>Sign In</button>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#a78bfa" }}>
            New employee?{" "}
            <span onClick={() => navigate('/register')}
              style={{ color: "#a78bfa", cursor: "pointer", fontWeight: "600" }}>
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}