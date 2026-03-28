import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { styles } from '../../styles/styles';

// Navbar component - navigation bar with user info and logout
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem('ems_logged_in_user');
    navigate('/login');
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    }}>
      <div>
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>
          EMS Portal
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: "13px" }}>
          Employee Management System
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "14px", fontWeight: "600" }}>
            {currentUser?.name}
          </div>
          <div style={{ fontSize: "12px" }}>
            {currentUser?.role?.toUpperCase()} • {currentUser?.email}
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "rgba(239,68,68,0.2)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#ef4444",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}