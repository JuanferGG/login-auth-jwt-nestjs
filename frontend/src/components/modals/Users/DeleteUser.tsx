import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

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

export default function DeleteUserModal({
  IsOpenView,
  setOpenView,
  user,
}: EditUserModalProps) {
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
            <h2 className="text-2xl font-bold mb-2">Eliminar Usuario</h2>
            <p className="text-lg mb-2">
              ¿Estás seguro de que deseas eliminar este usuario?
            </p>
            {user ? (
              <div className="space-y-2">
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
            <button
              className="btn_primary"
              onClick={() => setOpenView(false)}
            >
              Cancelar
            </button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
