import React from 'react';
import styled from 'styled-components';
import imagePatch from '../../../stores/imagePatch';
import { Avatar } from '../../Avatar';
import messageRead from '../../../assets/img/messageRead.svg';
import messageUnread from '../../../assets/img/messageUnread.svg';
import { AudioMessage } from './AudioMessage';
import { observer } from 'mobx-react-lite';
interface MessageProps {
	fullname: string;
	text?: string | undefined;
	date: string;
	isMe?: boolean;
	isReaded?: boolean;
	attachments?: object[] | undefined;
	audio?: string;
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

export const Message: React.FC<MessageProps> = observer(
	({ fullname, text, date, isMe, isReaded, attachments, audio }) => {
		React.useEffect(() => {});

		return (
			<MessageStyles isMe={isMe || false}>
				<Avatar
					src="https://avatars.githubusercontent.com/u/75245399?v=4"
					width="50px"
					height="50px"
				/>
				{audio ? (
					<div className="audio-box">
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
					<div className="message-box">
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
							<span>{date}</span>
							<img
								src={isReaded ? messageRead : messageUnread}
								alt="checked message"
								className="checkedMsgImg"
							/>
						</div>
					</div>
				) : (
					<div className="file-box"></div>
				)}
			</MessageStyles>
		);
	},
);
