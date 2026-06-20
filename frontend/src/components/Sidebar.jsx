import {
  LayoutDashboard,
  ArrowLeftRight,
  TriangleAlert,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}

      <div className="logo">
        <div className="logo-icon">🛡️</div>
        <div className="logo-text">RiskGuard</div>
      </div>

      {/* Navigation */}

      <nav className="menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <ArrowLeftRight size={18} />
          <span>Transactions</span>
        </NavLink>

        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <TriangleAlert size={18} />
          <span>Alerts</span>
        </NavLink>
      </nav>

      {/* Logout */}

      <div className="logout">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <LogOut size={18} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;