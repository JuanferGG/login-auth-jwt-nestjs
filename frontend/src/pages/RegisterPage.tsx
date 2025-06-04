import { Link, useNavigate } from "react-router-dom";

// TODO Hooks
import { useEffect, useState } from "react";
import { useCreateUser } from "../hooks/useAuth";
import { useUserStore } from "../hooks/useUserStore";

// TODO Icon's
import { MdOutlineEmail, MdKey } from "react-icons/md";
import { BiIdCard, BiUser } from "react-icons/bi";
import { NotyfComponent } from "../components/UI/NotyfComponent";

export default function RegisterPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { mutate } = useCreateUser();
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataUser = new FormData();
    dataUser.append("firstName", formData.firstName);
    dataUser.append("lastName", formData.lastName);
    dataUser.append("email", formData.email);
    dataUser.append("password", formData.password);
    if (formData.image) {
      dataUser.append("image", formData.image);
    }

    mutate(dataUser, {
      onSuccess: () => {
        NotyfComponent.success("Cuenta creada exitosamente");
        NotyfComponent.success("Ahora inicia sesion");
        navigate("/login");
      },
      onError: (error) => {
        const errors = error.response.data.message;
        if (Array.isArray(errors)) {
          errors.forEach((error) => {
            NotyfComponent.error(error);
          });
          return;
        }
        NotyfComponent.error(errors);
      },
    });
  };

  //! Redirección automática si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="flex bg-[#DFD0B8] min-h-screen max-h-fit w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center bg-white p-4 my-5 rounded-lg shadow-md sm:w-[700px] h-max"
      >
        <div>
          <h1 className="text-3xl text-center font-bold mb-4">Crear Cuenta</h1>
        </div>
        <div className="flex flex-col sm:flex sm:flex-row gap-2 w-full">
          <div className="left w-full">
            {/* // TODO firstName */}
            <h5 className="text-left my-3 font-semibold flex items-center gap-1">
              <BiUser />
              Nombre:
            </h5>
            <input
              type="text"
              placeholder="Nombre completo"
              className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              autoFocus
              required
            />
            {/* // TODO lastName */}
            <h5 className="text-left my-3 font-semibold flex items-center gap-1">
              <BiIdCard />
              Apellido:
            </h5>
            <input
              type="text"
              placeholder="Apellido completo"
              className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              autoFocus
              required
            />
            {/* // TODO email */}
            <h5 className="text-left my-3 font-semibold flex items-center gap-1">
              <MdOutlineEmail />
              Correo:
            </h5>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              autoFocus
              required
            />
          </div>
          <div className="right w-full">
            {/* // TODO password */}
            <h5 className="text-left my-3 font-semibold flex items-center gap-1">
              <MdKey className="text-[#393E46]" />
              Contraseña:
            </h5>
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-gray-300 rounded px-3 py-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            {/* // TODO image - opcional */}
            <h5 className="text-left my-3 font-semibold flex items-center gap-1">
              <BiUser className="text-[#393E46]" />
              Foto de perfil (opcional):
            </h5>
            <div className="mb-6">
              {!selectedImage ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          Haz clic para subir
                        </span>{" "}
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG o GIF (Máx. 2MB)
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      name="image"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file) {
                          // Crear URL para vista previa
                          const previewUrl = URL.createObjectURL(file);
                          setSelectedImage(file);
                          setPreviewUrl(previewUrl);
                        }
                        setFormData({ ...formData, image: file });
                      }}
                    />
                  </label>
                </div>
              ) : null}
              {/* //TODO Vista previa de la imagen */}
              <div className="mt-4 flex flex-col items-center">
                {previewUrl && (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Vista previa"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      className="cursor-pointer absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={() => {
                        // Limpiar la imagen seleccionada
                        setSelectedImage(null);
                        setPreviewUrl("");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full bg-[#2e3237] hover:bg-[#393E46] text-white font-semibold py-2 rounded transition-all duration-200"
        >
          Crear cuenta
        </button>

        <p className="mt-5 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to={"/login"} className="text-blue-500">
            Iniciar sesion
          </Link>
        </p>
      </form>
    </section>
  );
}
