import React from 'react';
import styled from 'styled-components';
import volumeMuteSvg from '../../assets/img/volume-mute.svg';
import leaveChatSvg from '../../assets/img/leaveChat.svg';
import pinSvg from '../../assets/img/pin.svg';
import blockSvg from '../../assets/img/block.svg';
import { Search } from '../Search';
import { observer } from 'mobx-react-lite';
import dialgosStore from '../../stores/dialgosStore';

const ChatBarHeaderStyles = styled.div`
	z-index: 1;
	height: 70px;
	width: 75%;
	position: fixed;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	background-color: #171823;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 10px;
	div {
		h3 {
			display: block;
			margin: 0 auto;
			width: max-content;
			font-size: 16px;
			font-weight: 400;
		}
	}
`;

const Status = styled.span`
	text-align: left;
	color: #969696;
	font-weight: 200;
	position: relative;
	display: block;
	width: 100%;
	margin: 0 auto;
	p {
		padding-left: 15px;
	}
	&::before {
		content: '';
		width: 10px;
		height: 10px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background-color: #5ca8eb;
		border-radius: 50%;
	}
`;

const ControlPanelBox = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	width: 100%;
	justify-content: flex-end;
`;

const ControlPanel = styled.div`
	width: 70px;
	height: 100%;
	cursor: pointer;
	&:hover {
		transition: 0.1s;
		span {
			&::before,
			::after {
				background-color: #cccccc;
			}
			background-color: #cccccc;
		}
	}
	div {
		height: 100%;
		span {
			transition: 0.1s;
			position: absolute;
			background-color: #969696;
			width: 5px;
			height: 5px;
			right: 30px;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 50%;
			&::before,
			::after {
				transition: 0.1s;
				content: '';
				width: 5px;
				height: 5px;
				background-color: #969696;
				border-radius: 50%;
				position: absolute;
				right: 0;
			}
			&::before {
				top: -10px;
			}
			&::after {
				bottom: -10px;
			}
		}
	}
`;

const ChatSettingsPopup = styled.div<ChatSettingsPopupProps>`
	${props =>
		props.isOpen
			? `display: block; opacity: 1 !important; transition: 1s all;`
			: 'display: none; opacity: 0;'}
	position: absolute;
	z-index: 1;
	transition: 1s all;
	right: 10px;
	top: 40px;
	width: 200px;
	max-width: 350px;
	height: auto;
	border-radius: 0.3em;
	.leave-chat,
	.block-chat {
		p {
			color: #e25c5c;
		}
	}
	li {
		background-color: #1c1d2c;
		transition: 0.1s;
		padding: 5px 0 5px 10px;
		list-style-type: none;
		font-weight: 200;
		display: flex;
		align-items: center;
		cursor: pointer;
		&:hover {
			transition: 0.1s;
			background-color: #27293d;
		}
		img {
			margin-right: 10px;
			width: 20px;
		}
	}
`;

interface ChatSettingsPopupProps {
	isOpen: boolean;
}

interface ChatBarHeader {
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	searchValue: string;
}

export const ChatBarHeader: React.FC<ChatBarHeader> = observer(
	({ setSearchValue, searchValue }) => {
		const [isOpen, setIsOpen] = React.useState(false);
		const chatSettingsPopup = React.useRef(null);

		React.useEffect(() => {
			document.body.addEventListener('click', handleOutsideClick);
		}, []);

		const handleOutsideClick = (e: any) => {
			if (!e.path.includes(chatSettingsPopup.current) && !isOpen) {
				setIsOpen(false);
			}
		};

		const username = dialgosStore.dialogues.find(
			el => el._id === dialgosStore.currentDialog,
		)?.message.user.fullname;

		return (
			<ChatBarHeaderStyles>
				<div>
					<h3>{username}</h3>
					<Status>
						<p>online</p>
					</Status>
				</div>

				<ControlPanelBox>
					<div>
						<Search
							value={searchValue}
							setValue={setSearchValue}
							height="40px"
							width="300px"
							focusWidth="500px"
							bgColor="#1C1D2C"
							placeholder="Chat Search"
						/>
					</div>

					<ControlPanel ref={chatSettingsPopup}>
						<div
							onClick={() => {
								setIsOpen(!isOpen);
							}}>
							<span />
						</div>

						<ChatSettingsPopup isOpen={isOpen}>
							<li>
								<img src={volumeMuteSvg} alt="" /> <p>Mute</p>
							</li>
							<li>
								<img src={pinSvg} alt="" /> <p>Pin</p>
							</li>
							<li className="block-chat">
								<img src={blockSvg} alt="" /> <p>Block user</p>
							</li>
							<li className="leave-chat">
								<img src={leaveChatSvg} alt="" /> <p>Leave</p>
							</li>
						</ChatSettingsPopup>
					</ControlPanel>
				</ControlPanelBox>
			</ChatBarHeaderStyles>
		);
	},
);
