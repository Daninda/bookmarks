import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookmarksSlice from './slices/bookmarksSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    bookmarks: bookmarksSlice,
  },
});
