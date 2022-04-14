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
			username: 'Данир',
			isReaded: true,
		},
		{
			text: 'Всем хай!',
			date: '11.08.2003',
			username: 'Петрович',
			isReaded: true,
		},
		{
			text: 'Это текст моего сообщения!',
			date: '12.08.2003',
			username: 'Valeriy Grigorev',
			isMe: true,
			attachments: [
				{
					filename: 'image.jpg',
					src: 'https://kartinkin.net/uploads/posts/2021-10/1635257762_46-kartinkin-net-p-pop-art-gerl-krasivo-48.jpg',
				},
				{
					filename: 'image.jpg',
					src: 'https://avatars.mds.yandex.net/get-mpic/5257755/img_id7027421520302227778.jpeg/orig',
				},
				{
					filename: 'image.jpg',
					src: 'https://i.imgur.com/geX7lBe.jpg',
				},
			],
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
						isReaded={el.isReaded}
						attachments={el.attachments}
					/>
				))}
			</div>

			<SendMessage />
		</ChatBarStyles>
	);
};
