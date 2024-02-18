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
          state.bookmarks.push(action.payload);
          state.isLoading = false;
        },
        rejected: state => {
          state.isLoading = false;
        },
      }
    ),
    update: create.asyncThunk(
      async (data, config) => {
        const elem = config.getState().bookmarks.find(value => {
          value.bookmark_id === data.bookmark_id;
        });
        elem.title = data.title;
        elem.link = data.link;
        elem.description = data.description;

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
        fulfilled: state => {
          state.isLoading = false;
        },
        rejected: state => {
          state.isLoading = false;
        },
      }
    ),

    // delete: create.reducer((state, action) => {
    //   state.bookmarks = state.bookmarks.filter(value => {
    //     return value.bookmark_id !== action.payload.bookmark_id;
    //   });
    // }),

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
          console.log(state.bookmarks);
          state.bookmarks = state.bookmarks.filter(value => {
            return value.bookmark_id != action.payload.bookmark_id;
          });
          console.log(state.bookmarks);
          console.log(action.payload);
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
