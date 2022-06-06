import React from 'react';
import styled from 'styled-components';

const ButtonStyles = styled.button<{
	height?: string;
	width?: string;
	isLoading?: boolean;
}>`
	position: relative;
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
	background-color: ${props => (props.isLoading ? '#383b68' : '#ffffff')};
	transition: 0.2s ease-in-out;
	height: ${props => props.height && props.height};
	width: ${props => props.width && props.width};
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
		left: ${props => !props.isLoading && '150px'};
		transition: 0.5s ease-in-out;
	}
	p {
		font-weight: 800;
	}
`;

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	height?: string;
	width?: string;
	isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	height,
	width,
	isLoading,
}) => {
	return (
		<ButtonStyles
			width={width}
			height={height}
			isLoading={isLoading}
			onClick={e => {
				e.preventDefault();
				onClick && onClick();
			}}>
			<p>{children}</p>
		</ButtonStyles>
	);
};
