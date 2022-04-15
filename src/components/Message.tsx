import React from 'react';
import styled from 'styled-components';
import { Avatar } from './Avatar';
import messageRead from '../assets/img/messageRead.svg';
import messageUnread from '../assets/img/messageUnread.svg';

interface MessageProps {
	username: string;
	text: string;
	date: string;
	isMe?: boolean;
	isReaded?: boolean;
	attachments: object[] | undefined;
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
	.message-box {
		position: relative;
		margin-left: 8px;
		border-radius: 0.3em;
		padding: 5px 15px 5px 15px;
		background-color: ${(props) => (props.isMe ? '#393b5cb2' : '#1c1d2c')};
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

			.zoomed {
				right: 0;
				position: absolute;
				transition: 0.3s;
				transform: scale(5);
				z-index: 1;
			}
			img {
				transform: 0.3s;
				cursor: pointer;
				margin-left: 10px;
				width: 100px;
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
		color: ${(props) => (props.isMe ? '#8a8a8a' : '#e25c5c')};
	}
`;

export const Message: React.FC<MessageProps> = ({
	username,
	text,
	date,
	isMe,
	isReaded,
	attachments,
}) => {
	const [select, setSelect] = React.useState<number | null>(null);
	const selectedImg = React.useRef<HTMLImageElement>(null);

	React.useEffect(() => {});

	const handleImageClock = (e: MouseEvent, index: number) => {
		if (e.target !== selectedImg.current && select != null) {
			setSelect(null);
		} else {
			setSelect(index);
		}
	};

	return (
		<MessageStyles isMe={isMe || false}>
			<Avatar
				src="https://avatars.githubusercontent.com/u/75245399?v=4"
				width="50px"
				height="50px"
			/>
			<div className="message-box">
				<a href="#">
					<h4>{isMe ? 'You' : username}</h4>
				</a>
				<div className="message-content">
					<p>{text}</p>
					<div className={attachments && 'attachments'}>
						{attachments &&
							attachments.map((el: any, index) => (
								<div key={`${index}__${el.src}`}>
									<img
										ref={selectedImg}
										onClick={() =>
											handleImageClock(el, index)
										}
										className={
											index === select ? 'zoomed' : ''
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
		</MessageStyles>
	);
};
