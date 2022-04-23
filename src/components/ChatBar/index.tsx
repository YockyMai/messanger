import { relative } from 'path';
import React from 'react';
import styled from 'styled-components';
import { AudioMessage } from './messages/AudioMessage';
import { Message } from './messages/Message';
import { SendMessage } from './SendMessage';
import audio from '../../assets/sounds/pamparam.mp3'; //testaudio
import { ChatBarHeader } from './ChatBarHeader';

const ChatBarStyles = styled.div`
	height: 100%;
	width: 100%;
	overflow-y: auto;
	.messages-box {
		padding-left: 40px;
		padding-top: 80px;
		padding-bottom: 80px;
	}
`;

export const ChatBar = () => {
	const messageData = [
		{
			text: 'Жигуль купил на днях, что за аппарат!',
			date: '11.08.2003',
			username: 'Данир',
			isReaded: true,
			attachments: [
				{
					filename: 'image.jpg',
					src: 'https://sun9-15.userapi.com/impf/c638619/v638619462/15436/Wnw_NvpgzwY.jpg?size=1280x960&quality=96&sign=8cba5477e99bead50b2a4b43b80ac48b&type=album',
				},
			],
		},
		{
			date: '11.08.2003',
			username: 'Петрович',
			isReaded: true,
			audio: audio,
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
		{
			text: 'Жигуль купил на днях, что за аппарат!',
			date: '11.08.2003',
			username: 'Данир',
			isReaded: true,
			attachments: [
				{
					filename: 'image.jpg',
					src: 'https://sun9-15.userapi.com/impf/c638619/v638619462/15436/Wnw_NvpgzwY.jpg?size=1280x960&quality=96&sign=8cba5477e99bead50b2a4b43b80ac48b&type=album',
				},
			],
		},
		{
			date: '11.08.2003',
			username: 'Петрович',
			isReaded: true,
			audio: audio,
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
			<ChatBarHeader />
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
						audio={el.audio}
					/>
				))}
			</div>
			<SendMessage />
		</ChatBarStyles>
	);
};
