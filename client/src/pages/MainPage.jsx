import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import Tools from '../components/Tools';
import { deleteOne, getAll } from '../store/bookmarks/bookmarksSlice';

export default function MainPage() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getAll());
  }, []);

  const bookmarks = useSelector(state => state.bookmarks.bookmarks);

  function filter(search, option) {
    return;
  }

  return (
    <div>
      <Tools filter={filter} />
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
              handleEdit={() => {}}
              handleDelete={() => {
                console.log('delete');
                dispatch(deleteOne({ bookmark_id: item.bookmark_id }));
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
