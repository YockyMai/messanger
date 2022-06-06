import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes, RouteNames } from '../router';
import authStore from '../stores/authStore';

export const AppRouter = observer(() => {
	React.useEffect(() => {
		authStore.getUser();
	});
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
						path={'*'}
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
