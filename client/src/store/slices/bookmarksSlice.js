import BookmarkService from '../../services/BookmarkService';
import createAppSlice from '../createAppSlice';

export const bookmarksSlice = createAppSlice({
  name: 'bookmarks',
  initialState: {
    bookmarks: [],
    tags: [],
    isLoading: false,
  },

  reducers: create => ({
    getAll: create.asyncThunk(
      async () => {
        const res = await BookmarkService.getAll();
        return res.data;
      },
      {
        pending: state => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.bookmarks = action.payload;
          state.isLoading = false;
        },
        rejected: state => {
          state.isLoading = false;
        },
      }
    ),

    getAllTags: create.asyncThunk(
      async () => {
        const res = await BookmarkService.getAllTags();
        return res.data;
      },
      {
        pending: state => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.tags = action.payload;
          state.isLoading = false;
        },
        rejected: state => {
          state.isLoading = false;
        },
      }
    ),

    create: create.asyncThunk(
      async (data, config) => {
        const res = await BookmarkService.create(
          data.title,
          data.link,
          data.description,
          data.tags
        );
        config.dispatch(getAllTags());
        return res.data;
      },
      {
        pending: state => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.bookmarks.unshift(action.payload);
          state.isLoading = false;
        },
        rejected: state => {
          state.isLoading = false;
        },
      }
    ),
    update: create.asyncThunk(
      async (data, config) => {
        const res = await BookmarkService.update(
          data.bookmark_id,
          data.title,
          data.link,
          data.description,
          data.tags
        );
        config.dispatch(getAll());
        config.dispatch(getAllTags());
        return res.data;
      },
      {
        pending: state => {
          state.isLoading = true;
        },
        fulfilled: state => {
          state.isLoading = false;
        },
        rejected: state => {
          state.isLoading = false;
        },
      }
    ),

    deleteOne: create.asyncThunk(
      async (data, config) => {
        const res = await BookmarkService.delete(data.bookmark_id);
        config.dispatch(getAllTags());
        return res.data;
      },
      {
        pending: state => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.bookmarks = state.bookmarks.filter(value => {
            return value.bookmark_id != action.payload.bookmark_id;
          });
          state.isLoading = false;
        },
        rejected: state => {
          state.isLoading = false;
        },
      }
    ),
  }),
});

export const { getAll, getAllTags, create, update, deleteOne } =
  bookmarksSlice.actions;

export default bookmarksSlice.reducer;
