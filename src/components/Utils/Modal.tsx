import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-10 inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}>
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}>
        <button className="py-4 relative w-full">
          <X
            className="absolute end-0 top-0"
            onClick={onClose} />
        </button>
        {children}
      </div>
    </div>
  );
}
