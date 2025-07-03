import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Homepage() {
  const [info, setInfo] = useState({ username: "", email: "", password: "" });
  const { email, username, password } = info;
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post(`${BACKEND_URL}/signup`, info);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      alert("Signup successful!");
      navigate("/login");
    }catch (err) {
        console.error("Signup Error:", err.response?.data || err.message);

      if (err.response?.status === 409) {
     alert("User already exists. Please login.");
    navigate("/login");
  } else {
    alert(err.response?.data?.message || "Signup failed. Try again.");
  }
}

  };

  return (
    <div className="container">
      <div className="row justify-content-center text-center my-5">
        <div className="col-md-8 col-lg-6">
          <h3 className="fw-bold mb-4" style={{ color: "#331c1c" }}>
            Sign Up to Manage Your Todos
          </h3>
          <p className="mb-3" style={{ color: "#331c1c" }}>
            Already have an account?
          </p>
          <Link to="/login">
            <button className="btn btn-secondary px-4 py-2">Log In</button>
          </Link>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <form onSubmit={handleSubmit} className="p-4 shadow bg-light rounded">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="aaaa@gamil.com"
                value={email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setInfo({ ...info, username: e.target.value })}
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
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-secondary w-100">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
