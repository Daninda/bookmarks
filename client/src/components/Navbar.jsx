import { IoLogOutOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <div className='shadow-md bg-surface'>
      <div className='container flex items-center justify-between h-20'>
        <ul className='flex gap-6'>
          <Link className='text-xl font-medium transition-colors text-accent hover:text-textColor'>
            Simple.bookmarks
          </Link>
        </ul>
        <Link
          className='flex items-center gap-2 text-base font-medium transition-colors hover:text-accent'
          onClick={() => dispatch(logout())}
        >
          <span>Выйти</span>
          <IoLogOutOutline size={'20px'} />
        </Link>
      </div>
    </div>
  );
}
