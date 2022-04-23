import React from 'react';
import styled from 'styled-components';

const ChatBarHeaderStyles = styled.div`
	z-index: 3;
	height: 50px;
	width: 80%;
	position: fixed;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	background-color: #171823;
	div {
		h3 {
			display: block;
			margin: 0 auto;
			max-width: 300px;
			text-align: center;
			font-size: 16px;
			font-weight: 400;
		}
	}
`;

const Status = styled.span`
	text-align: center;
	color: #969696;
	font-weight: 200;
	position: relative;
	display: block;
	width: 70px;
	margin: 0 auto;
	p {
		text-align: center;
	}
	p::before {
		content: '';
		width: 10px;
		height: 10px;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: #5ca8eb;
		border-radius: 50%;
	}
`;

interface ChatBarHeader {}

export const ChatBarHeader: React.FC<ChatBarHeader> = () => {
	return (
		<ChatBarHeaderStyles>
			<div>
				<h3>Петрович</h3>
				<Status>
					<p>online</p>
				</Status>
			</div>
		</ChatBarHeaderStyles>
	);
};
