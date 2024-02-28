import AuthService from '../../services/AuthService';
import createAppSlice from '../createAppSlice';

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuth: false,
    checkAuthLoading: true,
    errorMessage: '',
  },
  reducers: create => ({
    setError: create.reducer((state, action) => {
      state.errorMessage = action.payload;
    }),

    register: create.asyncThunk(
      async (authData, config) => {
        try {
          const res = await AuthService.register(
            authData.email,
            authData.password
          );
          localStorage.setItem('accessToken', res.data.accessToken);
          return res.data.user;
        } catch (error) {
          throw config.rejectWithValue(error.response.data.message);
        }
      },
      {
        pending: state => {
          state.errorMessage = '';
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
          state.isAuth = true;
          state.errorMessage = '';
        },
        rejected: (state, action) => {
          state.errorMessage = action.payload;
          state.user = null;
          state.isAuth = false;
        },
      }
    ),

    login: create.asyncThunk(
      async (authData, config) => {
        try {
          const res = await AuthService.login(
            authData.email,
            authData.password
          );
          localStorage.setItem('accessToken', res.data.accessToken);
          return res.data.user;
        } catch (error) {
          throw config.rejectWithValue(error.response.data.message);
        }
      },
      {
        pending: state => {
          state.errorMessage = '';
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
          state.isAuth = true;
          state.errorMessage = '';
        },
        rejected: (state, action) => {
          state.errorMessage = action.payload;
          state.user = null;
          state.isAuth = false;
        },
      }
    ),

    logout: create.asyncThunk(
      async () => {
        const res = await AuthService.logout();
        localStorage.removeItem('accessToken');
        return res.data;
      },
      {
        pending: state => {
          state.errorMessage = '';
        },
        fulfilled: state => {
          state.user = null;
          state.isAuth = false;
        },
        rejected: state => {
          state.user = null;
          state.isAuth = false;
        },
      }
    ),

    checkAuth: create.asyncThunk(
      async () => {
        const res = await AuthService.refresh();
        return res.data;
      },
      {
        pending: state => {
          state.checkAuthLoading = true;
          state.errorMessage = '';
        },
        fulfilled: (state, action) => {
          localStorage.setItem('accessToken', action.payload.accessToken);
          state.user = action.payload.user;
          state.isAuth = true;
          state.checkAuthLoading = false;
        },
        rejected: state => {
          localStorage.removeItem('accessToken');
          state.user = null;
          state.isAuth = false;
          state.checkAuthLoading = false;
        },
      }
    ),
  }),
});

export const { setError, register, login, logout, checkAuth } =
  authSlice.actions;

export default authSlice.reducer;
