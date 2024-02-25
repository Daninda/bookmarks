import { useState } from 'react';
import { IoKeyOutline, IoMailOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import Button from '../components/Button';
import Input from '../components/Input';
import { login, register } from '../store/auth/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-center w-screen h-screen pt-[20vh]'>
      <form className='flex flex-col w-96'>
        <p className='text-xl font-medium text-center transition-colors text-accent'>
          Danila.bookmarks
        </p>

        {isEmailError ? (
          <label className='mt-8 text-sm text-error'>Некорректный email</label>
        ) : (
          <label className='mt-8 text-sm text-gray'>Email</label>
        )}
        <Input
          autoFocus={true}
          className='mt-2'
          type='email'
          placeholder='example@some.com'
          value={email}
          setValue={value => {
            setIsEmailError(false);
            setEmail(value);
          }}
        >
          <IoMailOutline className='text-accent' size={'20px'} />
        </Input>

        {isPasswordError ? (
          <label className='mt-8 text-sm text-error'>
            Длина пароля должна быть больше 6
          </label>
        ) : (
          <label className='mt-8 text-sm text-gray'>Пароль</label>
        )}
        <Input
          className='mt-2'
          type='password'
          placeholder='********'
          value={password}
          setValue={value => {
            setIsPasswordError(false);
            setPassword(value);
          }}
        >
          <IoKeyOutline className='text-accent' size={'20px'} />
        </Input>
        <Button
          className='mt-8 font-medium'
          onClick={e => {
            e.preventDefault();
            if (!validator.isEmail(email)) {
              setIsEmailError(true);
              return;
            }
            if (!validator.isLength(password, { min: 6, max: 16 })) {
              setIsPasswordError(true);
              return;
            }
            dispatch(login({ email, password }));
          }}
        >
          Войти
        </Button>
        <Button
          className='mt-4'
          onClick={e => {
            e.preventDefault();
            if (!validator.isEmail(email)) {
              setIsEmailError(true);
              return;
            }
            if (!validator.isLength(password, { min: 6, max: 16 })) {
              setIsPasswordError(true);
              return;
            }
            dispatch(register({ email, password }));
          }}
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
}
