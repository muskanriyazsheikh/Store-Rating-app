import React, { useState } from "react";
import axios from "../api/axios";
import { saveToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "./loginsignup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};
    if (form.name.length < 20 || form.name.length > 60)
      newErrors.name = "Name must be 20-60 chars";
    if (form.address.length > 400) newErrors.address = "Address ≤400 chars";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email";
    const passRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;
    if (!passRegex.test(form.password))
      newErrors.password =
        "Password 8-16 chars, 1 uppercase & 1 special char";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await axios.post("/auth/signup", form);
      saveToken(res.data.token);
      alert("Signup successful!");
      if (res.data.user.role === "admin") navigate("/admin");
      else if (res.data.user.role === "owner") navigate("/owner");
      else navigate("/user");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="auth-container bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="input"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="input"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button className="btn-primary w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600">
          Sign Up
        </button>

        <div className="links mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
