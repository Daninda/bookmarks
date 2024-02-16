import { useEffect, useState } from 'react';
import Search from './Search';
import Selector from './Selector';

export default function Tools({ filter }) {
	const [option, setOption] = useState(0);
	const [search, setSearch] = useState('');
	const options = [
		{ value: 1, label: 'sldkfs' },
		{ value: 2, label: 'hdfds' },
		{ value: 3, label: 'dgfjkgkgkk' },
	];

	useEffect(() => {
		filter(search, option);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, option]);

	return (
		<div className='flex flex-col justify-between gap-4 mt-4 md:flex-row'>
			<Search search={search} setSearch={setSearch} />
			<Selector option={option} options={options} setOption={setOption} />
		</div>
	);
}
