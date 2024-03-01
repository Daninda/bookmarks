export default function Input({
  inputRef,
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
        'flex items-center w-full h-12 flex-shrink-0 gap-4 px-4 rounded shadow-md bg-surface focus:outline-accent focus:outline-1 ' +
        className
      }
    >
      {children}
      <input
        ref={inputRef}
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
