import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  // ✅ FIXED LOGIN
  const login = (email) => {
    const cleanEmail = email?.trim();

    if (!cleanEmail) return false;

    const userData = {
      email: cleanEmail,
      role: "admin",
    };

    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    return true; // 🔥 VERY IMPORTANT
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
