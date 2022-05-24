import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Main } from './pages/Main';
import { Login } from './pages/Login';

const AppWraper = styled.div`
	color: #fff;
	background-color: #171823;
	min-height: 100vh;
	width: 100%;
	a {
		transition: 0.3s;
		color: #949494;
		&:hover {
			color: #ffffff;
			transition: 0.3s;
		}
	}
`;

function App() {
	return (
		<AppWraper>
			<Routes>
				<Route path="/registration" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/im" element={<Main />} />
				<Route path="/" element={<Navigate to="/im" replace />} />
			</Routes>
		</AppWraper>
	);
}

export default App;
