import { useRef, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useClickOutside from '../hooks/useClickOutside';
import { create } from '../store/slices/bookmarksSlice';
import Button from './Button';
import Input from './Input';

export default function CreateCard() {
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tagsString, setTagsString] = useState('');
  const dispatch = useDispatch();
  const editCardRef = useRef(null);

  useClickOutside(editCardRef, () => {
    setIsShow(false);
    setTitle('');
    setLink('');
    setTagsString('');
  });

  return (
    <>
      <Button
        onClick={() => {
          setIsShow(true);
        }}
        className='flex items-center gap-2 mt-4 focus:outline-none'
      >
        <FiPlus size={'20px'} />
        <span>Создать</span>
      </Button>

      <div
        className={
          'fixed overflow-hidden top-0 left-0 z-20 flex items-center justify-center w-full h-full px-4 transition-all bg-darkTransition ' +
          (isShow ? 'opacity-100 visible' : 'opacity-0 invisible')
        }
      >
        <form
          className='relative p-8 rounded shadow-md w-full md:w-[500px] bg-background'
          ref={editCardRef}
        >
          <label className='mt-6 text-sm text-gray'>Название</label>
          <Input
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
            onClick={() => {
              const tags = (tagsString.split(/[.,;]/) || [])
                .filter(x => x != '')
                .map(value => {
                  return { title: value };
                });
              if (title != 0 && link != 0) {
                dispatch(create({ title, link, tags }));
                toast('Успешно добавлено', {
                  icon: <FiCheckCircle className='text-accent' size={'24px'} />,
                });
                setIsShow(false);
                setTitle('');
                setLink('');
                setTagsString('');
              } else {
                toast('Заполните поля', {
                  icon: <FiAlertCircle className='text-accent' size={'24px'} />,
                });
              }
            }}
            className='w-full'
          >
            Подтвердить
          </Button>
        </form>
      </div>
    </>
  );
}
