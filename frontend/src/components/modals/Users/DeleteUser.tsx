import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useDeteleUser } from "../../../hooks/useUsers";
import { useUserStore } from "../../../hooks/useUserStore";
import { NotyfComponent } from "../../UI/NotyfComponent";

interface DeleteUserModalProps {
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
}: DeleteUserModalProps) {
  const userStore = useUserStore().user;
  const { mutate: deleteUser, isPending } = useDeteleUser();

  const handleDelete = () => {
    if (user?.id === userStore?._id) {
      return NotyfComponent.error("No puedes eliminar tu cuenta");
    }

    deleteUser(user?.id || "", {
      onSuccess: () => {
        NotyfComponent.success("Usuario eliminado exitosamente");
        setOpenView(false);
      },
      onError: (err) => {
        console.log(err);
        NotyfComponent.error("Algo ha salido mal");
      },
    });
  };

  if (!user) return null;

  return (
    <Dialog
      open={IsOpenView}
      onClose={() => setOpenView(false)}
      className="relative z-[100]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-xl p-6 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-red-600 mb-3">
            Eliminar Usuario
          </h2>
          <p className="text-center text-gray-700 mb-5">
            ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se
            puede deshacer.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
            <p className="text-gray-800 mb-1">
              <strong>Nombre:</strong>{" "}
              <span className="capitalize">{user.firstName}</span>
            </p>
            <p className="text-gray-800 mb-1">
              <strong>Apellido:</strong>{" "}
              <span className="capitalize">{user.lastName}</span>
            </p>
            <p className="text-gray-800 mb-1">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-800 mb-1">
              <strong>Rol:</strong>{" "}
              <span className="capitalize">{user.role}</span>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <strong>Creado:</strong>{" "}
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setOpenView(false)}
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleDelete}
              disabled={isPending}
              className={`cursor-pointer px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition ${
                isPending ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
