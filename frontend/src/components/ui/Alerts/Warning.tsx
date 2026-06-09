import { AlertTriangle, X } from "lucide-react";

interface Props {
  message: string;
  onClose?: () => void;
}

function Warning({ message, onClose }: Props) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 p-4 mb-4 rounded-lg text-yellow-800 border border-yellow-200 bg-yellow-50 animate-fade-up"
    >
      <AlertTriangle size={18} className="shrink-0 text-yellow-600" />
      <span className="text-sm font-medium flex-1">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md hover:bg-yellow-100 text-yellow-600 transition-colors"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default Warning;
