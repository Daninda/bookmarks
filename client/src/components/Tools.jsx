import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTags } from '../store/bookmarks/bookmarksSlice';
import CreateCard from './CreateCard';
import Search from './Search';
import Selector from './Selector';

export default function Tools({ filter }) {
  const [option, setOption] = useState(null);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTags());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = useSelector(state => state.bookmarks.tags).map(value => {
    return { value: value.tag_id, label: value.title };
  });

  useEffect(() => {
    console.log(search, option);
    filter(search, option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, option]);

  return (
    <>
      <div>
        <CreateCard />
        <div className='flex flex-col justify-between gap-4 mt-4 md:flex-row'>
          <Search className='md:w-80' search={search} setSearch={setSearch} />
          <Selector option={option} options={options} setOption={setOption} />
        </div>
      </div>
    </>
  );
}
