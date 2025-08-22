export function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
}) {
  return (
    <div className="border border-gray-200 bg-white/75 backdrop-blur-lg transition-all flex items-center h-10 px-3 rounded-md w-full sm:w-96">
      {Icon && <Icon className="text-gray-500 size-5" />}

      <input
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="ml-2 w-full bg-transparent outline-none text-sm placeholder-gray-400"
      />
    </div>
  );
}
