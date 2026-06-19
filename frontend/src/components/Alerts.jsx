import Sidebar from "../components/Sidebar";
import "./Alerts.css";

const alerts = [
  {
    id: "ALT-10003",
    type: "High Risk Country",
    transaction: "TXN-984573",
    customer: "Michael Smith",
    risk: 85,
    date: "May 18, 2024 10:24 AM",
    status: "New",
  },
  {
    id: "ALT-10002",
    type: "Structuring Detected",
    transaction: "TXN-984572",
    customer: "Sarah Johnson",
    risk: 78,
    date: "May 18, 2024 09:15 AM",
    status: "Investigating",
  },
  {
    id: "ALT-10001",
    type: "Velocity Check",
    transaction: "TXN-984571",
    customer: "David Brown",
    risk: 65,
    date: "May 18, 2024 08:42 AM",
    status: "New",
  },
  {
    id: "ALT-10000",
    type: "Unusual Pattern",
    transaction: "TXN-984570",
    customer: "Emily Davis",
    risk: 45,
    date: "May 18, 2024 07:33 AM",
    status: "Review",
  },
  {
    id: "ALT-09999",
    type: "New Payee",
    transaction: "TXN-984569",
    customer: "James Wilson",
    risk: 32,
    date: "May 18, 2024 06:51 AM",
    status: "Closed",
  },
];

export default function Alerts() {
  return (
    <div className="alerts-layout">
      <Sidebar />

      <main className="alerts-content">

        <div className="alerts-header">
          <h1>Alerts</h1>

          <div className="header-actions">
            <button className="action-btn">
              Filter
            </button>

            <button className="action-btn">
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}

        <div className="alert-tabs">
          <button className="tab active">
            All (23)
          </button>

          <button className="tab">
            New (10)
          </button>

          <button className="tab">
            Investigating (8)
          </button>

          <button className="tab">
            Review (3)
          </button>

          <button className="tab">
            Closed (2)
          </button>
        </div>

        {/* Table */}

        <div className="table-wrapper">

          <table>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Type</th>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Risk Score</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.id}</td>

                  <td>{alert.type}</td>

                  <td className="txn-id">
                    {alert.transaction}
                  </td>

                  <td>{alert.customer}</td>

                  <td
                    className={
                      alert.risk >= 80
                        ? "risk-high"
                        : alert.risk >= 50
                        ? "risk-medium"
                        : "risk-low"
                    }
                  >
                    {alert.risk}
                  </td>

                  <td>{alert.date}</td>

                  <td>
                    <span
                      className={`status ${alert.status.toLowerCase()}`}
                    >
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button>{"<"}</button>
            <button className="active-page">1</button>
            <button>2</button>
            <button>3</button>
            <button>{">"}</button>
          </div>

        </div>

      </main>
    </div>
  );
}