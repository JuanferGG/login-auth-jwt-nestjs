import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../hooks/useUserStore";
import { NotyfComponent } from "../components/UI/NotyfComponent";

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
        // console.log(error.response.data.message)
        NotyfComponent.error(error.response.data.message);
      });

    // navigate("/");
  };

  return (
    <section className="flex bg-red-400 h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8  rounded-lg shadow-md w-full h-max max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Iniciar sesión
        </h2>

        <h5 className="text-left my-3 font-semibold">Correo:</h5>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoFocus
          required
        />
        <h5 className="text-left my-3 font-semibold">Contraseña:</h5>
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>
    </section>
  );
}
