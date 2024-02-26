import { useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { create } from '../store/bookmarks/bookmarksSlice';
import Button from './Button';
import Input from './Input';

export default function CreateCard() {
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tagsString, setTagsString] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <Button
        onClick={() => {
          setIsShow(true);
        }}
        className='flex items-center gap-2 mt-4'
      >
        <FiPlus size={'20px'} />
        <span>Создать</span>
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
              placeholder='React'
              className='mt-2 mb-4'
              value={title}
              setValue={setTitle}
            />
            <label className='mt-6 text-sm text-gray'>Ссылка</label>
            <Input
              type='url'
              placeholder='https://react.dev'
              className='mt-2 mb-4'
              value={link}
              setValue={setLink}
            />

            <label className='mt-6 text-sm text-gray'>Тэги</label>
            <Input
              type='text'
              placeholder='Development, React'
              className='mt-2 mb-8'
              value={tagsString}
              setValue={setTagsString}
            />

            <Button
              onClick={e => {
                e.preventDefault();
                const tags = (tagsString.split(/[ .,;]/) || [])
                  .filter(x => x != '')
                  .map(value => {
                    return { title: value };
                  });
                if (title != 0 && link != 0) {
                  dispatch(create({ title, link, tags }));
                  toast('Успешно добавлено', {
                    icon: (
                      <FiCheckCircle className='text-accent' size={'24px'} />
                    ),
                  });
                  setIsShow(false);
                  setTitle('');
                  setLink('');
                  setTagsString('');
                } else {
                  toast('Заполните поля', {
                    icon: (
                      <FiAlertCircle className='text-accent' size={'24px'} />
                    ),
                  });
                }
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
