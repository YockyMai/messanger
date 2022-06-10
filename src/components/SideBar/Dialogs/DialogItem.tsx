import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../Avatar';
import emptyAvatar from '../../../assets/img/emptyAvatar.png';
import { Time } from '../../Time';
import { format, isThisYear, isToday, parseISO } from 'date-fns';
import dialgosStore from '../../../stores/dialgosStore';
import { observer } from 'mobx-react-lite';
import { dialogsItem, User } from '../../../types';
import messagesStore from '../../../stores/messagesStore';

interface DialgosStylesProps {
	isOnline: boolean;
	_id: string;
	selectedId?: string;
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
			props.isOnline
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
	setOnSelect: (dialogItem: dialogsItem) => void;
	message?: string;
	partner: User;
	author: User;
	createdAt: string;
	_id: string;
	updatedAt: string;
	unreaded: number;
}

export const DialogItem: React.FC<DialogProps> = observer(
	({
		partner,
		setOnSelect,
		_id,
		unreaded,
		message,
		author,
		createdAt,
		updatedAt,
	}) => {
		const getMessageTime = (created_at: string) => {
			if (isToday(parseISO(created_at)))
				return format(parseISO(created_at), 'HH:mm'); //Если сообщение написано сегодня
			if (isThisYear(parseISO(created_at)))
				return format(parseISO(created_at), 'd cccc');
			return format(parseISO(created_at), 'd.MM.Y');
		}; // TODO: refactor time func

		return (
			<DialogsStyles
				selectedId={dialgosStore.currentDialog?._id}
				_id={_id}
				isOnline={false}
				onClick={() => {
					setOnSelect({
						_id,
						unreaded,
						author,
						partner,
						createdAt,
						updatedAt,
					});
					messagesStore.fetchMessages(_id);
				}}>
				<div className="dialog-avatar">
					<Avatar
						fullname={partner.fullname}
						user_id={partner._id}
						src={partner.avatar && partner.avatar}
						width="50px"
						height="50px"
					/>
				</div>
				<div className="dialog">
					<div className="dialog-info">
						<h4 className="dialog-title">{partner.fullname}</h4>
						<p className="dialogs-message">
							{message ? message : 'Write your first message...'}
						</p>
					</div>
					<div className="dialog-other">
						{/* <Time time={getMessageTime(message.createdAt)} /> */}
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
