import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

/* ================= AUTH LAYOUT ================= */

function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {title}
        </h2>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

/* ================= LOGIN PAGE ================= */

function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = () => {
    const success = login(email);
    if (!success) {
      alert("Invalid user or email not verified");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Login">
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
      >
        Login
      </button>

      <Link
        to="/signup"
        className="block text-center text-sm text-blue-600 hover:underline"
      >
        Create Admin Account
      </Link>
    </AuthLayout>
  );
}

export default Login;
