import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface ShowUserModalProps {
  IsOpenView: boolean;
  setOpenView: (value: boolean) => void;
}

export default function ShowUserModal({
  IsOpenView,
  setOpenView,
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
            <h1>Form modal</h1>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
