import React from 'react';
import styled from 'styled-components';
import imagePatch from '../../../stores/imagePatch';
import { Avatar } from '../../Avatar';
import messageRead from '../../../assets/img/messageRead.svg';
import messageUnread from '../../../assets/img/messageUnread.svg';
import { AudioMessage } from './AudioMessage';
import { observer } from 'mobx-react-lite';
import messagesStore from '../../../stores/messagesStore';
import { ContextMenu } from '../../UI/ContextMenu';
import trashImg from '../../../assets/img/trash.svg';
import { Time } from '../../Time';

const MessageStyles = styled.div<{ isMe: boolean }>`
	display: flex;
	position: relative;
	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
	margin-bottom: 15px;
	.audio-box {
		margin-left: 10px;
		span {
			padding-left: 15px;
			font-weight: 400;
			font-size: 12px;
			color: #a8a8a8;
			margin-right: 10px;
		}
	}
	.message-box {
		position: relative;
		margin-left: 8px;
		border-radius: 0.3em;
		padding: 5px 15px 5px 15px;
		background-color: ${props => (props.isMe ? '#393b5cb2' : '#1c1d2c')};
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		max-width: 50%;
		.checkedMsgImg {
			margin-left: 8px;
		}
		.attachments {
			display: flex;
			flex-wrap: wrap;
			margin-top: 15px;
			justify-content: flex-start;
			max-width: 400px;
			border-radius: 0.5em;
			img {
				transform: 0.3s;
				cursor: pointer;
				margin-left: 10px;
				height: 100px;
				border-radius: 0.3em;
				transform: scale(1);
			}
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
		color: ${props => (props.isMe ? '#8a8a8a' : '#e25c5c')};
	}
`;

const MessageContext = styled.div<{ xCoords: number; yCoords: number }>`
	position: absolute;
	left: ${props => props.xCoords}px;
	top: ${props => props.yCoords}px;
	transform: translate(30%, -105%);
`;

interface MessageProps {
	fullname: string;
	text?: string | undefined;
	date: string;
	isMe?: boolean;
	isReaded?: boolean;
	attachments?: object[] | undefined;
	audio?: string;
	index?: number;
	user_id: string;
}

export const Message: React.FC<MessageProps> = observer(
	({
		fullname,
		text,
		date,
		isMe,
		isReaded,
		attachments,
		audio,
		index,
		user_id,
	}) => {
		const scrollTo = React.useRef<HTMLDivElement>(null);
		const messageEl = React.useRef<HTMLDivElement | null>(null);
		const msgContext = React.useRef<HTMLDivElement | null>(null);

		React.useEffect(() => {
			document.body.addEventListener('click', (e: any) => {
				if (!e.path.includes(msgContext.current)) {
					setContextIsOpen(false);
				}
			});

			document.body.addEventListener('contextmenu', (e: any) => {
				//TODO: fix multiply contexts in msg
				// if (!e.path.includes(msgContext.current)) {
				// 	setContextIsOpen(false);
				// 	console.log('закрыть');
				// }
			});

			scrollTo.current && scrollTo.current.scrollIntoView();
		}, []);

		const openMsgContext = (e: MouseEvent) => {
			e.preventDefault();
			setContextIsOpen(true);
			if (messageEl.current) {
				let targetCoords = messageEl.current.getBoundingClientRect();
				let xCoord = e.clientX - targetCoords.left;
				let yCoord = e.clientY - targetCoords.top;
				setContextCoords([xCoord, yCoord]);
			}
		};

		// const closeContext = (e: MouseEvent) => {};

		const [contextIsOpen, setContextIsOpen] = React.useState(false);
		const [contextCoords, setContextCoords] = React.useState<
			[coordsX: number, coordsY: number]
		>([230, 230]);

		return (
			<MessageStyles
				onContextMenu={e => {
					openMsgContext(e as any);
				}}
				ref={
					messagesStore.currentMessages.length - 1 === index //FIXME: corrected scrolling to last read message
						? scrollTo
						: null
				}
				isMe={isMe ? isMe : false}>
				<Avatar
					fullname={fullname}
					user_id={user_id}
					src="https://avatars.githubusercontent.com/u/75245399?v=4"
					width="50px"
					height="50px"
				/>
				{audio ? (
					<div className="audio-box" ref={audio ? messageEl : null}>
						<AudioMessage audio={audio} />
						<div className="message-info">
							<span>{date}</span>
							<img
								src={isReaded ? messageRead : messageUnread}
								alt="checked message"
								className="checkedMsgImg"
							/>
						</div>
					</div>
				) : text ? (
					<div className="message-box" ref={text ? messageEl : null}>
						<a href="#">
							<h4>{isMe ? 'You' : fullname}</h4>
						</a>
						<div className="message-content">
							{text && <p>{text}</p>}
							<div className={attachments && 'attachments'}>
								{attachments &&
									attachments.map((el: any, index) => (
										<div key={`${index}__${el.src}`}>
											<img
												onClick={() =>
													imagePatch.setImagePatch(
														el.src,
													)
												}
												src={el.src}
											/>
										</div>
									))}
							</div>
						</div>
						<div className="message-info">
							<span>
								<Time time={date} />
							</span>
							<img
								src={isReaded ? messageRead : messageUnread}
								alt="checked message"
								className="checkedMsgImg"
							/>
						</div>
					</div>
				) : (
					<div
						className="file-box"
						ref={!text ? messageEl : null}></div>
				)}

				<MessageContext
					ref={msgContext}
					xCoords={contextCoords[0]}
					yCoords={contextCoords[1]}>
					<ContextMenu isOpen={contextIsOpen}>
						<li className="warning--action">
							<img src={trashImg} alt="trash" />
							<p>Delete ' {text} ' message</p>
						</li>
					</ContextMenu>
				</MessageContext>
			</MessageStyles>
		);
	},
);
