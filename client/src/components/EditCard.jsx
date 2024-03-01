import { useEffect, useRef, useState } from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useClickOutside from '../hooks/useClickOutside';
import { update } from '../store/slices/bookmarksSlice';
import Button from './Button';
import Input from './Input';

export default function EditCard({ bookmark, isShow, setIsShow }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tagsString, setTagsString] = useState('');
  const dispatch = useDispatch();
  const editCardRef = useRef(null);

  useClickOutside(editCardRef, () => {
    setIsShow(false);
  });

  useEffect(() => {
    setTitle(bookmark.title);
    setLink(bookmark.link);
    setTagsString(bookmark.tags.map(value => value.title).join(', '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  return (
    <div
      className={
        'absolute top-0	bottom-0 right-0 transition-all left-0 w-screen h-screen z-20 flex items-center justify-center px-4 bg-darkTransition ' +
        (isShow ? 'opacity-100 visible' : 'opacity-0 invisible')
      }
      onKeyDown={e => {
        if (e.key === 'Escape') {
          return setIsShow(false);
        }
      }}
    >
      <form
        className='p-8 rounded shadow-md w-full md:w-[500px] bg-background'
        ref={editCardRef}
      >
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
          className='w-full'
          onClick={() => {
            const tags = (tagsString.split(/[.,;]/) || [])
              .filter(x => x != '')
              .map(value => {
                return { title: value };
              });
            if (title != 0 && link != 0) {
              dispatch(
                update({
                  bookmark_id: bookmark.bookmark_id,
                  title,
                  link,
                  tags,
                })
              );
              toast('Успешно обновлено', {
                icon: <FiCheckCircle className='text-accent' size={'24px'} />,
              });
              setIsShow(false);
            } else {
              toast('Заполните поля', {
                icon: <FiAlertCircle className='text-accent' size={'24px'} />,
              });
            }
          }}
        >
          Подтвердить
        </Button>
      </form>
      {/* {!isShow ? (
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

            <Button>Назад</Button>
            <Button
              onClick={() => {
                const tags = (tagsString.split(/[ .,;]/) || [])
                  .filter(x => x != '')
                  .map(value => {
                    return { title: value };
                  });
                if (title != 0 && link != 0) {
                  dispatch(create({ title, link, tags }));
                  toast('Успешно обновлено', {
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
      )} */}
    </div>
  );
}
