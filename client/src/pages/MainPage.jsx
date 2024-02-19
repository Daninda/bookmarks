import Card from '../components/Card';
import Tools from '../components/Tools';

export default function MainPage() {
	function filter(search, option) {
		return;
	}

	return (
		<div>
			<Tools filter={filter} />
			<div className='grid grid-cols-1 gap-3 my-4 md:grid-cols-2 '>
				{[1, 2, 3, 4, 5, 6, 7, 8].map(item => {
					return (
						<Card
							key={item}
							title={'Заголовок ' + item}
							link={
								'https://ru.stackoverflow.com/questions/1205450/%D0%9A%D0%B0'
							}
							tags={[
								{ tag_id: 1, title: 'Первый' },
								{ tag_id: 2, title: 'Второй' },
								{ tag_id: 3, title: 'Третий' },
								{ tag_id: 4, title: 'Третий' },
							]}
							handleEdit={() => {}}
						/>
					);
				})}
			</div>
		</div>
	);
}
