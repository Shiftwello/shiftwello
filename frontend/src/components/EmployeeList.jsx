import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function EmployeeList() {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/employees`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchEmployees();
  }, [token]);

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Employees</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-100">
            <th className="border border-gray-300 p-2 text-left">Full Name</th>
            <th className="border border-gray-300 p-2 text-left">Username</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Role ID</th>
            <th className="border border-gray-300 p-2 text-left">Active</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="hover:bg-indigo-50">
              <td className="border border-gray-300 p-2">{emp.full_name}</td>
              <td className="border border-gray-300 p-2">{emp.username}</td>
              <td className="border border-gray-300 p-2">{emp.email}</td>
              <td className="border border-gray-300 p-2">{emp.role_id}</td>
              <td className="border border-gray-300 p-2">{emp.active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}