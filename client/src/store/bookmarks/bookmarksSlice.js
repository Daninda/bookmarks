import BookmarkService from '../../services/BookmarkService';
import createAppSlice from '../createAppSlice';

export const bookmarksSlice = createAppSlice({
  name: 'bookmarks',
  initialState: {
    bookmarks: [],
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

    create: create.asyncThunk(
      async data => {
        const res = await BookmarkService.create(
          data.title,
          data.link,
          data.description
        );
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
      async data => {
        const res = await BookmarkService.update(
          data.bookmark_id,
          data.title,
          data.link,
          data.description
        );
        return res.data;
      },
      {
        pending: state => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.bookmarks.forEach((value, index) => {
            if (value.bookmark_id === action.payload.bookmark_id) {
              state.bookmarks[index].title = action.payload.title;
              state.bookmarks[index].link = action.payload.link;
            }
          });
          state.isLoading = false;
        },
        rejected: state => {
          state.isLoading = false;
        },
      }
    ),

    deleteOne: create.asyncThunk(
      async data => {
        const res = await BookmarkService.delete(data.bookmark_id);
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

export const { getAll, create, update, deleteOne } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
