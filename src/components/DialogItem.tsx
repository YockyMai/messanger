import React from 'react';
import styled from 'styled-components';
import { Avatar } from './Avatar';
import emptyAvatar from '../assets/img/emptyAvatar.png';

interface DialgosStylesProps {
	user: {
		isOnline: boolean;
	};
}

const DialogsStyles = styled.div<DialgosStylesProps>`
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 5px 8px 5px 8px;
	.dialog-avatar {
		position: relative;
		${(props) =>
			props.user.isOnline
				? `&::before {
			position: absolute;
			z-index: 1;
			content: '';
			bottom: 6px;
			right: 0;
			background-color: #5ca8eb;
			border-radius: 50%;
			border: 4px solid #1c1d2c;
			height: 9px;
			width: 9px;
		}`
				: ``}
	}
	&:hover {
		background-color: #171823;
	}
	.dialog {
		padding-left: 10px;
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
		.dialog-info {
			max-width: 330px;
			.dialog-title {
				font-weight: 400;
			}
			.dialogs-message {
				font-size: 16px;
				font-weight: 200;
				color: #d6d6d6;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}

		.dialog-other {
			.time,
			.unreaded-messages {
				text-align: right;
				font-size: 14px;
				font-weight: 200;
				margin-top: 3px;
			}
			.time {
				color: #8e8a9c;
			}
			.unreaded-messages {
				background-color: #171823;
				border-radius: 1em;
				color: #ffffffdc;
				max-width: 62px;
				p {
					overflow: hidden;
					text-align: center;
					padding: 3px 5px 3px 5px;
					text-overflow: ellipsis;
				}
			}
		}
	}
`;

interface DialogProps {
	user: any;
	message?: string;
	unreaded: number;
}

export const DialogItem: React.FC<DialogProps> = ({
	user,
	message,
	unreaded,
}) => {
	return (
		<DialogsStyles user={user}>
			<div className="dialog-avatar">
				<Avatar
					src={user.avatar ? user.avatar : emptyAvatar}
					width="50px"
					height="50px"
				/>
			</div>

			<div className="dialog">
				<div className="dialog-info">
					<h4 className="dialog-title">{user.fullname}</h4>
					<p className="dialogs-message">
						{message != ''
							? message
							: 'Write your first message...'}
					</p>
				</div>
				<div className="dialog-other">
					<p className="time">12:11</p>
					<div className="unreaded-messages">
						{unreaded > 0 && <p>{unreaded}</p>}
					</div>
				</div>
			</div>
		</DialogsStyles>
	);
};
