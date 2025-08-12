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
    password: string | null;
    createdAt: string;
  } | null;
}

export default function EditUserModal({
  IsOpenView,
  setOpenView,
  user,
}: EditUserModalProps) {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string | null;
    role: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: null,
    role: "user",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
      });
    }
  }, [user]);

  const { mutate: updateUser, isPending } = useUpdateUser();

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

    if (
      user &&
      formData.firstName === user.firstName &&
      formData.lastName === user.lastName &&
      formData.email === user.email &&
      formData.password === user.password &&
      formData.role === user.role
    ) {
      NotyfComponent.open({
        type: "warning",
        message: "No se han realizado cambios.",
      });
      return;
    }

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    if (formData.password) {
      data.append("password", formData.password);
    }
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
      className="relative z-100"
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
                  <label className="block mb-2 font-semibold">Nombre:</label>
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
                  <label className="block mb-2 font-semibold">Apellido:</label>
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
                  <label className="block mb-2 font-semibold">Correo:</label>
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
                  <h5 className="text-left mb-2 font-semibold flex items-center gap-1">
                    Contraseña:
                  </h5>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Rol:</label>
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
                    className="bg-[#697565] text-white font-semibold px-4 py-2 rounded cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? "Guardando cambios..." : "Guardar Cambios"}
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
