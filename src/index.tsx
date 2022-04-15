import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const GlobalStyles = createGlobalStyle`
	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: 'Nunito', sans-serif;
	}
`;

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<GlobalStyles />
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);
