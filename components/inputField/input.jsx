export default function Input({
  icon: Icon,
  name,
  placeholder,
  type,
  label,
  errors,
  register,
  validation = () => {},
}) {
  return (
    <>
      <div className="space-y-1">
        <label className="text-gray-400 text-xs font-medium ml-1">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C27AFFB2]">
            {Icon && <Icon />}
          </div>
          <input
            className="w-full scheme-dark bg-[#0a0a10] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            type={type}
            name={name}
            placeholder={placeholder}
            {...register(name, validation)}
          />
        </div>
        {errors && (
          <span className="text-red-500 text-xs">{errors[name]?.message}</span>
        )}
      </div>
    </>
  );
}
