import { forwardRef } from "react";

// ✅ Componente reutilizável para campos de entrada
const Input = forwardRef(({ label, type = "text", name, value, onChange, disabled }, ref) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <input
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full mt-1 p-3 border rounded-md bg-gray-800 text-white border-gray-600 focus:ring focus:ring-blue-400 focus:outline-none ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
});

export default Input;