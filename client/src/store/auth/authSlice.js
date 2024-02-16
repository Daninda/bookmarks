import AuthService from '../../services/AuthService';
import createAppSlice from '../createAppSlice';

export const authSlice = createAppSlice({
	name: 'auth',
	initialState: {
		user: null,
		isAuth: false,
		isAuthLoading: true,
	},
	reducers: create => ({
		register: create.asyncThunk(
			async authData => {
				const res = await AuthService.register(
					authData.email,
					authData.password
				);
				localStorage.setItem('accessToken', res.data.accessToken);
				return res.data.user;
			},
			{
				pending: state => {
					state.isAuthLoading = true;
				},
				fulfilled: (state, action) => {
					state.user = action.payload;
					state.isAuth = true;
					state.isAuthLoading = false;
				},
				rejected: state => {
					state.user = null;
					state.isAuth = false;
					state.isAuthLoading = false;
				},
			}
		),

		login: create.asyncThunk(
			async authData => {
				const res = await AuthService.login(authData.email, authData.password);
				localStorage.setItem('accessToken', res.data.accessToken);
				return res.data.user;
			},
			{
				pending: state => {
					state.isAuthLoading = true;
				},
				fulfilled: (state, action) => {
					state.user = action.payload;
					state.isAuth = true;
					state.isAuthLoading = false;
				},
				rejected: state => {
					state.user = null;
					state.isAuth = false;
					state.isAuthLoading = false;
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
					state.isAuthLoading = true;
				},
				fulfilled: state => {
					state.user = null;
					state.isAuth = false;
					state.isAuthLoading = false;
				},
				rejected: state => {
					state.user = null;
					state.isAuth = false;
					state.isAuthLoading = false;
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
					state.isAuthLoading = true;
				},
				fulfilled: (state, action) => {
					localStorage.setItem('accessToken', action.payload.accessToken);
					state.user = action.payload.user;
					state.isAuth = true;
					state.isAuthLoading = false;
				},
				rejected: state => {
					localStorage.removeItem('accessToken');
					state.user = null;
					state.isAuth = false;
					state.isAuthLoading = false;
				},
			}
		),
	}),
});

export const { register, login, logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;
