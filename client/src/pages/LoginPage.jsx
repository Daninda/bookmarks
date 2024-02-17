import { useState } from 'react';
import { IoKeyOutline, IoMailOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import { login, register } from '../store/auth/authSlice';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	return (
		<div className='flex justify-center w-screen h-screen pt-[20vh]'>
			<form className='flex flex-col w-96'>
				<p className='text-xl font-medium text-center transition-colors text-accent'>
					Danila.bookmarks
				</p>
				<label className='mt-8 text-sm text-gray'>Email</label>
				<Input
					className='mt-2'
					type='email'
					placeholder='example@some.com'
					value={email}
					setValue={setEmail}
				>
					<IoMailOutline className='text-accent' size={'20px'} />
				</Input>
				<label className='mt-6 text-sm text-gray'>Password</label>
				<Input
					className='mt-2'
					type='password'
					placeholder='********'
					value={password}
					setValue={setPassword}
				>
					<IoKeyOutline className='text-accent' size={'20px'} />
				</Input>
				<Button
					className='mt-8 font-medium'
					onClick={() => {
						dispatch(login({ email, password }));
					}}
				>
					Войти
				</Button>
				<Button
					className='mt-4'
					onClick={() => {
						dispatch(register({ email, password }));
					}}
				>
					Зарегистрироваться
				</Button>
			</form>
		</div>
	);
}
