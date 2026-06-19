import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      {/* Left Side */}
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

      {/* Right Side */}
      <div className="right-section">
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your account</p>

          <form>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />

            <div className="remember-row">
              <div>
                <input type="checkbox" />
                <span> Remember me</span>
              </div>

              <a href="/">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          <div className="signup-link">
            Don't have an account?
            <Link to="/signup"> Create Account</Link>
          </div>

          <div className="footer">
            © 2025 RiskGuard. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;