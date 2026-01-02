import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Sidebar() {
  const { user } = useAuth();

  const baseLink =
    "group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200";
  const inactive =
    "text-gray-400 hover:text-white hover:bg-gray-800";
  const active =
    "bg-gray-800 text-white shadow";

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo / Brand */}
      <div className="h-14 flex items-center px-6 border-b border-gray-800">
        <span className="text-white text-lg font-semibold tracking-wide">
          Expense SaaS
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? active : inactive}`
          }
        >
          <span className="text-lg">📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? active : inactive}`
          }
        >
          <span className="text-lg">💼</span>
          <span>Expenses</span>
        </NavLink>

        {(user.role === "admin" || user.role === "manager") && (
          <NavLink
            to="/expenses/add"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <span className="text-lg">➕</span>
            <span>Add Expense</span>
          </NavLink>
        )}

        {user.role === "admin" && (
          <NavLink
            to="/admin/invite"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <span className="text-lg">👥</span>
            <span>Invite User</span>
          </NavLink>
        )}
      </nav>

      {/* Footer / User Info */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <p className="text-white truncate max-w-[140px]">
              {user.email}
            </p>
            <p className="text-gray-400 text-xs capitalize">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
