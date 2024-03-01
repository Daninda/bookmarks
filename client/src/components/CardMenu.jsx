import { useRef, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import useClickOutside from '../hooks/useClickOutside';
import EditCard from './EditCard';

export default function CardMenu({ bookmark, handleDelete }) {
  const [isShow, setIsShow] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    setIsShow(false);
  });

  return (
    <>
      <button
        className='pt-4 pb-4 pl-4 pr-3 transition-colors hover:text-accent text-textGray'
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        <FiMoreVertical size={'20px'} />
      </button>
      <div
        ref={menuRef}
        className={
          'absolute z-10 text-sm text-textColor transition-all p-2 flex flex-col -translate-x-2 translate-y-2 rounded shadow-md bg-surface ' +
          (isShow ? 'opacity-100 visible' : 'opacity-0 invisible')
        }
      >
        <button
          className='px-3 py-2 transition-colors rounded text-start hover:bg-grayLight'
          onClick={() => {
            setIsShow(false);
            setIsShowEdit(true);
          }}
        >
          Редактировать
        </button>
        <button
          className='px-3 py-2 transition-colors rounded text-start hover:bg-grayLight'
          onClick={() => {
            setIsShow(false);
            handleDelete();
          }}
        >
          Удалить
        </button>
      </div>
      <EditCard
        bookmark={bookmark}
        isShow={isShowEdit}
        setIsShow={setIsShowEdit}
      />

      {/* <Link
          onClick={handleEdit}
          className='flex items-center justify-center h-full px-4 transition-colors rounded opacity-0 text-accent hover:bg-accent hover:text-surface group-hover:opacity-100 '
        >
          <FiEdit className='w-full' size={'20px'} />
        </Link>
        <Link
          onClick={handleDelete}
          className='flex items-center justify-center h-full px-4 transition-colors rounded opacity-0 text-accent hover:bg-accent hover:text-surface group-hover:opacity-100 '
        >
          <FiTrash className='w-full' size={'20px'} />
        </Link> */}
    </>
  );
}
