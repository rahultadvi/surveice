import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function InviteRegister() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);

    const invites = JSON.parse(localStorage.getItem("invites")) || [];
    const invite = invites.find((i) => i.token === token);

    if (!invite) {
      alert("Invalid or expired invite link");
      setLoading(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = users.find((u) => u.email === email);
    if (alreadyExists) {
      alert("User already registered");
      setLoading(false);
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      role: invite.role,        
      companyId: invite.companyId,
      verified: true,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

   
    const remainingInvites = invites.filter((i) => i.token !== token);
    localStorage.setItem("invites", JSON.stringify(remainingInvites));

    alert("Registration successful. Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Invite Registration
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}

export default InviteRegister;
