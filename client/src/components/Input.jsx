export default function Input({
  value,
  setValue,
  type,
  placeholder,
  children,
  className,
  autoFocus,
}) {
  return (
    <div
      className={
        'flex items-center w-full h-12 gap-4 px-4 rounded shadow-md bg-surface focus:outline-accent focus:outline-1 ' +
        className
      }
    >
      {children}
      <input
        autoFocus={autoFocus}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        className='block w-full outline-none bg-surface placeholder:text-gray'
      />
    </div>
  );
}
