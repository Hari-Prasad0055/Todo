import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/authContext";

export default function Loginpage() {
  const [log, setLog] = useState({ username: "", password: "" });
  const { username, password } = log;
  const { login } = useAuth();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     alert("You are loggedin")
  //     navigate("/todo");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/login`, log);
      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/todo");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.error || "Login failed. Try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row p-5 text-center">
        <h3><b>Log In to make your Todos</b></h3>
      </div>
      <div className="row p-5" style={{ width: "45%", marginLeft: "360px" }}>
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={username}
              onChange={(e) => setLog({ ...log, username: e.target.value })} // ✅ fix
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setLog({ ...log, password: e.target.value })} // ✅ fix
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary px-4 py-2">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
