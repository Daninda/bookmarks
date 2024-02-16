import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import bookmarksSlice from './bookmarks/bookmarksSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		bookmarks: bookmarksSlice,
	},
});
