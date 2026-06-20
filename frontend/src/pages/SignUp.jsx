import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function SignUp() {
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    emailOtp: "",
    mobileOtp: "",
    pan: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmailOtp = () => {
    if (!formData.email) {
      alert("Enter email first");
      return;
    }

    setEmailOtpSent(true);
    alert("Email OTP Sent");
  };

  const sendMobileOtp = () => {
    if (!formData.mobile) {
      alert("Enter mobile number first");
      return;
    }

    setMobileOtpSent(true);
    alert("Mobile OTP Sent");
  };

  const verifyEmailOtp = () => {
    if (formData.emailOtp.length < 4) {
      alert("Enter valid OTP");
      return;
    }

    setEmailVerified(true);
    alert("Email Verified");
  };

  const verifyMobileOtp = () => {
    if (formData.mobileOtp.length < 4) {
      alert("Enter valid OTP");
      return;
    }

    setMobileVerified(true);
    alert("Mobile Verified");
  };

  const handleSignup = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    if (!emailVerified) {
      alert("Verify Email OTP");
      return;
    }

    if (!mobileVerified) {
      alert("Verify Mobile OTP");
      return;
    }

    alert(
      "Account Created Successfully!\nKYC can be completed later."
    );
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Create Secure Account</h1>

        <p>
          Identity Verification &
          KYC Registration
        </p>

        {/* Personal Information */}

        <div className="section-title">
          Personal Information
        </div>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name *"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number *"
          value={formData.mobile}
          onChange={handleChange}
        />

        {/* OTP Verification */}

        <div className="section-title">
          OTP Verification
        </div>

        <div className="otp-row">
          <input
            type="text"
            name="emailOtp"
            placeholder="Email OTP"
            value={formData.emailOtp}
            onChange={handleChange}
          />

          {!emailVerified ? (
            <>
              <button
                type="button"
                className="otp-btn"
                onClick={sendEmailOtp}
              >
                {emailOtpSent
                  ? "Resend OTP"
                  : "Send OTP"}
              </button>

              <button
                type="button"
                className="verify-btn"
                onClick={verifyEmailOtp}
              >
                Verify
              </button>
            </>
          ) : (
            <span className="verified">
              ✓ Verified
            </span>
          )}
        </div>

        <div className="otp-row">
          <input
            type="text"
            name="mobileOtp"
            placeholder="Mobile OTP"
            value={formData.mobileOtp}
            onChange={handleChange}
          />

          {!mobileVerified ? (
            <>
              <button
                type="button"
                className="otp-btn"
                onClick={sendMobileOtp}
              >
                {mobileOtpSent
                  ? "Resend OTP"
                  : "Send OTP"}
              </button>

              <button
                type="button"
                className="verify-btn"
                onClick={verifyMobileOtp}
              >
                Verify
              </button>
            </>
          ) : (
            <span className="verified">
              ✓ Verified
            </span>
          )}
        </div>

        {/* Security Credentials */}

        <div className="section-title">
          Security Credentials
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password *"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password *"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div className="password-rules">
          ✓ Minimum 12 Characters
          <br />
          ✓ Uppercase & Lowercase
          <br />
          ✓ Number & Special Character
        </div>

        {/* Optional KYC */}

        <div className="section-title">
          Identity Verification
          (Optional)
        </div>

        <p className="optional-note">
          Complete KYC after account
          creation to increase your
          Identity Trust Score.
        </p>

        <input
          type="text"
          name="pan"
          placeholder="PAN Number (Optional)"
          value={formData.pan}
          onChange={handleChange}
        />

        <label>
          Upload PAN Card (Optional)
        </label>
        <input type="file" />

        <label>
          Upload Government ID
          (Optional)
        </label>
        <input type="file" />

        <label>
          Upload Live Selfie
          (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
        />

        <div className="security-badges">
          <span>
            ✓ Email Verification
          </span>

          <span>✓ Mobile OTP</span>

          <span>
            ✓ Device Trust Check
          </span>

          <span>✓ Risk Scoring</span>

          <span>
            ✓ KYC Verification
          </span>
        </div>

        <button
          className="signup-btn"
          onClick={handleSignup}
        >
          Create Account
        </button>

        <div className="signup-link">
          Already have an account?
          <Link to="/">
            {" "}
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;