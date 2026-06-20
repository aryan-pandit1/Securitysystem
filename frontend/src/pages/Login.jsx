import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "token/",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        "Invalid username or password"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo">
          <h2>🛡 RiskGuard</h2>
          <p>Fraud Detection & Monitoring</p>
        </div>

        <div className="shield-container">
          <div className="shield-icon">🔒</div>
        </div>

        <div className="tagline">
          <h2>Protecting systems.</h2>
          <h2>Securing tomorrow.</h2>
        </div>
      </div>

      <div className="right-section">
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your account</p>

          <form onSubmit={handleLogin}>
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="remember-row">
              <div>
                <input type="checkbox" />
                <span> Remember me</span>
              </div>

              <a href="/">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Sign In
            </button>
          </form>

          <div className="signup-link">
            Don't have an account?
            <Link to="/signup">
              {" "}
              Create Account
            </Link>
          </div>

          <div className="footer">
            ©️ 2025 RiskGuard. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;