import React from 'react';
import styled from 'styled-components';

const LoaderStyle = styled.div<{ width?: string; top?: string }>`
	width: ${props => (props.width ? props.width : '64px')};
	top: ${props => (props.top ? props.top : '0px')};
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
	.lds-ring {
		left: 95%;
		transform: translateX(-50%);
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: ${props => (props.width ? props.width : '64px')};
		height: ${props => (props.width ? props.width : '64px')};
		margin: 8px;
		border: 8px solid #5b5e8d;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #5b5e8d transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

interface LoaderProps {
	width?: string;
	top?: string;
}

export const Loader: React.FC<LoaderProps> = ({ width, top }) => {
	return (
		<LoaderStyle width={width} top={top}>
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</LoaderStyle>
	);
};
