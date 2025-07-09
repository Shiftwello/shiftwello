import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        return;
      }

      const data = await res.json();
      // Usar la función login del contexto para guardar token y usuario
      login(data.user, data.token);

      // Redirigir a dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Shiftwello</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
        )}

        <label className="block mb-2 font-semibold" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-indigo-500"
          autoComplete="username"
        />

        <label className="block mb-2 font-semibold" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-indigo-500"
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}