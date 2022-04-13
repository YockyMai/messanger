import React from 'react';
import styled from 'styled-components';

interface SendMessageProps {}

const SendMessageStyle = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	input {
		height: 50px;
		width: 100%;
		border: 0;
		font-size: 18px;
		padding: 5px 15px 5px 30px;
		background-color: #1c1d2c;
		color: #fff;
		box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
		font-weight: 200;
		&:focus {
			outline: none;
		}
	}
`;

export const SendMessage: React.FC<SendMessageProps> = () => {
	const [message, setMessage] = React.useState('');

	return (
		<SendMessageStyle>
			<input placeholder="Write a message..." />
		</SendMessageStyle>
	);
};
