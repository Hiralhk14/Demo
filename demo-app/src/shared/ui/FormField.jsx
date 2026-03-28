import { styles } from "../../styles/styles";

// FormField component - reusable input field component with validation
export default function FormField({ label, type = "text", value, onChange, placeholder, error, required = false }) {
  return (
    <div style={{ marginBottom: "16px", textAlign: "left" }}>
      <label style={styles.label}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          ...styles.input,
          ...(error ? { border: "1px solid #ef4444" } : {})
        }}
      />
      {error && (
        <div style={{ 
          color: "#ef4444", 
          fontSize: "12px", 
          marginTop: "4px",
          marginLeft: "4px" 
        }}>
          {error}
        </div>
      )}
    </div>
  );
}