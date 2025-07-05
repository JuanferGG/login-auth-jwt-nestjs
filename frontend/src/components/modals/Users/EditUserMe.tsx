import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useUpdateUser } from "../../../hooks/useUsers";
import { NotyfComponent } from "../../UI/NotyfComponent";

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

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        image: null,
      });
      setPreviewUrl(`${import.meta.env.VITE_BASE_API}${user.image}`);
    }
  }, [user]);

  const { mutate: updateUser } = useUpdateUser();

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
        onSuccess: () => {
          NotyfComponent.success("Usuario actualizado exitosamente");
          setOpenView(false);
        },
        onError: (error) => {
          const errors = error.response.data.message;
          if (Array.isArray(errors)) {
            errors.map((error) => {
              NotyfComponent.error(error.message);
            });
            return;
          }
          NotyfComponent.error(errors);
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

                <div>
                  <label className="block font-semibold mb-1">Imagen</label>
                  <img
                    src={previewUrl || "/placeholder.jpg"}
                    alt="img-user"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mb-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
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
