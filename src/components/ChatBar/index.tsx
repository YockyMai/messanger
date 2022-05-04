import { relative } from 'path';
import React from 'react';
import styled from 'styled-components';
import { AudioMessage } from './messages/AudioMessage';
import { Message } from './messages/Message';
import { SendMessage } from './SendMessage';
import audio from '../../assets/sounds/pamparam.mp3'; //testaudio
import { ChatBarHeader } from './ChatBarHeader';
import { observer } from 'mobx-react-lite';
import messagesStore from '../../stores/messagesStore';
import dialgosStore from '../../stores/dialgosStore';

const ChatBarStyles = styled.div`
	height: 100%;
	width: 100%;
	overflow-y: auto;

	position: relative;
	.messages-box {
		padding-left: 40px;
		padding-top: 80px;
		padding-bottom: 80px;
	}
`;

const MessageInfo = styled.div`
	position: absolute;
	left: 50%;
	top: 30%;
	transform: translateX(-50%);
	p {
		padding: 7px 15px 7px 15px;
		border-radius: 0.6em;
		background-color: #1c1d2c;
		text-align: center;
		color: #969696;
	}
`;

export const ChatBar = observer(() => {
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

	const [searchValue, setSearchValue] = React.useState('');

	const filteredMessages =
		searchValue.length > 0
			? messageData.filter(
					item =>
						item.text
							?.toLowerCase()
							.includes(searchValue.toLowerCase()) && !item.audio,
			  )
			: messageData;

	return (
		<ChatBarStyles>
			<ChatBarHeader
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			<div className="messages-box">
				{filteredMessages.length > 0 ? (
					<>
						{filteredMessages.map((el, index) => (
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
					</>
				) : (
					<MessageInfo>
						<p>No messages found</p>
					</MessageInfo>
				)}
			</div>
			<SendMessage />
		</ChatBarStyles>
	);
});
