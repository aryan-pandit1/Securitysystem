import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function SignUp() {
  return (
    <div className="signup-page">
      <div className="signup-card">

        <h1>Create Secure Account</h1>
        <p>Identity Verification & KYC Registration</p>

        {/* Personal Information */}

        <div className="section-title">
          Personal Information
        </div>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="tel"
          placeholder="Mobile Number"
        />

        {/* Security */}

        <div className="section-title">
          Security Credentials
        </div>

        <input
          type="password"
          placeholder="Password"
        />

        <input
          type="password"
          placeholder="Confirm Password"
        />

        <div className="password-rules">
          ✓ Minimum 12 Characters <br />
          ✓ Uppercase & Lowercase <br />
          ✓ Number & Special Character
        </div>

        {/* Verification */}

        <div className="section-title">
          Identity Verification
        </div>

        <input
          type="text"
          placeholder="PAN Number"
        />

        <label>Upload PAN Card</label>
        <input type="file" />

        <label>Upload Government ID</label>
        <input type="file" />

        <label>Upload Live Selfie</label>
        <input
          type="file"
          accept="image/*"
        />

        <div className="security-badges">
          <span>✓ Email Verification</span>
          <span>✓ Mobile OTP</span>
          <span>✓ CAPTCHA</span>
          <span>✓ Device Trust Check</span>
          <span>✓ Risk Scoring</span>
          <span>✓ KYC Verification</span>
        </div>

        <button className="signup-btn">
          Create Account
        </button>

        <div className="signup-link">
          Already have an account?
          <Link to="/"> Sign In</Link>
        </div>

      </div>
    </div>
  );
}

export default SignUp;