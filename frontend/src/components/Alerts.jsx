import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Alerts.css";

const initialAlerts = [
  {
    id: "ALT-10003",
    type: "High Risk Country",
    transaction: "TXN-984573",
    customer: "Michael Smith",
    risk: 85,
    date: "May 18, 2024",
    status: "New",
  },
  {
    id: "ALT-10002",
    type: "New Device Login",
    transaction: "TXN-984572",
    customer: "Sarah Johnson",
    risk: 78,
    date: "May 18, 2024",
    status: "Investigating",
  },
  {
    id: "ALT-10001",
    type: "Large Transaction",
    transaction: "TXN-984571",
    customer: "David Brown",
    risk: 65,
    date: "May 18, 2024",
    status: "Review",
  },
  {
    id: "ALT-10000",
    type: "Unusual Location",
    transaction: "TXN-984570",
    customer: "Emily Davis",
    risk: 42,
    date: "May 18, 2024",
    status: "Closed",
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedAlert, setSelectedAlert] = useState(null);

  const updateStatus = (id, newStatus) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, status: newStatus }
          : alert
      )
    );
  };

  const getSeverity = (risk) => {
    if (risk >= 80) return "Critical";
    if (risk >= 60) return "High";
    if (risk >= 40) return "Medium";
    return "Low";
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesTab =
      activeTab === "All"
        ? true
        : alert.status === activeTab;

    const matchesSearch =
      alert.id.toLowerCase().includes(search.toLowerCase()) ||
      alert.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      alert.type
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="alerts-layout">
      <Sidebar />

      <main className="alerts-content">
        <h1>Alerts</h1>

        {/* Search */}

        <input
          type="text"
          className="search-box"
          placeholder="Search alerts..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="summary-cards">

  <div className="summary-card">
    <h3>{alerts.length}</h3>
    <p>Total Alerts</p>
  </div>

  <div className="summary-card">
    <h3>
      {alerts.filter(a => a.status === "New").length}
    </h3>
    <p>New</p>
  </div>

  <div className="summary-card">
    <h3>
      {alerts.filter(a => a.status === "Review").length}
    </h3>
    <p>Review</p>
  </div>

  <div className="summary-card">
    <h3>
      {alerts.filter(a => a.status === "Closed").length}
    </h3>
    <p>Closed</p>
  </div>

</div>

        {/* Tabs */}

        <div className="alert-tabs">
          {[
            "All",
            "New",
            "Investigating",
            "Review",
            "Closed",
          ].map((tab) => (
            <button
              key={tab}
              className={
                activeTab === tab
                  ? "tab active"
                  : "tab"
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Type</th>
                <th>Transaction</th>
                <th>Customer</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAlerts.map((alert) => (
                <tr key={alert.id}>
                  <td
                    className="alert-link"
                    onClick={() =>
                      setSelectedAlert(alert)
                    }
                  >
                    {alert.id}
                  </td>

                  <td>{alert.type}</td>

                  <td>
                    <Link
                      className="txn-link"
                      to={`/transactions/${alert.transaction}`}
                    >
                      {alert.transaction}
                    </Link>
                  </td>

                  <td>{alert.customer}</td>

                  <td>
                    <span
                      className={`severity ${getSeverity(
                        alert.risk
                      ).toLowerCase()}`}
                    >
                      {getSeverity(alert.risk)}
                    </span>
                  </td>

                  <td>{alert.status}</td>

                  <td>
                    <div className="action-group">
                      <button
                        onClick={() =>
                          updateStatus(
                            alert.id,
                            "Investigating"
                          )
                        }
                      >
                        Investigate
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            alert.id,
                            "Review"
                          )
                        }
                      >
                        Review
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            alert.id,
                            "Closed"
                          )
                        }
                      >
                        Close
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}

        {selectedAlert && (
          <div
            className="modal-overlay"
            onClick={() =>
              setSelectedAlert(null)
            }
          >
            <div
              className="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <h2>{selectedAlert.id}</h2>

              <p>
                <strong>Customer:</strong>{" "}
                {selectedAlert.customer}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {selectedAlert.type}
              </p>

              <p>
                <strong>Risk Score:</strong>{" "}
                {selectedAlert.risk}
              </p>

              <div className="alert-risk-box">
  Risk Level: {selectedAlert.risk >= 80
    ? "Critical"
    : selectedAlert.risk >= 60
    ? "High"
    : "Medium"}
</div>

              <h4>Risk Factors</h4>

              <ul>
                <li>New Device Login</li>
                <li>Foreign Location</li>
                <li>Large Transaction Amount</li>
              </ul>

              <button
                className="close-modal"
                onClick={() =>
                  setSelectedAlert(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}