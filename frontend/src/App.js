import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Importa Navbar aquí
import HomePage from "./pages/HomePage";       
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ManagerCreateUserPage from "./pages/ManagerCreateUserPage"; 
import SchedulePage from "./pages/SchedulePage";  // Importa la nueva página
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtected from "./components/RoleProtected";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Aquí colocamos el Navbar para que esté visible en todas las páginas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        <Route
          path="/manager/users/new"
          element={
            <ProtectedRoute>
              <RoleProtected allowedRoles={[1, 2]}>
                <ManagerCreateUserPage />
              </RoleProtected>
            </ProtectedRoute>
          }
        />

        {/* Nueva ruta protegida para ver el calendario de turnos */}
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}