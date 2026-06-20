import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./TransactionDetails.css";
import API from "../api/axios";

const TransactionDetails = () => {

  useEffect(() => {

  const fetchTransaction =
    async () => {

      try {

        const transactionId =
          id.replace("TXN-", "");

        const response =
          await API.get(
            `transactions/${transactionId}/`
          );

        setTransaction(
          response.data
        );

        setStatus(
          response.data.status
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  fetchTransaction();

}, [id]);
  const { id } = useParams();

  const [transaction, setTransaction] =
  useState(null);

const [status, setStatus] =
  useState("Flagged");

  const [message, setMessage] = useState("");

  const handleApprove = () => {
    setStatus("Approved");
    setMessage("✅ Transaction approved successfully.");
  };

  const handleOTP = () => {
    setStatus("Verification Required");
    setMessage("📱 OTP sent to registered mobile number.");
  };

  const handleBlock = () => {
    setStatus("Blocked");
    setMessage("🚫 Transaction blocked due to high risk.");
  };

  if (!transaction) {

  return (
    <div>
      Loading...
    </div>
  );
}
  return (
    <div className="details-layout">
      <Sidebar />

      <main className="details-content">
        <h1>Transaction Details</h1>

        <div className="details-grid">
          {/* Transaction Overview */}

          <div className="overview-card">
            <h3>Transaction Overview</h3>

            <div className="info-row">
              <span>Transaction ID</span>
              <strong>{id}</strong>
            </div>

            <div className="info-row">
              <span>Customer</span>
              <strong>
  {transaction.recipient}
</strong>
            </div>

            <div className="info-row">
              <span>Account Number</span>
              <strong>****4521</strong>
            </div>

            <div className="info-row">
              <span>Amount</span>
              <strong>
  ₹{transaction.amount}
</strong>
            </div>

            <div className="info-row">
              <span>Transaction Type</span>
              <strong>Wire Transfer</strong>
            </div>

            <div className="info-row">
              <span>Date & Time</span>
              <strong>{new Date(
  transaction.created_at
).toLocaleString()}</strong>
            </div>

            <div className="info-row">
              <span>Status</span>

              <strong
                className={
                  status === "Approved"
                    ? "approved"
                    : status === "Blocked"
                    ? "blocked"
                    : status === "Verification Required"
                    ? "verification"
                    : "flagged"
                }
              >
                {status}
              </strong>
            </div>

            <div className="info-row">
              <span>Location</span>
              <strong>New York, US</strong>
            </div>

            <div className="info-row">
              <span>IP Address</span>
              <strong>192.168.1.10</strong>
            </div>

            <div className="info-row">
              <span>Device</span>
              <strong>Chrome / Windows</strong>
            </div>
          </div>

          {/* Risk Score */}

          <div className="risk-card">
            <h3>Risk Score</h3>

            <div className="risk-circle">
  {transaction.risk_score}
</div>

            <p className="risk-text">High Risk</p>

            <div className="risk-factors">
              <h4>Risk Factors</h4>

              <ul>
                <li>⚠ High Risk Country</li>
                <li>⚠ New Device Detected</li>
                <li>⚠ Large Transaction Amount</li>
                <li>⚠ Unusual Login Time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Verification Flow */}

        <div className="timeline-card">
          <h3>Verification Flow</h3>

          <div className="timeline">
            <div className="timeline-step active">Initiated</div>

            <div className="timeline-step active">User Authenticated</div>

            <div className="timeline-step active">Risk Analysis</div>

            <div className="timeline-step">
              Decision Pending
            </div>
          </div>
        </div>

        {/* Notes */}

        <div className="notes-card">
          <h3>System Notes</h3>

          <p>
            Transaction flagged because login was detected from a
            new device and transaction amount exceeded normal
            customer behavior pattern. Additional verification
            recommended.
          </p>
        </div>

        {/* Actions */}

        <div className="action-buttons">
          <button
            className="approve-btn"
            onClick={handleApprove}
          >
            Approve
          </button>

          <button
            className="review-btn"
            onClick={handleOTP}
          >
            Resend OTP
          </button>

          <button
            className="block-btn"
            onClick={handleBlock}
          >
            Block Transaction
          </button>
        </div>

        {/* Message */}

        {message && (
          <div className="action-message">
            {message}
          </div>
        )}
      </main>
    </div>
  );
};

export default TransactionDetails;
