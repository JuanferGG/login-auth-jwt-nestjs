import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../../hooks/useUserStore";

export default function LayoutPublicPages() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-[#DFD0B8]">
        <span className="text-lg text-gray-700">Loading...</span>
      </section>
    );
  }


  return (
    <section className="bg-[#DFD0B8] min-h-screen w-full">
        <Outlet />
    </section>
  )
}
