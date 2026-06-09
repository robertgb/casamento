import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from "react";

export type ModalRef = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalRef, PropsWithChildren>(({ children }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-up"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full animate-scale-in">
        {children}
      </div>
    </div>
  );
});

Modal.displayName = "Modal";

export default Modal;
