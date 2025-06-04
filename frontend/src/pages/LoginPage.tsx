import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../hooks/useUserStore";
import { NotyfComponent } from "../components/UI/NotyfComponent";

// TODO Icon's
import { MdOutlineEmail, MdKey } from "react-icons/md";
import { Link } from "react-router-dom";

export default function LoginPage() {
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
          })
          return;
        }
        NotyfComponent.error(errors);
      });
  };

  return (
    <section className="flex bg-[#DFD0B8] h-[100vh] w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8  rounded-lg shadow-md w-full h-max max-w-sm"
      >
        <h1 className="text-4xl font-bold mb-2 text-center text-[#222831]">
          Iniciar Sesión
        </h1>

        <h2 className="text-[17px] text-center text-gray-600">
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
          className="cursor-pointer w-full bg-[#2e3237] hover:bg-[#393E46] text-white font-semibold py-2 rounded transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
        <p className="mt-5 text-center">
          ¿No tienes cuenta?{" "}
          <Link to={"/register"} className="text-blue-500">
            Crear cuenta
          </Link>
        </p>
      </form>
    </section>
  );
}
