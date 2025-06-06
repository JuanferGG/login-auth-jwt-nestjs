// TODO CSS
import "notyf/notyf.min.css";
import "./App.css";

// TODO Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./components/layouts/ProtectedRoutes";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

// TODO libraries
import { Route, Routes } from "react-router-dom";
import LayoutPublicPages from "./components/layouts/LayoutPublicPages";

function App() {
  return (
    <Routes>
      <Route element={<LayoutPublicPages />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes isAuthenticated */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
