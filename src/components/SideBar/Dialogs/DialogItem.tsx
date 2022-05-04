import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../Avatar';
import emptyAvatar from '../../../assets/img/emptyAvatar.png';
import { Time } from '../../Time';
import { format, isThisYear, isToday } from 'date-fns';
import dialgosStore from '../../../stores/dialgosStore';
import { observer } from 'mobx-react-lite';

interface DialgosStylesProps {
	user: {
		isOnline: boolean;
	};
	_id: string;
	selectedId: string;
}

const DialogsStyles = styled.div<DialgosStylesProps>`
	cursor: pointer;

	display: flex;
	align-items: center;
	padding: 5px 8px 5px 8px;
	background-color: ${props =>
		props._id == props.selectedId && '#171823'} !important;
	.dialog-avatar {
		position: relative;
		${props =>
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
		background-color: #2a2b3f;
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
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}

		.dialog-other {
			.unreaded-messages {
				text-align: right;
				font-size: 14px;
				font-weight: 200;
				margin-top: 3px;
			}

			.unreaded-messages {
				background-color: #171823;
				border-radius: 1em;
				color: #ffffffdc;
				max-width: 62px;
				float: right;
				padding: 3px 10px 3px 10px;
				p {
					overflow: hidden;
					text-align: center;

					text-overflow: ellipsis;
				}
			}
		}
	}
`;

interface DialogProps {
	_id: string;
	message: {
		user: any;
		text: string;
		created_at: Date;
	};
	unreaded: number;
	setOnSelect: (_id: string) => void;
}

export const DialogItem: React.FC<DialogProps> = observer(
	({ message, unreaded, setOnSelect, _id }) => {
		// const getMessageTime = (created_at: Date) => {
		// 	if (isToday(created_at)) return format(created_at, 'HH:mm'); //Если сообщение написано сегодня
		// 	if (isThisYear(created_at)) return format(created_at, 'd cccc');
		// 	return format(created_at, 'd.MM.Y');
		// };

		return (
			<DialogsStyles
				selectedId={dialgosStore.currentDialog}
				_id={_id}
				user={message.user}
				onClick={() => {
					setOnSelect(_id);
				}}>
				<div className="dialog-avatar">
					<Avatar
						src={
							message.user.avatar
								? message.user.avatar
								: emptyAvatar
						}
						width="50px"
						height="50px"
					/>
				</div>
				<div className="dialog">
					<div className="dialog-info">
						<h4 className="dialog-title">
							{message.user.fullname}
						</h4>
						<p className="dialogs-message">
							{message.text != ''
								? message.text
								: 'Write your first message...'}
						</p>
					</div>
					<div className="dialog-other">
						{/* <Time time={getMessageTime(message.created_at)} /> */}
						{unreaded > 0 && (
							<div className="unreaded-messages">
								{unreaded > 0 && (
									<p>
										{unreaded > 99999 ? '+99999' : unreaded}
									</p>
								)}
							</div>
						)}
					</div>
				</div>
			</DialogsStyles>
		);
	},
);
