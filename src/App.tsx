import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Main } from './pages/Main';
import { Registration } from './pages/Registration';
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
				<Route path="/registration" element={<Registration />} />
				<Route path="/im" element={<Main />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</AppWraper>
	);
}

export default App;
