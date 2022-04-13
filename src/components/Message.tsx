import React from 'react';
import styled from 'styled-components';
import { Avatar } from './Avatar';

interface MessageProps {
	username: string;
	text: string;
	date: string;
	isMe?: boolean;
}

interface MessageStylesProps {
	isMe: boolean;
}

const MessageStyles = styled.div<MessageStylesProps>`
	display: flex;
	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
	margin-bottom: 15px;
	.message-content {
		position: relative;
		margin-left: 8px;
		border-radius: 0.3em;
		padding: 5px 15px 5px 15px;

		background-color: ${(props) => (props.isMe ? '#393b5cb2' : '#1c1d2c')};
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		max-width: 50%;
		p {
			padding-top: 5px;
			display: inline;
			font-weight: 200;
		}
		span {
			font-weight: 400;
			margin-left: 5px;
			font-size: 12px;
			color: #a8a8a8;
		}
	}
	h4 {
		color: #e25c5c;
	}
`;

export const Message: React.FC<MessageProps> = ({
	username,
	text,
	date,
	isMe,
}) => {
	return (
		<MessageStyles isMe={isMe || false}>
			<Avatar
				src="https://avatars.githubusercontent.com/u/75245399?v=4"
				width="50px"
				height="50px"
			/>
			<div className="message-content">
				<a href="#">
					<h4>{isMe ? 'You' : username}</h4>
				</a>
				<p>{text}</p>
				<span>{date}</span>
			</div>
		</MessageStyles>
	);
};
