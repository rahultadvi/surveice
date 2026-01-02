import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.email === email && u.verified);
    if (!found) return false;

    setUser(found);
    localStorage.setItem("auth_user", JSON.stringify(found));
    return true;
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
