import React from 'react';
import { SideBar } from '../components/SideBar';
import { ChatBar } from '../components/ChatBar';
import styled from 'styled-components';

const MainPage = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	min-height: 100vh;
	width: 100%;
`;

export const Main = () => {
	return (
		<MainPage>
			<SideBar />
			<ChatBar />
		</MainPage>
	);
};
