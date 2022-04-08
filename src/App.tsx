import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Main } from './pages/Main';
import { Registration } from './pages/Registration';

const AppWraper = styled.div`
	color: #fff;
	background-color: #171823;
	min-height: 100vh;
	width: 100%;
	a {
		color: #949494;
	}
`;

function App() {
	return (
		<AppWraper>
			<Routes>
				<Route path="/registration" element={<Registration />} />
				<Route path="/" element={<Main />} />
			</Routes>
		</AppWraper>
	);
}

export default App;
