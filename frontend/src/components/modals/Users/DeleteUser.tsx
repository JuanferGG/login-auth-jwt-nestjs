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
  const userStore = useUserStore().user
  const { mutate: deleteUser, isPending } = useDeteleUser();

  const handleDelete = () => {
    if (user?.id === userStore?._id){
      return NotyfComponent.error("No puedes eliminar tu cuenta")
    }

    deleteUser(user?.id || "", {
      onSuccess: () => {
        NotyfComponent.success("Usuario eliminado exitosamente");
        setOpenView(false)
      },
      onError: (err) => {
        console.log(err);
        NotyfComponent.error("Algo ha salido mal");
      },
    });
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
            <h2 className="text-3xl font-bold mb-2">Eliminar Usuario</h2>
            <p className="text-lg mb-2">
              ¿Estás seguro de que deseas eliminar este usuario?
            </p>
            {user ? (
              <div className="space-y-2 mb-4 text-xl">
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
                Cancelar
              </button>
              <button
                className="cursor-pointer px-2 bg-red-500 font-semibold rounded-md h-[40px] text-white flex items-center"
                onClick={() => handleDelete()}
                disabled={isPending}
              >
                {isPending ? 'Eliminando' : 'Eliminar'}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
