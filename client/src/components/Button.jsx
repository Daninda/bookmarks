export default function Button({ className, children, onClick }) {
  return (
    <button
      className={
        'px-3 rounded hover:bg-accent hover:text-surface transition-colors shadow-md h-12 bg-surface text-textColor focus:outline focus:outline-2 focus: outline-accent ' +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
