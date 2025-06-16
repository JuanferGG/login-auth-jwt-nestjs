// TODO CSS
import "notyf/notyf.min.css";
import "./App.css";

// TODO Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

// TODO Admin Page's
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";

// TODO libraries
import { Route, Routes } from "react-router-dom";
import LayoutPublicPages from "./components/layouts/LayoutPublicPages";
import LayoutUser from "./components/layouts/LayoutUser";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/** //* Public Pages */}
      <Route element={<LayoutPublicPages />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* //* Protected Routes role User isAuthenticated */}
      <Route element={<LayoutUser />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* //* Protected Routes role Admin isAuthenticated */}
      <Route element={<LayoutAdmin />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      {/* //* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default App;
