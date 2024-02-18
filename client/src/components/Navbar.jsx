import { IoLogOutOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth/authSlice';
import { create } from '../store/bookmarks/bookmarksSlice';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <div className='shadow-md bg-surface'>
      <div className='container flex items-center justify-between h-20'>
        <ul className='flex gap-6'>
          <Link
            className='text-xl font-medium transition-colors text-accent hover:text-textColor'
            // to={'/'}
            onClick={() => {
              dispatch(
                create({
                  title: 'lsdkflskdlf',
                  link: 'allalalalalla',
                  description: 'cringe',
                })
              );
            }}
          >
            Danila.bookmarks
          </Link>
        </ul>
        <Link
          className='flex items-center gap-3 text-base font-medium transition-colors hover:text-accent'
          onClick={() => dispatch(logout())}
        >
          <span>Выйти</span>
          <IoLogOutOutline />
        </Link>
      </div>
    </div>
  );
}
