import { CheckCircle, X } from "lucide-react";

interface Props {
  message: string;
  onClose?: () => void;
}

function Success({ message, onClose }: Props) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 p-4 mb-4 rounded-lg text-green-800 border border-green-200 bg-green-50 animate-fade-up"
    >
      <CheckCircle size={18} className="shrink-0 text-green-600" />
      <span className="text-sm font-medium flex-1">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md hover:bg-green-100 text-green-600 transition-colors"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default Success;
