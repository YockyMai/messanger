import React from 'react';
import styled from 'styled-components';
import { Message } from './messages/Message';
import { SendMessage } from './SendMessage';
import { ChatBarHeader } from './ChatBarHeader';
import { observer } from 'mobx-react-lite';
import messagesStore from '../../stores/messagesStore';
import { Loader } from '../UI/Loader';
import dialgosStore from '../../stores/dialgosStore';
import authStore from '../../stores/authStore';

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
	const [searchValue, setSearchValue] = React.useState('');
	const [contextIsOpen, setContextIsOpen] = React.useState(false);

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
								user_id={el.user._id}
								fullname={el.user.fullname}
							/>
						))}
					</>
				) : (
					<MessageInfo>
						<p>Choose dialog for continue</p>
					</MessageInfo>
				)}
			</div>
			<SendMessage />
		</ChatBarStyles>
	);
});
