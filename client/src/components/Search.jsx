import { IoSearch } from 'react-icons/io5';

export default function Search({ search, setSearch }) {
	return (
		<div className='flex items-center w-full gap-4 px-4 rounded shadow-md md:w-80 h-14 bg-surface focus:outline-accent focus:outline-1'>
			<IoSearch className='text-accent' />
			<input
				placeholder='Поиск...'
				id='search'
				type='search'
				value={search}
				onChange={e => setSearch(e.target.value)}
				className='block w-full outline-none bg-surface placeholder:text-gray'
			/>
		</div>
	);
}
