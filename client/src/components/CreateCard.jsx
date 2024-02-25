import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { create } from '../store/bookmarks/bookmarksSlice';
import Button from './Button';
import Input from './Input';

export default function CreateCard() {
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <Button
        onClick={() => {
          setIsShow(true);
        }}
        className='flex items-center gap-2 mt-4'
      >
        <IoAdd className='text-accent' size={'20px'} />
        Создать
      </Button>
      {!isShow ? (
        ''
      ) : (
        <div
          className='fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full px-4 bg-darkTransition'
          onKeyDown={e => {
            if (e.key === 'Escape') {
              return setIsShow(false);
            }
          }}
        >
          <div
            className='fixed top-0 left-0 w-full h-full'
            onClick={() => {
              setIsShow(false);
              setTitle('');
              setLink('');
            }}
          ></div>
          <form className='relative z-20 p-8 rounded shadow-md md:w-[500px] bg-background'>
            <label className='mt-6 text-sm text-gray'>Название</label>
            <Input
              autoFocus={true}
              type='text'
              placeholder='Moodle'
              className='mt-2 mb-4'
              value={title}
              setValue={setTitle}
            />
            <label className='mt-6 text-sm text-gray'>Ссылка</label>
            <Input
              type='url'
              placeholder='https://do.ssau.ru/moodle/'
              className='mt-2 mb-8'
              value={link}
              setValue={setLink}
            />
            <Button
              onClick={e => {
                e.preventDefault();
                if (title != 0 && link != 0) dispatch(create({ title, link }));
                setIsShow(false);
                setTitle('');
                setLink('');
              }}
              className='w-full'
            >
              Подтвердить
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
