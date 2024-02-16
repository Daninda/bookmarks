import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import PageLoader from './pages/PageLoader';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { checkAuth } from './store/auth/authSlice';

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.auth.isAuth);
	const isAuthLoading = useSelector(state => state.auth.isAuthLoading);

	useEffect(() => {
		dispatch(checkAuth());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isAuthLoading) {
		return <PageLoader />;
	} else {
		return (
			<>
				{isAuth ? (
					<>
						<Routes>
							<Route element={<Layout />}>
								{PrivateRoute.map(value => {
									return (
										<Route
											key={value.path}
											path={value.path}
											Component={value.component}
										/>
									);
								})}
							</Route>
							<Route path='*' element={<Navigate to='/' replace={true} />} />
						</Routes>
					</>
				) : (
					<>
						<Routes>
							{PublicRoute.map(value => {
								return (
									<Route
										key={value.path}
										path={value.path}
										Component={value.component}
									/>
								);
							})}
							<Route
								path='*'
								element={<Navigate to='/login' replace={true} />}
							/>
						</Routes>
					</>
				)}
			</>
		);
	}
}

export default App;
