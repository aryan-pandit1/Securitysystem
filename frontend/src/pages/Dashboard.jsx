import API from "../api/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardSummary, setDashboardSummary] = useState({
  total_users: 0,
  total_logins: 0,
  total_transactions: 0,
  total_alerts: 0,
});

  const dashboardData = {
  Today: {
    transactions: 2350,
    flagged: 128,
    alerts: 23,
    risk: 72,
    recentAlerts: [
      {
        id: "ALT-10003",
        type: "High Risk Country",
        customer: "Michael Smith",
        risk: 85,
        status: "New",
      },
      {
        id: "ALT-10002",
        type: "New Device Login",
        customer: "Sarah Johnson",
        risk: 78,
        status: "Investigating",
      },
    ],
  },

  Week: {
    transactions: 14250,
    flagged: 742,
    alerts: 95,
    risk: 68,
    recentAlerts: [
      {
        id: "ALT-10010",
        type: "Account Recovery",
        customer: "James Wilson",
        risk: 82,
        status: "Review",
      },
      {
        id: "ALT-10009",
        type: "Device Mismatch",
        customer: "Emma Brown",
        risk: 71,
        status: "Investigating",
      },
    ],
  },

  Month: {
    transactions: 58420,
    flagged: 2415,
    alerts: 312,
    risk: 65,
    recentAlerts: [
      {
        id: "ALT-10125",
        type: "Insider Access Alert",
        customer: "Admin User",
        risk: 91,
        status: "Critical",
      },
      {
        id: "ALT-10120",
        type: "Suspicious KYC",
        customer: "Alex Johnson",
        risk: 88,
        status: "Review",
      },
    ],
  },
};
const activityData = {
  Today: [
    "High-risk transaction TXN-984573 flagged from new device",
    "OTP verification completed successfully",
    "New login detected from Mumbai",
    "Transaction approved after verification",
  ],

  Week: [
    "95 alerts generated this week",
    "17 suspicious logins blocked",
    "8 KYC reviews completed",
    "24 OTP verifications triggered",
  ],

  Month: [
    "312 fraud alerts detected",
    "2415 risky transactions reviewed",
    "19 insider access violations prevented",
    "124 account recovery attempts analyzed",
  ],
};
  const [period, setPeriod] = useState("Today");
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const response = await API.get(
        "dashboard/summary/"
      );

      setDashboardSummary(
        response.data
      );
    } catch (error) {
      console.error(
        "Dashboard API Error:",
        error
      );
    }
  };

  fetchDashboard();
}, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const data = dashboardData[period];

  const activities = [
    {
      time: "2 mins ago",
      event:
        "High-risk transaction TXN-984573 flagged from new device",
    },
    {
      time: "5 mins ago",
      event:
        "Customer Michael Smith completed OTP verification",
    },
    {
      time: "9 mins ago",
      event:
        "Alert ALT-10003 escalated for manual review",
    },
    {
      time: "12 mins ago",
      event:
        "Account recovery attempt detected from unknown IP",
    },
    {
      time: "15 mins ago",
      event:
        "Privileged admin login verified successfully",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>

            <p className="live-monitor">
              🟢 Live Monitoring •{" "}
              {liveTime.toLocaleTimeString()}
            </p>
          </div>

          <div className="header-right">
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <div className="profile">
              <div className="avatar">JD</div>

              <div>
                <h4>John Doe</h4>
                <p>Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-buttons">
          <button
            className={
              period === "Today" ? "active-filter" : ""
            }
            onClick={() => setPeriod("Today")}
          >
            Today
          </button>

          <button
            className={
              period === "Week" ? "active-filter" : ""
            }
            onClick={() => setPeriod("Week")}
          >
            Week
          </button>

          <button
            className={
              period === "Month" ? "active-filter" : ""
            }
            onClick={() => setPeriod("Month")}
          >
            Month
          </button>
        </div>

        <p className="selected-period">
  Showing data for:
  {period === "Today"
    ? " Current Day"
    : period === "Week"
    ? " Last 7 Days"
    : " Last 30 Days"}
</p>

        {/* KPI Cards */}
        <div className="cards-row">
          <div
            className="card risk-card clickable"
            onClick={() => navigate("/alerts")}
          >
            <h4>Total Users</h4>

<div className="score">
  {dashboardSummary.total_users}
</div>

<p>Registered Users</p>
            {/* <div className="score">{data.risk}</div>
            <p>High Risk</p> */}
          </div>

          <div
            className="card clickable"
            onClick={() => navigate("/transactions")}
          >
            <h4>Total Transactions</h4>
            <div className="number">
              {dashboardSummary.total_transactions}
            </div>
            <p className="success">+12.6%</p>
          </div>

          <div
            className="card clickable"
            onClick={() => navigate("/transactions")}
          >
            <h4>Flagged Transactions</h4>
            <div className="number">
  {dashboardSummary.total_logins}
</div>
            <p className="danger">+8.7%</p>
          </div>

          <div
            className="card clickable"
            onClick={() => navigate("/alerts")}
          >
            <h4>Alerts</h4>
            <div className="number">
              {dashboardSummary.total_alerts}
            </div>
            <p className="danger">+4.3%</p>
          </div>
        </div>

        {/* Charts */}
        <div className="analytics">
          <div className="chart-card">
            <h3>Risk Score Over Time</h3>

            <div className="fake-chart">
              Chart Here
            </div>
          </div>

          <div className="chart-card donut">
            <h3>Risk Distribution</h3>

           <div className="donut-chart">
  {data.risk}%
</div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="table-card">
          <h3>Recent Alerts</h3>

          <table>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Type</th>
                <th>Customer</th>
                <th>Risk Score</th>
                <th>Status</th>
              </tr>
            </thead>

          <tbody>
  {data.recentAlerts.map((alert) => (
    <tr key={alert.id}>
      <td>
        <Link className="dashboard-link" to="/alerts">
          {alert.id}
        </Link>
      </td>

      <td>{alert.type}</td>
      <td>{alert.customer}</td>
      <td>{alert.risk}</td>

      <td>
        <span className="status">
          {alert.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>

        {/* Recent Transactions */}
        <div className="table-card">
          <h3>Recent Transactions</h3>

          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Risk</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <Link
                    className="dashboard-link"
                    to="/transactions/TXN-984573"
                  >
                    TXN-984573
                  </Link>
                </td>

                <td>$12,500</td>

                <td>
                  <span className="status new">
                    High
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  <Link
                    className="dashboard-link"
                    to="/transactions/TXN-984572"
                  >
                    TXN-984572
                  </Link>
                </td>

                <td>$8,400</td>

                <td>
                  <span className="status investigating">
                    Medium
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Live Security Activity */}
        <div className="activity-feed">
  <h3>Live Security Activity</h3>

  {activityData[period].map((activity, index) => (
    <div key={index} className="activity-item">
      <div className="activity-dot"></div>

      <div>
        <p>{activity}</p>
        <small>
          {period === "Today"
            ? "Recent Activity"
            : period === "Week"
            ? "Weekly Summary"
            : "Monthly Summary"}
        </small>
      </div>
    </div>
  ))}
</div>
      </main>
    </div>
  );
}