import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-gray-800 tracking-tight">
          Expense SaaS
        </span>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col text-right leading-tight">
          <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
            {user.email}
          </span>
          <span className="text-xs text-gray-500 capitalize">
            {user.role}
          </span>
        </div>

        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
          {user.role}
        </span>

        <button
          onClick={logout}
          className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 active:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
