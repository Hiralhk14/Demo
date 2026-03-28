import { useState } from "react";
import { styles } from "../../styles/styles";
import FormField from "../../shared/ui/FormField";
import Modal from "../../shared/ui/Modal";
import { validateForm } from "../../utils/validation";

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
  const [fieldErrors, setFieldErrors] = useState({});

  // Form field update function - clear error when user starts typing
  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }

  function handleSave() {
    setErrorMsg("");
    setFieldErrors({});
    
    // Create custom validation rules based on whether it's editing or adding
    const validationRules = isEditing 
      ? {
          name: { type: 'name', minLength: 2 },
          email: { type: 'email' },
          department: { type: 'department', minLength: 2 }
        }
      : {
          name: { type: 'name', minLength: 2 },
          email: { type: 'email' },
          password: { type: 'password', minLength: 6 },
          department: { type: 'department', minLength: 2 }
        };
    
    // Create validation data based on whether it's editing or adding
    const validationData = isEditing 
      ? { name: form.name, email: form.email, department: form.department }
      : form;
    
    const validation = validateForm(validationData, validationRules);
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    // If editing and password left empty keep old password
    const dataToSave = {
      name: form.name,
      email: form.email,
      department: form.department,
      ...(isEditing ? {} : { password: form.password }),
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
        required={true}
        error={fieldErrors.name}
      />
      <FormField
        label="Email Address"
        type="email"
        value={form.email}
        onChange={(v) => updateField("email", v)}
        placeholder="john@company.com"
        required={true}
        error={fieldErrors.email}
      />

      {!isEditing && (
        <FormField
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => updateField("password", v)}
          placeholder="Min 6 characters"
          required={true}
          error={fieldErrors.password}
        />
      )}

      <FormField
        label="Department"
        value={form.department}
        onChange={(v) => updateField("department", v)}
        placeholder="e.g. Engineering, HR"
        required={true}
        error={fieldErrors.department}
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <button onClick={handleSave} style={{ ...styles.btnPrimary, marginTop: 0 }}>
          {isEditing ? "Save Changes" : "Add Employee"}
        </button>
        <button
          onClick={onClose}
          style={{
            ...styles.btnSmall("rgba(94, 115, 133, 0.36)"),
            width: "100%",
            padding: "13px",
            fontSize: "15px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}