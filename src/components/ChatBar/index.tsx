import React from 'react';
import styled from 'styled-components';
import { Message } from './messages/Message';
import { SendMessage } from './SendMessage';
import { ChatBarHeader } from './ChatBarHeader';
import { observer } from 'mobx-react-lite';
import messagesStore from '../../stores/messagesStore';
import dialgosStore from '../../stores/dialogsStore';
import authStore from '../../stores/authStore';
import socket from '../../core/socket';
import playNotice from '../../utils/helpers/playNotice';
import { Loader } from '../UI/Loader';
import { dialogsItem, messageItem } from '../../types';
import dialogsStore from '../../stores/dialogsStore';

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
	.message__loader {
		position: absolute;
		left: 48%;
		transform: translateX(-50%);
		top: 200px;
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

interface newMessageSocket {
	message: messageItem;
	dialog: dialogsItem;
}
interface deletedMessageSocket {
	message: any;
	lastMsg: messageItem[];
}

export const ChatBar = observer(() => {
	const [searchValue, setSearchValue] = React.useState('');

	React.useEffect(() => {
		socket
			.off('SERVER:NEW_MESSAGE')
			.on('SERVER:NEW_MESSAGE', (obj: newMessageSocket) => {
				dialgosStore.updateLastMessage(obj.dialog, obj.message);
				if (obj.message.user._id !== authStore.user._id) {
					messagesStore.handleNewMessage(obj.message);
					const dialogues = dialgosStore.dialogues;
					let isNewMsg = false;
					dialogues.forEach(dialog => {
						if (
							dialog._id === obj.message.dialog._id &&
							obj.message.dialog._id !==
								dialgosStore.currentDialog?._id
						)
							isNewMsg = true;
					});
					if (
						isNewMsg &&
						obj.message.user._id !== authStore.user._id
					) {
						playNotice();
					}
				}
			});
		socket
			.off('SERVER:DELETE_MESSAGE')
			.on('SERVER:DELETE_MESSAGE', (obj: deletedMessageSocket) => {
				console.log(obj);
				if (obj.lastMsg)
					dialgosStore.updateLastMessage(
						obj.lastMsg[0].dialog,
						obj.lastMsg[0],
					);
				else dialgosStore.updateLastMessage(obj.message);

				if (obj.message.dialog === dialgosStore.currentDialog?._id) {
					messagesStore.deleteMessage(obj.message._id);
				}
			});

		socket
			.off('SERVER:UPDATE_MESSAGE')
			.on('SERVER:UPDATE_MESSAGE', message => {
				if (message.dialog._id === dialgosStore.currentDialog?._id) {
					let iterationIndex = 0;
					let msgIndex = 0;
					messagesStore.currentMessages.forEach(el => {
						if (el._id === message._id) {
							msgIndex = iterationIndex;
						} else {
							iterationIndex = iterationIndex + 1;
						}
					});
					messagesStore.updateMessage(msgIndex, message);
				}
			});
	}, []);

	React.useEffect(() => {
		dialgosStore.currentDialog?._id &&
			messagesStore.fetchMessages(dialgosStore.currentDialog?._id);
	}, [dialgosStore.currentDialog]);

	const filteredMessages =
		searchValue.length > 0
			? messagesStore.currentMessages.filter(
					item =>
						item.text
							?.toLowerCase()
							.includes(searchValue.toLowerCase()) && !item.audio,
			  )
			: messagesStore.currentMessages;

	return (
		<ChatBarStyles>
			<ChatBarHeader
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			{messagesStore.isLoaded ? (
				<div className="message__loader">
					<Loader top="30%" />
				</div>
			) : (
				<div className="messages-box">
					{filteredMessages.length > 0 ? (
						<>
							{filteredMessages.map((el, index) => (
								<Message
									isMe={
										el.user._id !== authStore.user._id
											? false
											: true
									}
									key={index}
									index={index}
									text={el.text}
									date={el.createdAt}
									updatedAt={el.updatedAt}
									user={el.user}
									message_id={el._id}
									updated={el.updated}
								/>
							))}
						</>
					) : !dialgosStore.currentDialog?._id ? (
						<MessageInfo>
							<p>Choose any dialog for contiune</p>
						</MessageInfo>
					) : (
						<MessageInfo>
							<p>The list of messages is empty</p>
						</MessageInfo>
					)}
				</div>
			)}

			<SendMessage />
		</ChatBarStyles>
	);
});
