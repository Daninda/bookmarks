import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Card({ title, link, tags, handleEdit, handleDelete }) {
  return (
    <div className='flex items-center justify-between overflow-hidden transition-transform rounded shadow-md group hover:scale-[102%] bg-surface'>
      <a
        className='block w-full p-4 overflow-hidden outline-none cursor-pointer'
        href={
          link.includes('https://')
            ? link
            : link.includes('http://')
            ? link
            : 'https://' + link
        }
        target='_blank'
      >
        <h1 className='block overflow-hidden font-medium overflow-ellipsis'>
          {title}
        </h1>
        <p className='block py-2 overflow-hidden text-xs text-textGray overflow-ellipsis whitespace-nowrap'>
          {link}
        </p>
        <div className='flex flex-wrap gap-2 mt-4'>
          {tags.map(item => {
            return (
              <p
                key={item.tag_id}
                className='block px-2 py-1 text-xs transition-colors cursor-pointer text-accent '
              >
                {item.title}
              </p>
            );
          })}
        </div>
      </a>
      <div className='flex flex-col h-full'>
        <Link
          onClick={handleEdit}
          className='flex items-center justify-center h-full px-4 transition-colors opacity-0 text-accent hover:bg-accent hover:text-surface group-hover:opacity-100 '
        >
          <FiEdit className='w-full' size={'20px'} />
        </Link>
        <Link
          onClick={handleDelete}
          className='flex items-center justify-center h-full px-4 transition-colors opacity-0 text-accent hover:bg-accent hover:text-surface group-hover:opacity-100 '
        >
          <FiTrash className='w-full' size={'20px'} />
        </Link>
      </div>
    </div>
  );
}
