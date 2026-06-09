import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: UseFormRegister<any>;
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

function Input({
  name,
  register,
  label,
  error,
  fullWidth = false,
  className = "",
  id,
  ...rest
}: InputProps) {
  const inputId =
    id || `input-${name || Math.random().toString(36).substring(2, 9)}`;

  const baseClasses =
    "rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";
  const errorClasses = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : "";
  const widthClass = fullWidth ? "w-full" : "";

  const inputClasses = `${baseClasses} ${errorClasses} ${widthClass} ${className}`;

  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        {...register(name)}
        className={inputClasses}
        {...rest}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
