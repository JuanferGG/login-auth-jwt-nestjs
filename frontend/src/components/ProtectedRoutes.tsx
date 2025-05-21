import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../hooks/useUserStore";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();

  //! Redirección automática si NO está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
}
