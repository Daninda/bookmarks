import CardMenu from './CardMenu';

export default function Card({
  bookmark_id,
  title,
  link,
  create_at,
  tags,
  handleEdit,
  handleDelete,
}) {
  const date =
    new Date(+create_at).toLocaleDateString() === new Date().toLocaleDateString()
      ? new Date(+create_at).toLocaleTimeString('ru', {
          hour: 'numeric',
          minute: 'numeric',
        })
      : new Date(+create_at).toLocaleString('ru', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });

  return (
    <div className='flex items-center justify-between transition-shadow rounded shadow-md group hover:shadow-lg bg-surface'>
      <a
        className='flex flex-col w-full h-full p-4 overflow-hidden outline-none cursor-pointer'
        href={
          link.includes('https://') ? link : link.includes('http://') ? link : 'https://' + link
        }
        target='_blank'
      >
        <div className='flex-grow'>
          <h1 className='block overflow-hidden font-medium overflow-ellipsis'>{title}</h1>
          <p className='block py-2 overflow-hidden text-xs text-textGray overflow-ellipsis whitespace-nowrap'>
            {link}
          </p>
        </div>
        {!tags.length ? (
          <></>
        ) : (
          <div className='flex flex-wrap gap-1 mt-2'>
            {tags.map(item => {
              return (
                <p
                  key={item.tag_id}
                  className='block px-1 py-1 text-xs font-medium transition-colors cursor-pointer text-accent '
                >
                  {item.title}
                </p>
              );
            })}
          </div>
        )}
      </a>
      <div className='flex flex-col items-end justify-between h-full'>
        <CardMenu
          handeEdit={handleEdit}
          handleDelete={handleDelete}
          bookmark={{ bookmark_id, title, link, create_at, tags }}
        />
        <p className='m-5 text-xs text-gray'>{date}</p>
      </div>
    </div>
  );
}
