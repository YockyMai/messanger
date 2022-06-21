import React from 'react';
import { SideBar } from '../components/SideBar';
import { ChatBar } from '../components/ChatBar';
import styled from 'styled-components';
import { ViewImage } from '../components/ViewImage';

const MainPage = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	min-height: 100vh;
`;

export const Main = () => {
	return (
		<MainPage>
			<SideBar />
			<ChatBar />
			<ViewImage />
		</MainPage>
	);
};
