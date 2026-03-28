import { useState } from "react";
import Modal from "../shared/Modal";
import FormField from "../shared/FormField";
import { styles } from "../../styles/styles";

export default function EmployeeFormModal({ existingEmployee, onClose, onSave }) {
  const isEditing = Boolean(existingEmployee);
  const [form, setForm] = useState({
    name: existingEmployee?.name || "",
    email: existingEmployee?.email || "",
    password: existingEmployee?.password || "",
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
    onSave(form);
  }

  return (
    <Modal title={isEditing ? "Edit Employee" : "Add New Employee"} onClose={onClose}>
      {errorMsg && <div style={styles.error}>{errorMsg}</div>}
      <FormField label="Full Name" value={form.name} onChange={(v) => updateField("name", v)} placeholder="John Doe" />
      <FormField label="Email" type="email" value={form.email} onChange={(v) => updateField("email", v)} placeholder="john@company.com" />
      {!isEditing && (
        <FormField label="Password" type="password" value={form.password} onChange={(v) => updateField("password", v)} placeholder="Min 6 characters" />
      )}
      <FormField label="Department" value={form.department} onChange={(v) => updateField("department", v)} placeholder="e.g. Engineering" />

      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <button onClick={handleSave} style={{ ...styles.btnPrimary, marginTop: 0 }}>
          {isEditing ? "Save Changes" : "Add Employee"}
        </button>
        <button onClick={onClose} style={{ ...styles.btnSmall("rgba(255,255,255,0.1)"), width: "100%", padding: "13px", borderRadius: "10px" }}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}