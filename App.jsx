import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "src/Pages/Login";
import Signup from "src/Pages/Signup";
import AdminDashboard from "src/Pages/AdminDashboard";
import OwnerDashboard from "src/Pages/OwnerDashboard";
import UserDashboard from "src/Pages/UserDashboard";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
        <Link to="/signup" style={{ marginRight: "15px" }}>Signup</Link>
        <Link to="/admin" style={{ marginRight: "15px" }}>Admin Dashboard</Link>
        <Link to="/owner" style={{ marginRight: "15px" }}>Owner Dashboard</Link>
        <Link to="/user">User Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
