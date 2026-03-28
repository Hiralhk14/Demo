import { useState } from "react";
import { styles } from "../../styles/styles";
import FormField from "../../shared/ui/FormField";
import Modal from "../../shared/ui/Modal";

// Employee Form Modal - add/edit employee form
export default function EmployeeFormModal({ existingEmployee, onClose, onSave }) {
  const isEditing = Boolean(existingEmployee);

  const [form, setForm] = useState({
    name: existingEmployee?.name || "",
    email: existingEmployee?.email || "",
    password: "",      
    department: existingEmployee?.department || "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    const { name, email, department, password } = form;

    if (!name || !email || !department) {
      setErrorMsg("Name, email, and department are required.");
      return;
    }
    if (!isEditing && !password) {
      setErrorMsg("Password is required.");
      return;
    }
    if (password && password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    //If editing and password left empty keep old password
    const dataToSave = {
      name,
      email,
      department,
      ...(password ? { password } : {}),
    };

    onSave(dataToSave);
  }

  return (
    <Modal title={isEditing ? "Edit Employee" : "Add New Employee"} onClose={onClose}>
      {errorMsg && <div style={styles.error}>{errorMsg}</div>}

      <FormField
        label="Full Name"
        value={form.name}
        onChange={(v) => updateField("name", v)}
        placeholder="John Doe"
      />
      <FormField
        label="Email Address"
        type="email"
        value={form.email}
        onChange={(v) => updateField("email", v)}
        placeholder="john@company.com"
      />

      <FormField
        label={isEditing ? "New Password (leave blank to keep current)" : "Password"}
        type="password"
        value={form.password}
        onChange={(v) => updateField("password", v)}
        placeholder={isEditing ? "Leave blank to keep current" : "Min 6 characters"}
      />

      <FormField
        label="Department"
        value={form.department}
        onChange={(v) => updateField("department", v)}
        placeholder="e.g. Engineering, HR"
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <button onClick={handleSave} style={{ ...styles.btnPrimary, marginTop: 0 }}>
          {isEditing ? "Save Changes" : "Add Employee"}
        </button>
        <button
          onClick={onClose}
          style={{
            ...styles.btnSmall("rgba(255,255,255,0.1)"),
            width: "100%",
            padding: "13px",
            fontSize: "15px",
            borderRadius: "10px",
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}