import React from 'react';
import styled from 'styled-components';

const ButtonStyles = styled.button`
	text-decoration: none;
	display: inline-block;
	padding: 10px 30px;
	margin: 10px 20px;
	position: relative;
	overflow: hidden;
	border: 2px solid #383b68;
	border-radius: 8px;
	font-family: 'Montserrat', sans-serif;
	color: #383b68;
	background-color: #ffffff;
	transition: 0.2s ease-in-out;
	cursor: pointer;
	&::before {
		content: '';
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.1),
			rgba(255, 185, 185, 0.5)
		);
		height: 50px;
		width: 50px;
		position: absolute;
		top: -8px;
		left: -75px;
		transform: skewX(-45deg);
	}
	&:hover {
		background: #383b68;
		color: #fff;
	}
	&:hover:before {
		left: 150px;
		transition: 0.5s ease-in-out;
	}
`;

interface ButtonProps {
	children: string;
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
	return <ButtonStyles>{children}</ButtonStyles>;
};
