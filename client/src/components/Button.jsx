export default function Button({ className, children, onClick }) {
	return (
		<button
			className={
				'px-4 rounded shadow-md h-12 bg-surface text-textColor ' + className
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
