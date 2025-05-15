export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  textarea = false,
  className = '',
  ...props
}) {
  const baseClasses = `
    w-full p-3 rounded-lg 
    bg-gray-900 border border-gray-700 
    text-white placeholder-gray-500
    focus:ring-2 focus:ring-primary focus:border-transparent
    transition duration-200
    outline-none
  `;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          {label} {required && <span className="text-primary">*</span>}
        </label>
      )}
      
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses} min-h-[120px] resize-y`}
          required={required}
          {...props}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
          required={required}
          {...props}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}