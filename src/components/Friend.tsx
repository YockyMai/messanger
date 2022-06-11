import React, { KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dialgosStore from '../stores/dialgosStore';
import { User } from '../types';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Input } from './Input';
import { MyModal } from './UI/MyModal';

const FriendStyle = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	padding: 10px 0;
	&::after {
		content: '';
		width: 100%;
		height: 1px;
		position: absolute;
		background-color: #686868;
		top: 0px;
		left: 0px;
	}
	p {
		color: #a0a0a0;
		margin-left: 5px;
	}
`;

const GoToChat = styled.div`
	position: absolute;
	right: 0px;
	width: 40px;
	height: 30px;
	cursor: pointer;
	svg {
		margin: 0 auto;
		display: block;
		transition: 0.1s;
		path {
			transition: 0.1s;
		}
	}
	&:hover {
		svg {
			transition: 0.1s;
			transform: scale(1.1);
			path {
				transition: 0.1s;
				stroke: #a0a0a0a0;
			}
		}
	}
`;

interface IFriend {
	user: User;
	setSideIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Friend: React.FC<IFriend> = ({ user, setSideIsOpen }) => {
	const [modalIsOpen, setModalOpen] = React.useState(false);
	const [messageValue, setMessageValue] = React.useState('');

	const createChat = () => {
		if (messageValue.length > 0) {
			dialgosStore.createDialog(user._id, messageValue);
			setSideIsOpen(false);
			setModalOpen(false);
		}
	};
	return (
		<FriendStyle>
			<Avatar
				src={user.avatar && user.avatar}
				fullname={user.fullname}
				user_id={user._id}
				width="40px"
				height="40px"
			/>
			<Link to="#">
				<p>{user.fullname}</p>
			</Link>

			<GoToChat onClick={() => setModalOpen(true)}>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<title>Go to {user.fullname} chat</title>
					<path
						d="M12 11H9M12 8V11V8ZM12 11V14V11ZM12 11H15H12Z"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M14 19C17.771 19 19.657 19 20.828 17.828C22 16.657 22 14.771 22 11C22 7.229 22 5.343 20.828 4.172C19.657 3 17.771 3 14 3H10C6.229 3 4.343 3 3.172 4.172C2 5.343 2 7.229 2 11C2 14.771 2 16.657 3.172 17.828C3.825 18.482 4.7 18.771 6 18.898"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M14 19C12.764 19 11.402 19.5 10.159 20.145C8.161 21.182 7.162 21.701 6.67 21.37C6.178 21.04 6.271 20.015 6.458 17.966L6.5 17.5"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			</GoToChat>

			<MyModal
				title={`Write the first message to the user ${user.fullname}`}
				setIsOpen={setModalOpen}
				modalIsOpen={modalIsOpen}>
				<div
					className="modal__sendMsg"
					onKeyDown={(e: KeyboardEvent) => {
						if (e.keyCode === 13) {
							createChat();
						}
					}}>
					<Input
						placeholder="Write a message"
						width="100%"
						type="text"
						value={messageValue}
						setValue={setMessageValue}
					/>
					<Button width="100%" onClick={createChat}>
						Send
					</Button>
				</div>
			</MyModal>
		</FriendStyle>
	);
};
