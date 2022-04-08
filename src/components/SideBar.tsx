import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const SideBarStyles = styled.div`
	background-color: #1c1d2c;
`;

export const SideBar = () => {
	return (
		<SideBarStyles>
			<h1>SideBar</h1>
			<Button>Привет</Button>
		</SideBarStyles>
	);
};
