import React from 'react';
import styled from 'styled-components';
import { Avatar } from './Avatar';
import messageRead from '../assets/img/messageRead.svg';
import messageUnread from '../assets/img/messageUnread.svg';

interface MessageProps {
	username: string;
	text: string;
	date: string;
	isMe?: boolean;
	isReaded?: boolean;
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
	.message-box {
		position: relative;
		margin-left: 8px;
		border-radius: 0.3em;
		padding: 5px 15px 5px 15px;
		background-color: ${(props) => (props.isMe ? '#393b5cb2' : '#1c1d2c')};
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		max-width: 50%;
		.checkedMsgImg {
			margin-left: 8px;
		}

		p {
			padding-top: 5px;
			font-weight: 200;
			max-width: 600px;
		}
		span {
			font-weight: 400;
			font-size: 12px;
			color: #a8a8a8;
		}
	}
	h4 {
		color: ${(props) => (props.isMe ? '#8a8a8a' : '#e25c5c')};
	}
`;

export const Message: React.FC<MessageProps> = ({
	username,
	text,
	date,
	isMe,
	isReaded,
}) => {
	return (
		<MessageStyles isMe={isMe || false}>
			<Avatar
				src="https://avatars.githubusercontent.com/u/75245399?v=4"
				width="50px"
				height="50px"
			/>
			<div className="message-box">
				<a href="#">
					<h4>{isMe ? 'You' : username}</h4>
				</a>
				<div className="message-content">
					<p>{text}</p>
					<div></div>
				</div>
				<div className="message-info">
					<span>{date}</span>
					<img
						src={isReaded ? messageRead : messageUnread}
						alt="checked message"
						className="checkedMsgImg"
					/>
				</div>
			</div>
		</MessageStyles>
	);
};
