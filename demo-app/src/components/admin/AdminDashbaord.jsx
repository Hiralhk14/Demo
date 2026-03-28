import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { styles } from "../../styles/styles";
import { EMPLOYEE_STATUS } from "../../constants";
import Navbar from "../shared/Navbar";
import StatsCard from "./StatsCard";
import EmployeeFormModal from "./EmployeeFormModal";

export default function AdminDashboard() {
  const { employees, approveEmployee, blockEmployee, unblockEmployee, addEmployee, updateEmployee } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const statusCounts = {
    all: employees.length,
    active: employees.filter((e) => e.status === "active").length,
    pending: employees.filter((e) => e.status === "pending").length,
    blocked: employees.filter((e) => e.status === "blocked").length,
  };

  const filteredList =
    filterStatus === "all" ? employees : employees.filter((emp) => emp.status === filterStatus);

  return (
    <div style={styles.app}>
      <Navbar />
      <div style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Total", count: statusCounts.all, icon: "👥", color: "#6366f1", key: "all" },
            { label: "Active", count: statusCounts.active, icon: "✅", color: "#22c55e", key: "active" },
            { label: "Pending", count: statusCounts.pending, icon: "⏳", color: "#f59e0b", key: "pending" },
            { label: "Blocked", count: statusCounts.blocked, icon: "🚫", color: "#ef4444", key: "blocked" },
          ].map((stat) => (
            <StatsCard key={stat.key} {...stat} onClick={() => setFilterStatus(stat.key)} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0 }}>Employee List</h2>
          <button
            onClick={() => setShowAddModal(true)}
            style={{ ...styles.btnSmall("linear-gradient(135deg, #667eea, #764ba2)"), padding: "10px 20px", fontSize: "14px", borderRadius: "10px" }}
          >
            + Add Employee
          </button>
        </div>

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Name", "Email", "Department", "Status", "Actions"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredList.map((emp) => (
                <tr key={emp.id}>
                  <td style={styles.td}><strong>{emp.name}</strong></td>
                  <td style={{ ...styles.td, color: "rgba(255,255,255,0.6)" }}>{emp.email}</td>
                  <td style={{ ...styles.td, color: "rgba(255,255,255,0.6)" }}>{emp.department || "—"}</td>
                  <td style={styles.td}><span style={styles.badge(emp.status)}>{emp.status}</span></td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button onClick={() => setEditingEmployee(emp)} style={styles.btnSmall("rgba(99,102,241,0.4)")}>Edit</button>
                      {emp.status === EMPLOYEE_STATUS.pending && (
                        <button onClick={() => approveEmployee(emp.id)} style={styles.btnSmall("rgba(34,197,94,0.4)")}>Approve</button>
                      )}
                      {emp.status === EMPLOYEE_STATUS.active && (
                        <button onClick={() => blockEmployee(emp.id)} style={styles.btnSmall("rgba(239,68,68,0.4)")}>Block</button>
                      )}
                      {emp.status === EMPLOYEE_STATUS.blocked && (
                        <button onClick={() => unblockEmployee(emp.id)} style={styles.btnSmall("rgba(245,158,11,0.4)")}>Unblock</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <EmployeeFormModal onClose={() => setShowAddModal(false)} onSave={(data) => { addEmployee(data); setShowAddModal(false); }} />}
      {editingEmployee && <EmployeeFormModal existingEmployee={editingEmployee} onClose={() => setEditingEmployee(null)} onSave={(data) => { updateEmployee(editingEmployee.id, data); setEditingEmployee(null); }} />}
    </div>
  );
}