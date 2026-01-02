import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Dashboard from "./page/dashboard/Dashboard.jsx";
import Signup from "./page/auth/Signup.jsx";
import Login from "./page/auth/Login.jsx";
import VerifyEmail from "./page/auth/VerifyEmail.jsx";
import InviteRegister from "./page/auth/InviteRegister.jsx";
import ExpenseList from "./page/expenses/ExpenseList.jsx";
import AddExpense from "./page/expenses/AddExpense.jsx";
import InviteUser from "./page/admin/InviteUser.jsx";

/* ================= VERIFY OTP (INLINE) ================= */


/* ================= ROLE & PERMISSION SYSTEM ================= */

const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  AGENT: "agent",
};

function isRouteAllowed(user, roles = []) {
  if (!user) return false;
  return roles.includes(user.role);
}

/* ================= ROLE GUARD ================= */

function RoleGuard({ roles, children }) {
  const { user } = useAuth();
  return isRouteAllowed(user, roles)
    ? children
    : <Navigate to="/dashboard" />;
}

/* ================= APP LAYOUT ================= */

function AppLayout() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && <Navbar />}

      <div className="flex">
        {user && <Sidebar />}

        <main className="flex-1 p-6 bg-gray-50">
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/invite/:token" element={<InviteRegister />} />

            {/* Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <ExpenseList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/expenses/add"
              element={
                <ProtectedRoute>
                  <RoleGuard roles={[ROLES.ADMIN, ROLES.MANAGER]}>
                    <AddExpense />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/invite"
              element={
                <ProtectedRoute>
                  <RoleGuard roles={[ROLES.ADMIN]}>
                    <InviteUser />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

/* ================= ROOT ================= */

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
