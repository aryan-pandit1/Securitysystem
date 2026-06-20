import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";
import "./Transactions.css";



export default function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await API.get(
        "transactions/history/"
      );

      const formattedTransactions =
        response.data.map((txn) => ({
          id: `TXN-${txn.id}`,
          customer: txn.user || "Unknown",
          amount: txn.amount,
          risk: txn.risk_score,
          status: txn.status,
          date: new Date(
            txn.created_at
          ).toLocaleString(),
          location: "N/A",
        }));

      setTransactions(
        formattedTransactions
      );
    } catch (error) {
      console.error(
        "Transaction API Error:",
        error
      );
    }
  };

  fetchTransactions();
}, []);

 const filteredTransactions =
  transactions.filter((txn) =>
    txn.id
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    txn.customer
      .toLowerCase()
      .includes(search.toLowerCase())
  );
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
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
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
              {filteredTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td>
                       <Link
                          to={`/transactions/${txn.id}`}
                            className="txn-id"
                               >
                            {txn.id}
                       </Link>
                   </td>

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
                      className={`status ${
  txn.status
    ? txn.status.toLowerCase()
    : ""
}`}
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
