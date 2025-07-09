import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function EmployeeEditForm({ employeeId, onUpdated }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    role_id: "",
    active: true,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/employees/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to fetch employee");
        const data = await res.json();
        setFormData({
          full_name: data.full_name,
          username: data.username,
          email: data.email,
          password: "",
          role_id: data.role_id,
          active: data.active === 1 || data.active === true,
        });
      } catch (err) {
        setError(err.message);
      }
    }
    fetchEmployee();
  }, [employeeId, token]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/employees/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Update failed");
      setSuccess("Employee updated successfully!");
      if(onUpdated) onUpdated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Edit Employee</h3>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <label className="block mb-1 font-semibold" htmlFor="full_name">Full Name</label>
      <input
        id="full_name"
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-indigo-500"
        required
      />

      <label className="block mb-1 font-semibold" htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-indigo-500"
        required
      />

      <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-indigo-500"
        required
      />

      <label className="block mb-1 font-semibold" htmlFor="password">Password (leave blank to keep)</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-indigo-500"
      />

      <label className="block mb-1 font-semibold" htmlFor="role_id">Role</label>
      <select
        id="role_id"
        name="role_id"
        value={formData.role_id}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-indigo-500"
        required
      >
        <option value="1">Manager</option>
        <option value="2">Supervisor</option>
        <option value="3">Employee</option>
      </select>

      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={handleChange}
          className="mr-2"
        />
        Active
      </label>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Save Changes
      </button>
    </form>
  );
}