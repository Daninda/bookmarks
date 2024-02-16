import { useState } from 'react';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className='flex items-center justify-center w-screen h-screen'>
			<form className='flex flex-col w-96'>
				<h1 className='px-4 py-2 text-xl text-center text-textColor'>
					Авторизация
				</h1>
				<input
					className='px-4 py-2 mt-4 rounded shadow-md bg-surface text-textColor'
					type='email'
					aria-describedby='emailHelp'
					placeholder='Введите email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					className='px-4 py-2 mt-4 rounded shadow-md bg-surface text-textColor'
					type='password'
					placeholder='Введите пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button className='px-4 py-2 mt-8 rounded shadow-md bg-surface text-textColor'>
					Подтвердить
				</button>
			</form>
		</div>
	);
}
