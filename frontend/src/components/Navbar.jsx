import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logoShiftwello.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Puedes ajustar esta condición según tu lógica con hierarchy_level
  const isManagerOrSupervisor = user?.role_id === 1 || user?.role_id === 2;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Shiftwello Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold text-xl text-gray-800">Shiftwello</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!user && (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                Home
              </NavLink>
            )}
            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/schedule"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }
                >
                  Schedule
                </NavLink>
                {isManagerOrSupervisor && (
                  <NavLink
                    to="/manager/users/new"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }
                  >
                    Crear Usuarios
                  </NavLink>
                )}
              </>
            )}
          </div>

          {/* User dropdown desktop */}
          {user && (
            <div className="hidden md:block relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <span className="text-gray-700 font-medium">{user.full_name}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    menuOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-1 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow">
          {!user && (
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-blue-600 font-semibold"
                  : "block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          )}
          {user && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-blue-600 font-semibold"
                    : "block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                }
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-blue-600 font-semibold"
                    : "block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                }
                onClick={() => setMenuOpen(false)}
              >
                Schedule
              </NavLink>
              {isManagerOrSupervisor && (
                <NavLink
                  to="/manager/users/new"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-md text-blue-600 font-semibold"
                      : "block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Crear Usuarios
                </NavLink>
              )}
            </>
          )}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}