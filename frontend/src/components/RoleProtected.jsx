import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RoleProtected({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role_id)) {
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