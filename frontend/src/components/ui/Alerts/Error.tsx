import { AlertCircle, X } from "lucide-react";

interface Props {
  message: string;
  onClose?: () => void;
}

function Error({ message, onClose }: Props) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 p-4 mb-4 rounded-lg text-red-800 border border-red-200 bg-red-50 animate-fade-up"
    >
      <AlertCircle size={18} className="shrink-0 text-red-600" />
      <span className="text-sm font-medium flex-1">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md hover:bg-red-100 text-red-600 transition-colors"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default Error;
