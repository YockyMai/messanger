import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes, RouteNames } from '../router';
import authStore from '../stores/authStore';

export const AppRouter = observer(() => {
	return (
		<div>
			{authStore.isAuth ? (
				<Routes>
					{privateRoutes.map(route => (
						<Route
							key={route.path}
							element={<route.component />}
							path={route.path}
						/>
					))}

					<Route
						element={<Navigate to={RouteNames.IM} replace />}
						path={RouteNames.LOGIN}
					/>

					<Route
						element={<Navigate to={RouteNames.IM} replace />}
						path={RouteNames.REGISTRATION}
					/>
				</Routes>
			) : (
				<Routes>
					{publicRoutes.map(route => (
						<Route
							key={route.path}
							element={<route.component />}
							path={route.path}
						/>
					))}
					<Route
						element={
							<Navigate to={RouteNames.REGISTRATION} replace />
						}
						path={'*'}
					/>
				</Routes>
			)}
		</div>
	);
});
