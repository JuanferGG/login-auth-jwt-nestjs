import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../../hooks/useUserStore";
import AdminHeader from "../Header/AdminHeader";

export default function LayoutAdmin() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const roleUser = user?.role;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (roleUser !== "admin") {
      navigate("/"); // redirige si no es admin
    } else {
      setIsLoading(false); // puede seguir
    }
  }, [isAuthenticated, roleUser, navigate]);

  if (isLoading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-[#DFD0B8]">
        <span className="text-lg text-gray-700">Loading...</span>
      </section>
    );
  }

  return (
    <section className="bg-[#DFD0B8] min-h-screen w-full flex">
      <AdminHeader />
      <section className="flex ml-20 transition-all duration-300 pl-0 sm:pl-6">
        <Outlet />
      </section>
    </section>
  );
}
