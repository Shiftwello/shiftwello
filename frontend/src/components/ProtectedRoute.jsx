import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Si no hay usuario logueado, redirige a home ("/")
    return <Navigate to="/" replace />;
  }

  // Usuario autenticado, permite acceder a la ruta protegida
  return children;
}