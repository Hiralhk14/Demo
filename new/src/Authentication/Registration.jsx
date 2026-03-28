import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { styles } from "../styles/styles";
import FormField from "../shared/ui/FormField";

// Registration component - new employee registration form
export default function Registration({ onGoToLogin }) {
  const { registerEmployee } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", department: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form field update function
  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Registration handle function - validation and registration call
  function handleRegister() {
    setErrorMsg(""); setSuccessMsg("");
    const { name, email, password, department } = form;
    if (!name || !email || !password || !department) { setErrorMsg("All fields are required."); return; }
    if (password.length < 6) { setErrorMsg("Password must be at least 6 characters."); return; }

    const result = registerEmployee(form);
    if (result.success) {
      setSuccessMsg("Registration submitted! Please wait for admin approval.");
      setForm({ name: "", email: "", password: "", department: "" });
    } else {
      setErrorMsg(result.message);
    }
  }

  return (
    <div style={{ ...styles.app, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "40px" }}>📝</div>
          <h1 style={{ margin: "8px 0 0", fontSize: "28px", fontWeight: "800" }}>
            Register
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
            Submit your details for admin approval
          </p>
        </div>

        <div style={styles.card}>
          {errorMsg &&
            <div style={styles.error}>{errorMsg}
            </div>}
          {successMsg &&
            <div style={styles.success}>{successMsg}
            </div>}
          <FormField
            label="Full Name"
            value={form.name}
            onChange={(v) => updateField("name", v)}
            placeholder="John Doe"
          />
          <FormField
            label="Email Address"
            type="email" value={form.email}
            onChange={(v) => updateField("email", v)}
            placeholder="john@company.com"
          />
          <FormField
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => updateField("password", v)}
            placeholder="Min 6 characters"
          />
          <FormField
            label="Department"
            value={form.department}
            onChange={(v) => updateField("department", v)}
            placeholder="e.g. Engineering, HR"
          />
          <button
            style={styles.btnPrimary}
            onClick={handleRegister}>
            Submit Registration
          </button>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#a78bfa", }}>
            Already registered?{" "}
            <span
              onClick={onGoToLogin}
              style={{ color: "#a78bfa", cursor: "pointer", fontWeight: "600" }}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}