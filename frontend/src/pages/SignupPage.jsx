import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

export default function SignupPage() {
  const { token, user } = useAuth(); // ahora obtenemos el usuario también
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Solo managers o supervisors (rol_id 1 o 2) pueden ver el formulario
  if (!user || (user.role_id !== 1 && user.role_id !== 2)) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600 text-xl font-semibold">
          You do not have permission to create new users.
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.full_name || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/employees`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,   
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role_id: 3
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Signup successful! You can now login.");
      setFormData({
        full_name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
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
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up for Shiftwello</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>
        )}

        <label className="block mb-2 font-semibold" htmlFor="full_name">
          Full Name
        </label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-indigo-500"
        />

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
        />

        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-indigo-500"
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
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-indigo-500"
        />

        <label className="block mb-2 font-semibold" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}