import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

/* ================= AUTH LAYOUT ================= */

function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const btn =
  "inline-block w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition";

/* ================= VERIFY EMAIL PAGE ================= */

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.verifyToken === token ? { ...u, verified: true } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Optional: auto redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [token, navigate]);

  return (
    <AuthLayout title="Email Verified">
      <p className="text-sm text-gray-600">
        Your email has been successfully verified.
      </p>

      <p className="text-xs text-gray-400">
        Redirecting to login...
      </p>

      <Link to="/login" className={btn}>
        Go to Login
      </Link>
    </AuthLayout>
  );
}

export default VerifyEmail;
