import React, { useState } from "react";
import axios from "../api/axios";
import { saveToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "./loginsignup.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      saveToken(res.data.token);
      if (res.data.user.role === "admin") navigate("/admin");
      else if (res.data.user.role === "owner") navigate("/owner");
      else navigate("/user");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="auth-container bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input"
        />
              <button
            type="submit"
            className="w-full py-2 mt-4 rounded text-white font-semibold bg-green-500 hover:bg-green-600 transition duration-300"
          >
          Login
          </button>
        <div className="links mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 font-semibold">
            Sign Up
          </Link>
         

        </div>
      </form>
    </div>
  );
}
