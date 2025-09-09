// TODO CSS
import "notyf/notyf.min.css";
import "./App.css";

// TODO Pages
import Login_RegisterPage from "./pages/Login_RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

// TODO Admin Page's
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

// TODO libraries & components
import { useEffect } from "react";
import { useUserStore } from "./hooks/useUserStore";
import { Route, Routes } from "react-router-dom";
import LayoutPublicPages from "./components/layouts/LayoutPublicPages";
import LayoutUser from "./components/layouts/LayoutUser";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const checkSessionExpiration = useUserStore(
    (state) => state.checkSessionExpiration
  );

  useEffect(() => {
    checkSessionExpiration();
  }, [checkSessionExpiration]);

  return (
    <Routes>
      {/** //* Public Pages */}
      <Route element={<LayoutPublicPages />}>
        <Route
          path="/login"
          element={<Login_RegisterPage defaultTab="login" />}
        />
        <Route
          path="/register"
          element={<Login_RegisterPage defaultTab="register" />}
        />
      </Route>

      {/* //* Protected Routes role User isAuthenticated */}
      <Route element={<LayoutUser />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* //* Protected Routes role Admin isAuthenticated */}
      <Route element={<LayoutAdmin />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/profile" element={<ProfilePage />} />
      </Route>

      {/* //* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
