import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../hooks/useUserStore";
import { NotyfComponent } from "../../components/UI/NotyfComponent";

// TODO Icon's
import { MdOutlineEmail, MdKey } from "react-icons/md";
import LogoReact from "../../assets/react.svg";

export default function LoginForm({
  setIsLogin,
}: {
  setIsLogin: (isLogin: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useLogin();
  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();

  //! Redirección automática si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin({ email, password })
      .then(() => {
        NotyfComponent.success("Inicio de sesión exitoso");
      })
      .catch((error) => {
        const errors = error.response.data.message;
        if (Array.isArray(errors)) {
          errors.map((error) => {
            NotyfComponent.error(error.message);
          });
          return;
        }
        NotyfComponent.error(errors);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8  rounded-lg shadow-md w-[95vw] h-max max-w-sm z-50"
    >
      <img
        src={LogoReact}
        width={100}
        height={100}
        alt="logo_vite"
        className="rounded-4xl m-auto p-0.5"
      ></img>
      <h1 className="text-4xl font-bold mb-2 text-center text-primary">
        Iniciar Sesión
      </h1>

      <h2 className="text-[17px] text-center text-gray-700">
        Inicia Sesion y empieza a disfrutar de nuestros servicios.
      </h2>

      <h5 className="text-left my-3 font-semibold flex items-center gap-1">
        <MdOutlineEmail />
        Correo:
      </h5>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        autoFocus
        required
      />
      <h5 className="text-left my-3 font-semibold flex items-center gap-1">
        <MdKey className="text-[#393E46]" />
        Contraseña:
      </h5>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        className="btn_forms"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Entrar"}
      </button>
      <p className="mt-5 text-center">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className="text-blue-500 cursor-pointer"
        >
          Crear cuenta
        </button>
      </p>
    </form>
  );
}
