import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function TaskModalView({
  IsOpenView,
  setOpenView,
}: {
  IsOpenView: boolean;
  setOpenView: (value: boolean) => void
}) {

  return (
    <Dialog open={IsOpenView} onClose={() => setOpenView(false)} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" transition />
      <div className="modalPosition">
        <div className="modalContainer">
          <DialogPanel className="dialogPanel">
            Modal
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}