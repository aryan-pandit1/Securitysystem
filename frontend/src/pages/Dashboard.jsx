import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">

        <div className="dashboard-header">
          <h1>Dashboard</h1>

          <div className="header-right">
            <span>May 12 - May 18, 2024</span>
            <div className="profile">
              <div className="avatar">JD</div>
              <div>
                <h4>John Doe</h4>
                <p>Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}

        <div className="cards-row">

          <div className="card risk-card">
            <h4>Overall Risk Score</h4>
            <div className="score">72</div>
            <p>High Risk</p>
          </div>

          <div className="card">
            <h4>Total Transactions</h4>
            <div className="number">2,350</div>
            <p className="success">+12.6%</p>
          </div>

          <div className="card">
            <h4>Flagged Transactions</h4>
            <div className="number">128</div>
            <p className="danger">+8.7%</p>
          </div>

          <div className="card">
            <h4>Alerts</h4>
            <div className="number">23</div>
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
              2,350
            </div>
          </div>

        </div>

        {/* Alerts */}

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
              <tr>
                <td>ALT-10003</td>
                <td>High Risk Country</td>
                <td>Michael Smith</td>
                <td>85</td>
                <td>
                  <span className="status new">
                    New
                  </span>
                </td>
              </tr>

              <tr>
                <td>ALT-10002</td>
                <td>Structuring</td>
                <td>Sarah Johnson</td>
                <td>78</td>
                <td>
                  <span className="status investigating">
                    Investigating
                  </span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}