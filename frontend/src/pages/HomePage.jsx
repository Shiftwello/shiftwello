import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logoShiftwello.png";

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Si está redirigiendo no muestra nada, evita el render inicial
  if (user) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <img src={logo} alt="Shiftwello Logo" className="w-24 h-24 mb-4 object-contain" />
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Shiftwello</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Empower your hotel team. Automate schedules. Elevate wellbeing.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}