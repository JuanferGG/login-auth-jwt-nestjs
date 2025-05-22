// TODO CSS
import "./App.css";
import "notyf/notyf.min.css";
import { Route, Routes } from "react-router-dom";

// TODO Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./components/ProtectedRoutes";

// TODO libraries

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes isAuthenticated */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
