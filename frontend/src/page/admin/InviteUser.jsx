import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function InviteUser() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("agent");
  const [success, setSuccess] = useState(false);

  const invite = () => {
    const invites = JSON.parse(localStorage.getItem("invites")) || [];
    invites.push({
      token: "inv_" + Date.now(),
      email,
      role,
      companyId: user.companyId,
    });
    localStorage.setItem("invites", JSON.stringify(invites));
    setEmail("");
    setRole("agent");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Invite User
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Admin-only action · Invite a team member to your company
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Email
            </label>
            <input
              type="email"
              placeholder="user@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="manager">Manager — Can add & view expenses</option>
              <option value="agent">Agent — View only</option>
            </select>
          </div>

          <button
            onClick={invite}
            disabled={!email}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Invite
          </button>

          {success && (
            <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-700">
              Invite sent successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InviteUser;
