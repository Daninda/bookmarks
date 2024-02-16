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
	}),
});

export const { getAll } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
