import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cicles } from "../components/UI/Cicles/Cicles";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";

export default function Login_RegisterPage({
  defaultTab = "login",
}: {
  defaultTab?: "login" | "register";
}) {
  const [isLogin, setIsLogin] = useState(defaultTab === "login");
  const location = useLocation();
  const navigate = useNavigate();

  //* Sincroniza el estado cuando cambia la URL
  useEffect(() => {
    if (location.pathname === "/login") setIsLogin(true);
    if (location.pathname === "/register") setIsLogin(false);
  }, [location.pathname]);

  //* Esta función se pasa a los forms:
  //* cambia el estado *y* navega, así no hay "lag" visual.
  const handleSetIsLogin = (value: boolean) => {
    setIsLogin(value);
    navigate(value ? "/login" : "/register");
  };

  return (
    <section className="flex bg-[#DFD0B8] min-h-screen w-full items-center justify-center relative">
      <Cicles />
      {isLogin ? (
        <LoginForm setIsLogin={handleSetIsLogin} />
      ) : (
        <RegisterForm setIsLogin={handleSetIsLogin} />
      )}
    </section>
  );
}
