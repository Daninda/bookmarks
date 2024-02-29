export default function Button({ className, children, onClick }) {
  return (
    <button
      className={
        'px-3 rounded hover:bg-accent flex-shrink-0 hover:text-surface transition-colors shadow-md h-12 bg-surface text-accent focus:outline focus:outline-2 active:focus:outline-none outline-accent ' +
        className
      }
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  );
}
