import React, { createContext, useState, useEffect } from "react";
import api from "src/api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, role }
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // fetch profile from backend (implement /users/me)
      api.get("/users/me").then(res => {
        setUser(res.data);
      }).catch(() => {
        localStorage.removeItem("access_token");
      }).finally(()=> setLoading(false));
    } else setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const token = res.data.access_token || res.data.id_token || res.data.token;
    localStorage.setItem("access_token", token);
    // fetch profile after login
    const profile = await api.get("/users/me");
    setUser(profile.data);
    // redirect based on role
    if (profile.data.role === "System Administrator") nav("/admin");
    else if (profile.data.role === "Store Owner") nav("/owner");
    else nav("/user");
  };

  const signup = async (payload) => {
    await api.post("/auth/signup", payload);
    // optional: auto-login after signup
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    nav("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
