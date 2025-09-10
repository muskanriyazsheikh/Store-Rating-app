// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CssBaseline } from "@mui/material";

// import Navbar from "frontend\src\components\Navbar.jsx";
// import Signup from "src/pages/Signup";
// import Login from "src/pages/Login";
// import UserDashboard from "src/components/UserDashboard";
// import OwnerDashboard from "src/components/OwnerDashboard";
// import AdminDashboard from "src/components/AdminDashboard"; // you’ll create this
// import { AuthProvider } from "src/Auth/Authcontext";
// import "./index.css";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <CssBaseline />
//         <Navbar />
//         <Routes>
//           {/* Public routes */}
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />

//           {/* Role-based dashboards */}
//           <Route path="/user" element={<UserDashboard />} />
//           <Route path="/owner" element={<OwnerDashboard />} />
//           <Route path="/admin" element={<AdminDashboard />} />

//           {/* Default route */}
//           <Route path="*" element={<Login />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);
