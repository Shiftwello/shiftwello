import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * DashboardPage
 * 
 * Muestra la información del usuario autenticado
 * y un simple logout que limpia el contexto + localStorage.
 */
export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia localStorage y contexto
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Shiftwello</h1>
      <h2 className="text-2xl mb-4">Hello, {user?.full_name || "Unknown User"}!</h2>
      <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
      <p className="mb-2"><strong>Role ID:</strong> {user?.role_id}</p>
      <p className="mb-6"><strong>Department:</strong> {user?.department_name || "No department assigned"}</p>

      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}