import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useUpdateUserMe } from "../../../hooks/useUsers";
import { NotyfComponent } from "../../UI/NotyfComponent";
import { useUserStore } from "../../../hooks/useUserStore";

interface EditUserMeProps {
  IsOpenView: boolean;
  setOpenView: (value: boolean) => void;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    image: string;
    createdAt: string;
  } | null;
}

export default function EditUserMe({
  IsOpenView,
  setOpenView,
  user,
}: EditUserMeProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    image: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { setUser } = useUserStore();
  const token = useUserStore.getState().token;

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        image: null,
      });
    }
  }, [user]);

  const { mutate: updateUser } = useUpdateUserMe();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleImageClear = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    if (formData.image) {
      data.append("image", formData.image);
    }

    updateUser(
      { id: user?._id || "", data },
      {
        onSuccess: (res) => {
          const updatedUser = res.data.updateUser;
          if (token) {
            setUser(updatedUser, token);
          }
          NotyfComponent.success("Usuario actualizado exitosamente");
          setOpenView(false);
        },
        onError: (error) => {
          const errors = error.response?.data?.message;
          if (Array.isArray(errors)) {
            errors.forEach((error) => NotyfComponent.error(error.message));
          } else {
            NotyfComponent.error(errors || "Error al actualizar usuario");
          }
        },
      }
    );
  };

  return (
    <Dialog
      open={IsOpenView}
      onClose={() => setOpenView(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="modalPosition">
        <div className="modalContainer">
          <DialogPanel className="dialogPanel p-6">
            <h2 className="text-2xl font-bold mb-2">Editar Usuario</h2>

            {user ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold">Nombre</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Apellido</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Correo</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>

                {/* Imagen de perfil con estilo */}
                <div className="flex flex-col items-center">
                  <label className="block font-semibold mb-2">
                    Foto de perfil (opcional)
                  </label>

                  {!formData.image && (
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
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
                          </span>
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
                        onChange={handleFileChange}
                      />
                    </label>
                  )}

                  {/* Vista previa */}
                  {previewUrl && (
                    <div className="relative mt-4">
                      <img
                        src={previewUrl}
                        alt="Vista previa"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        className="cursor-pointer absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={handleImageClear}
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

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpenView(false)}
                    className="btn_primary"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#697565] text-white font-semibold px-4 py-2 rounded cursor-pointer"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            ) : (
              <p>No hay datos para editar.</p>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
