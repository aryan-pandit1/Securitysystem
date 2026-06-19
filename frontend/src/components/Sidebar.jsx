import {
  LayoutDashboard,
  ArrowLeftRight,
  TriangleAlert,
  FileBarChart,
  Eye,
  Settings,
} from "lucide-react";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">🛡</div>
        <div className="logo-text">RiskGuard</div>
      </div>

      <nav className="menu">
        <div className="menu-item">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </div>

        <div className="menu-item">
          <ArrowLeftRight size={18} />
          <span>Transactions</span>
        </div>

        <div className="menu-item active">
          <TriangleAlert size={18} />
          <span>Alerts</span>
        </div>

        <div className="menu-item">
          <FileBarChart size={18} />
          <span>Reports</span>
        </div>

        <div className="menu-item">
          <Eye size={18} />
          <span>Watchlist</span>
        </div>

        <div className="menu-item">
          <Settings size={18} />
          <span>Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;