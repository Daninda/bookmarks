import { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { IoKeyOutline, IoMailOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import validator from 'validator';
import Button from '../components/Button';
import Input from '../components/Input';
import { login, register, setError } from '../store/slices/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.auth.errorMessage);

  if (errorMessage) {
    toast(errorMessage, {
      icon: <FiAlertCircle className='text-accent' size={'24px'} />,
    });
    dispatch(setError(false));
  }
  return (
    <div className='flex justify-center w-screen h-screen pt-[20vh] px-4'>
      <form className='flex flex-col w-full sm:w-96'>
        <p className='text-xl font-medium text-center transition-colors text-accent'>
          Simple.bookmarks
        </p>

        {isEmailError ? (
          <label className='mt-8 text-sm text-error'>Некорректный email</label>
        ) : (
          <label className='mt-8 text-sm text-gray'>Email</label>
        )}
        <Input
          autoFocus={true}
          className={'mt-2 ' + (isEmailError ? 'ring-1 ring-error' : '')}
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
            Длина пароля от 6 до 16 символов
          </label>
        ) : (
          <label className='mt-8 text-sm text-gray'>Пароль</label>
        )}
        <Input
          className={'mt-2 ' + (isPasswordError ? 'ring-1 ring-error' : '')}
          type='password'
          placeholder='password'
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
          onClick={() => {
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
          onClick={() => {
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
