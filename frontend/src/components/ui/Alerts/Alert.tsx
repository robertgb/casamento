import Error from "./Error";
import Success from "./Success";
import Warning from "./Warning";

interface Props {
  message: string;
  type: "error" | "success" | "warning";
  onClose?: () => void;
}

function Alert({ message, type, onClose }: Props) {
  switch (type) {
    case "error":
      return <Error message={message} onClose={onClose} />;
    case "warning":
      return <Warning message={message} onClose={onClose} />;
    case "success":
      return <Success message={message} onClose={onClose} />;
    default:
      return <Success message={message} onClose={onClose} />;
  }
}

export default Alert;
