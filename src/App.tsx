import React from 'react';
import styled from 'styled-components';
import { AppRouter } from './components/AppRouter';
import authStore from './stores/authStore';
import socket from './core/socket';
import dialogsStore from './stores/dialogsStore';

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
	React.useEffect(() => {
		authStore.getUser();
	}, []);

	return (
		<AppWraper>
			<AppRouter />
		</AppWraper>
	);
}

export default App;
