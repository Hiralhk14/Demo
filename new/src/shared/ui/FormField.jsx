import { styles } from "../../styles/styles";

// FormField component - reusable input field component
export default function FormField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "16px", textAlign: "left" }}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
      />
    </div>
  );
}