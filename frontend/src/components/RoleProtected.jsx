import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleProtected({ allowedLevels, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  // Convertir a número si es string
  const userLevel = Number(user.hierarchy_level);

  if (!allowedLevels.includes(userLevel)) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600 font-semibold text-xl">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return children;
}