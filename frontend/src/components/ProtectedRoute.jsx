import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;