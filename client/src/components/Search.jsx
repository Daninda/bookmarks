import { IoSearch } from 'react-icons/io5';
import Input from './Input';

export default function Search({ search, setSearch, className }) {
	return (
		<Input
			className={className}
			value={search}
			setValue={setSearch}
			placeholder={'Поиск...'}
		>
			<IoSearch className='text-accent' />
		</Input>
	);
}
