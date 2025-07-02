import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useUpdateUser } from "../../../hooks/useUsers";
import { useState, useEffect } from "react";
import { NotyfComponent } from "../../UI/NotyfComponent";

interface EditUserModalProps {
  IsOpenView: boolean;
  setOpenView: (value: boolean) => void;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
  } | null;
}

export default function EditUserModal({
  IsOpenView,
  setOpenView,
  user,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("role", formData.role);

    updateUser(
      { id: user?.id || "", data },
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
            <p className="text-lg mb-2">
              ¿Estás seguro de que deseas eliminar este usuario?
            </p>

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
                  <label className="block font-semibold">Rol</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
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
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
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
