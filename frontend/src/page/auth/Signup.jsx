import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* ================= AUTH LAYOUT ================= */

function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {title}
        </h2>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const input =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const btn =
  "w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60";

/* ================= SIGNUP PAGE ================= */

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = () => {
    if (!form.name || !form.email || !form.password || !form.companyName) {
      return;
    }

    // 🔥 BACKEND CALL (OPTIONAL – IGNORE RESULT)
    axios.post(
      "https://surveice.onrender.com/auth/signup",
      form
    ).catch(() => {
      // intentionally ignored
    });

    // ✅ IMMEDIATE REDIRECT TO LOGIN
    navigate("/login");
  };

  return (
    <AuthLayout title="Create Company Account">
      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className={input}
      />

      <input
        name="email"
        type="email"
        placeholder="Work Email"
        value={form.email}
        onChange={handleChange}
        className={input}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className={input}
      />

      <input
        name="companyName"
        placeholder="Company Name"
        value={form.companyName}
        onChange={handleChange}
        className={input}
      />

      <button
        onClick={signup}
        className={btn}
      >
        Create Company
      </button>

      <p className="text-xs text-gray-500 text-center">
        You will be redirected to login
      </p>
    </AuthLayout>
  );
}

export default Signup;
