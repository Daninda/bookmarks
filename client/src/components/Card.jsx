import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Card({ title, link, tags, handleEdit }) {
	return (
		<div className='flex items-center justify-between overflow-hidden transition-transform rounded shadow-md group hover:translate-x-1 bg-surface'>
			<a
				className='block w-full p-4 overflow-hidden cursor-pointer'
				href={link}
			>
				<h1 className='block overflow-hidden font-medium overflow-ellipsis'>
					{title}
				</h1>
				<p className='block py-2 overflow-hidden text-xs text-textGray overflow-ellipsis whitespace-nowrap'>
					{link}
				</p>
				<div className='flex flex-wrap gap-2 mt-4'>
					{tags.map(item => {
						return (
							<p
								key={item.tag_id}
								className='block px-2 py-1 text-xs transition-colors cursor-pointer text-accent '
							>
								{item.title}
							</p>
						);
					})}
				</div>
			</a>
			<Link
				onClick={handleEdit}
				className='flex items-center h-full p-4 transition-all opacity-0 text-accent hover:bg-accent hover:text-surface group-hover:opacity-100 '
			>
				<FiEdit />
			</Link>
		</div>
	);
}
