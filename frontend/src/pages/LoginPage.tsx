import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../hooks/useUserStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { handleLogin, loading, error: hookError } = useLogin();
  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();

  console.log(isAuthenticated)

  // Redirección automática si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await handleLogin({ email, password });
    if (!result) {
      setError(hookError || "Error al iniciar sesión");
    } else {
      navigate("/");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Iniciar sesión
        </h2>
        {(error || hookError) && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {error || hookError}
          </div>
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoFocus
          required
        />
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
