import Sidebar from "../components/Sidebar";
import "./Transactions.css";

const transactions = [
  {
    id: "TXN-984573",
    customer: "Michael Smith",
    amount: "$12,500",
    risk: 95,
    status: "Flagged",
    date: "May 18, 2024",
    location: "New York, US",
  },
  {
    id: "TXN-984572",
    customer: "Sarah Johnson",
    amount: "$7,850",
    risk: 78,
    status: "Review",
    date: "May 18, 2024",
    location: "London, UK",
  },
  {
    id: "TXN-984571",
    customer: "David Brown",
    amount: "$3,200",
    risk: 45,
    status: "Review",
    date: "May 18, 2024",
    location: "Berlin, Germany",
  },
  {
    id: "TXN-984570",
    customer: "Emily Davis",
    amount: "$15,000",
    risk: 15,
    status: "Clear",
    date: "May 18, 2024",
    location: "Sydney, Australia",
  },
];

export default function Transactions() {
  return (
    <div className="transactions-layout">
      <Sidebar />

      <main className="transactions-content">
        <div className="transactions-header">
          <h1>Transactions</h1>

          <div className="header-actions">
            <button className="action-btn">
              Filter
            </button>

            <button className="action-btn">
              Export
            </button>
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search transaction ID, customer..."
          />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="txn-id">{txn.id}</td>

                  <td>{txn.customer}</td>

                  <td>{txn.amount}</td>

                  <td
                    className={
                      txn.risk >= 80
                        ? "risk-high"
                        : txn.risk >= 40
                        ? "risk-medium"
                        : "risk-low"
                    }
                  >
                    {txn.risk}
                  </td>

                  <td>
                    <span
                      className={`status ${txn.status.toLowerCase()}`}
                    >
                      {txn.status}
                    </span>
                  </td>

                  <td>{txn.date}</td>

                  <td>{txn.location}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button>{"<"}</button>

            <button className="active-page">
              1
            </button>

            <button>2</button>
            <button>3</button>

            <button>{">"}</button>
          </div>
        </div>
      </main>
    </div>
  );
}