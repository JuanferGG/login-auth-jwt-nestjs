import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { BiUser } from "react-icons/bi";

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
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="modalPosition">
        <div className="modalContainer">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl p-6 transition-all border border-gray-100">
            <div className="flex flex-col items-center text-center">
              {/* Imagen del usuario */}
              {user?.image ? (
                <img
                  src={`${import.meta.env.VITE_BASE_API}${user.image}`}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-28 h-28 rounded-full border-4 border-blue-100 shadow-md object-cover mb-4"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded-full mb-4 border border-gray-200">
                  <BiUser className="text-5xl text-gray-400" />
                </div>
              )}

              {/* Título */}
              <DialogTitle
                as="h3"
                className="text-2xl font-bold text-gray-800 mb-1"
              >
                {user
                  ? `${user.firstName} ${user.lastName}`
                  : "Usuario no disponible"}
              </DialogTitle>

              <p className="text-sm text-gray-500 mb-5">
                Información completa del usuario
              </p>

              {/* Datos del usuario */}
              {user ? (
                <div className="w-full text-left space-y-2 text-gray-700">
                  <p>
                    <strong className="font-semibold text-gray-900">ID:</strong>{" "}
                    {user.id}
                  </p>
                  <p>
                    <strong className="font-semibold text-gray-900">
                      Correo:
                    </strong>{" "}
                    {user.email}
                  </p>
                  <p>
                    <strong className="font-semibold text-gray-900">
                      Rol:
                    </strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        user.role === "admin"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </p>
                  <p>
                    <strong className="font-semibold text-gray-900">
                      Fecha de Registro:
                    </strong>{" "}
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No hay datos para mostrar.
                </p>
              )}

              {/* Botón de cierre */}
              <div className="mt-6 w-full">
                <button
                  onClick={() => setOpenView(false)}
                  className="cursor-pointer w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
