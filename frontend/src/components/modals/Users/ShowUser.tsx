import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface ShowUserModalProps {
  IsOpenView: boolean;
  setOpenView: (value: boolean) => void;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    image: string;
    createdAt: string;
  } | null;
}

export default function ShowUserModal({
  IsOpenView,
  setOpenView,
  user,
}: ShowUserModalProps) {
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
            <h2 className="text-3xl font-bold mb-2">Usuario:</h2>
            <p className="text-lg mb-2">
              Aqui puedes ver la informacion completa de un usuario
            </p>
            {user ? (
              <div className="space-y-2 mb-4 text-xl">
                <img
                  src={`${import.meta.env.VITE_BASE_API}${user.image}`}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <p>
                  <strong>Fecha de Registro:</strong>{" "}
                  {new Date(user.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Nombre:</strong> {user.firstName}
                </p>
                <p>
                  <strong>Apellido:</strong> {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Rol:</strong> {user.role}
                </p>
              </div>
            ) : (
              <p>No hay datos para mostrar</p>
            )}
            <div className="flex gap-2">
              <button
                className="btn_primary"
                onClick={() => setOpenView(false)}
              >
                Cerrar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
