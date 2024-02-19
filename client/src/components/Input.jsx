export default function Input({
  value,
  setValue,
  type,
  placeholder,
  children,
  className,
  inputRef,
}) {
  return (
    <div className={className}>
      <div className='flex items-center w-full gap-4 px-4 rounded shadow-md h-14 bg-surface focus:outline-accent focus:outline-1'>
        {children}
        <input
          ref={inputRef}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={e => setValue(e.target.value)}
          className='block w-full outline-none bg-surface placeholder:text-gray'
        />
      </div>
    </div>
  );
}
