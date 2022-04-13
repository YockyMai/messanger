import { relative } from 'path';
import React from 'react';
import styled from 'styled-components';
import { Message } from './Message';
import { SendMessage } from './SendMessage';

const ChatBarStyles = styled.div`
	position: relative;
	.messages-box {
		padding-left: 40px;
		padding-top: 15px;
	}
`;

export const ChatBar = () => {
	const messageData = [
		{
			text: 'Жигуль купил на днях, что за аппарат!',
			date: '11.08.2003',
			username: 'Абема',
		},
		{ text: 'Всем хай!', date: '11.08.2003', username: 'Петрович' },
		{
			text: 'Это текст моего сообщения!',
			date: '12.08.2003',
			username: 'Valeriy Grigorev',
			isMe: true,
		},
	];

	return (
		<ChatBarStyles>
			<div className="messages-box">
				{messageData.map((el, index) => (
					<Message
						key={index}
						text={el.text}
						date={el.date}
						username={el.username}
						isMe={el.isMe}
					/>
				))}
			</div>

			<SendMessage />
		</ChatBarStyles>
	);
};
