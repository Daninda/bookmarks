import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import Tools from '../components/Tools';
import { deleteOne, getAll, update } from '../store/bookmarks/bookmarksSlice';

export default function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
  });

  const bookmarks = useSelector(state => state.bookmarks.bookmarks);

  function filter(search, option) {
    console.log(search, option);
    return;
  }

  return (
    <div>
      <Tools filter={filter} />
      {bookmarks == 0 ? (
        <p className='mt-8 text-center text-gray'>Здесь пусто...</p>
      ) : (
        <div className='grid grid-cols-1 gap-3 my-4 md:grid-cols-2 '>
          {bookmarks.map(item => {
            return (
              <Card
                key={item.bookmark_id}
                title={item.title}
                link={item.link}
                tags={[
                  { tag_id: 1, title: 'Первый' },
                  { tag_id: 2, title: 'Второй' },
                  { tag_id: 3, title: 'Третий' },
                  { tag_id: 4, title: 'Третий' },
                ]}
                handleEdit={() => {
                  dispatch(
                    update({
                      bookmark_id: item.bookmark_id,
                      title: '123',
                      link: '123',
                      description: 'lol',
                    })
                  );
                }}
                handleDelete={() => {
                  dispatch(deleteOne({ bookmark_id: item.bookmark_id }));
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
