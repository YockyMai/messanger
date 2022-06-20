import React from 'react';
import styled from 'styled-components';
import socket from '../../core/socket';
import messagesStore from '../../stores/messagesStore';
import { EmojiPicker } from '../EmojiPicker';
import TextareaAutosize from 'react-textarea-autosize';
import { CSSTransition } from 'react-transition-group';

interface SendMessageProps {}

const SendMessageStyle = styled.div`
	position: fixed;
	outline: 0.5px solid #0000003b;
	z-index: 1;
	bottom: 0;
	width: 75%;
	background-color: #1c1d2c;

	path {
		transition: 0.15s;
	}
	.input-div {
		resize: none;
		border: none;
		width: 100%;
		font-size: 18px;
		padding: 5px 100px 5px 50px;
		background-color: transparent;
		color: #fff;
		font-weight: 200;
		&:focus {
			outline: none;
		}
		overflow: auto;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	.picker {
		position: absolute;
		right: 0px;
		transform: translateX(100%);
		bottom: 50px;
		opacity: 0;

		&-enter {
			opacity: 0;
			transform: scale(1, -1);
			right: 0px;
			transform: translateX(100%);
		}
		&-enter-active {
			opacity: 1;
			transition: 200ms;
			transform: scale(1, 1);
			right: 50px;
		}
		&-enter-done {
			opacity: 1;
			right: 50px;
			transform: none;
		}
		&-exit {
			opacity: 1;
			transform: scale(1, 1);
			right: 50px;
		}
		&-exit-active {
			opacity: 0;
			transition: 200ms;
			transform: scale(1, -1);
			right: 0px;
			transform: translateX(100%);
		}
		&-exit-done {
			display: none;
			opacity: 0;
		}
	}
	.input-actions {
		span {
			transform: scale(0.8);
			svg {
				path {
					fill: #5e5e64;
				}
				&:hover {
					path {
						fill: #8e8e96;
					}
				}
			}

			cursor: pointer;
			position: absolute;
			bottom: 10px;
			z-index: 2;
			bottom: 0px;
		}
		.input-fileAttach {
			position: absolute;
			cursor: pointer;
			bottom: 0px;
			opacity: 0;
			width: 40px;
			height: 70px;
		}
		.attach {
			left: 10px !important;
			&:hover {
				svg {
					path {
						fill: #8e8e96 !important;
					}
				}
			}
		}
		.emoji {
			right: 50px;
		}
		.micro {
			svg {
				path {
					fill: transparent;
					stroke: #5e5e64;
				}
				&:hover {
					path {
						fill: transparent;
						stroke: #8e8e96;
					}
				}
			}

			width: 27px;
			right: 10px;
		}
		.send {
			svg {
				path {
					fill: #54577e;
				}
				&:hover {
					path {
						fill: transparent;
						stroke: #54577e;
					}
				}
			}
			bottom: -5px;
			right: 5px;
		}
	}

	.charactersLeft {
		position: absolute;
		left: 45px;
		top: -40px;
		display: flex;
		padding: 5px 10px;
		border-radius: 0.3em;
		background-color: #1c1d2c;
		align-items: center;
		p {
			font-size: 13px;
			font-weight: 200;
		}
		span {
			font-size: 14px;
			margin-left: 5px;
			color: #e66868;
		}
		&-enter {
			opacity: 0;
			top: 0px;
			transform: scale(-1, 0);
		}
		&-enter-active {
			opacity: 1;
			top: -40px;
			transition: 200ms;
			transform: scale(1, 1);
		}
		&-exit {
			opacity: 1;
			transform: scale(1, 1);
			top: -40px;
		}
		&-exit-active {
			opacity: 0;
			transition: 200ms;
			transform: scale(-1, 0);
			top: 0px;
		}
	}
`;

export const SendMessage: React.FC<SendMessageProps> = () => {
	const [message, setMessage] = React.useState<string>('');
	const [emojiVisible, setEmojiVisible] = React.useState(false);
	const [selectedFiles, setSelectedFiles] = React.useState<any>([]);
	const [selectedEmoji, selectEmoji] = React.useState<any>([]);

	const emojiPicker = React.useRef<HTMLDivElement | null>(null);
	const emojiOpenIcon = React.useRef<SVGSVGElement | null>(null);

	const sendMessage = (e?: KeyboardEvent) => {
		if (e) {
			if (e.shiftKey && e.keyCode === 13) {
			} else if (
				message.replace(/\s{2,}/g, '').trim().length > 0 &&
				e.keyCode === 13
			) {
				e.preventDefault();
				messagesStore.sendMessage(message);
				setMessage('');
				setEmojiVisible(false);
				return false;
			}
		} else {
			messagesStore.sendMessage(message);
			setMessage('');
			setEmojiVisible(false);
			return false;
		}
	};

	const onEmojiClick = (event: any, emojiObject: any) => {
		setMessage(message + emojiObject.emoji);
	};
	return (
		<SendMessageStyle>
			<TextareaAutosize
				placeholder="Write a message..."
				className="input-div"
				onChange={e => {
					setMessage(e.target.value);
				}}
				minRows={1}
				maxRows={10}
				autoFocus
				value={message}
				onKeyDown={(e: any) => {
					sendMessage(e);
				}}
				maxLength={2000}
			/>

			<CSSTransition
				in={message.length > 0}
				timeout={1000}
				classNames="charactersLeft"
				unmountOnExit
				mountOnEnter>
				<div className="charactersLeft">
					<p>characters left</p>
					<span className="">{2000 - message.length}</span>
				</div>
			</CSSTransition>
			<CSSTransition in={emojiVisible} timeout={200} classNames="picker">
				<div className="picker" ref={emojiPicker}>
					<EmojiPicker onEmojiClick={onEmojiClick} />
				</div>
			</CSSTransition>

			<div className="input-actions">
				<span className="attach">
					<input
						className="input-fileAttach"
						type="file"
						multiple
						onChange={event => {
							setSelectedFiles(event.target.files);
						}}
					/>
					<svg
						width="29"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M2.87462 16.8421L14.963 5.04772C15.5451 4.4799 16.2362 4.0295 16.9967 3.72225C17.7573 3.41501 18.5724 3.25692 19.3955 3.25702C20.2187 3.25713 21.0337 3.41542 21.7942 3.72286C22.5546 4.0303 23.2456 4.48086 23.8276 5.04884C24.4096 5.61681 24.8712 6.29106 25.1861 7.03309C25.501 7.77513 25.663 8.57041 25.6629 9.37354C25.6628 10.1767 25.5006 10.9719 25.1855 11.7139C24.8704 12.4558 24.4086 13.13 23.8264 13.6978L9.32221 27.8492C8.78756 28.3708 8.06243 28.6639 7.30634 28.6639C6.55024 28.6639 5.82511 28.3708 5.29047 27.8492C4.75583 27.3276 4.45547 26.6201 4.45547 25.8824C4.45547 25.1447 4.75583 24.4372 5.29047 23.9155L18.1834 11.3363C18.4853 11.0201 18.6497 10.602 18.6419 10.1699C18.6341 9.73783 18.4547 9.32559 18.1415 9.02003C17.8283 8.71447 17.4058 8.53944 16.963 8.53182C16.5201 8.5242 16.0915 8.68458 15.7675 8.97917L2.87462 21.5584C1.69895 22.7055 1.03847 24.2613 1.03847 25.8835C1.03847 27.5057 1.69895 29.0614 2.87462 30.2085C4.05028 31.3556 5.64483 32 7.30748 32C8.97012 32 10.5647 31.3556 11.7403 30.2085L26.2423 16.0549C28.0239 14.2757 29.0147 11.8829 28.9998 9.39555C28.985 6.90821 27.9657 4.52686 26.163 2.76801C24.3603 1.00916 21.9196 0.0146453 19.3702 0.000160458C16.8209 -0.0143244 14.3684 0.952393 12.5449 2.69064L0.458765 14.4827C0.156829 14.7989 -0.00754696 15.217 0.000266307 15.6491C0.00807957 16.0812 0.187472 16.4934 0.500651 16.799C0.813829 17.1045 1.23634 17.2796 1.67917 17.2872C2.12201 17.2948 2.55059 17.1344 2.87462 16.8398V16.8421Z"
							fill="#969696"
						/>
					</svg>
				</span>
				<span className="emoji">
					<svg
						onClick={() => {
							setEmojiVisible(!emojiVisible);
						}}
						ref={emojiOpenIcon}
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30ZM16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32V32Z"
							fill="#969696"
						/>
						<path
							d="M8.57004 19.134C8.79972 19.0014 9.07267 18.9655 9.32884 19.0341C9.58501 19.1027 9.80343 19.2703 9.93604 19.5C10.5503 20.5647 11.4341 21.4487 12.4987 22.0632C13.5632 22.6776 14.7709 23.0007 16 23C17.2292 23.0007 18.4368 22.6776 19.5014 22.0632C20.5659 21.4487 21.4498 20.5647 22.064 19.5C22.1292 19.3854 22.2164 19.2847 22.3207 19.2039C22.4249 19.1231 22.5441 19.0637 22.6713 19.0292C22.7986 18.9946 22.9315 18.9856 23.0623 19.0026C23.193 19.0196 23.3192 19.0623 23.4334 19.1282C23.5476 19.1942 23.6476 19.2821 23.7277 19.3868C23.8078 19.4916 23.8664 19.6112 23.9001 19.7387C23.9338 19.8662 23.942 19.9991 23.9241 20.1297C23.9063 20.2604 23.8627 20.3862 23.796 20.5C23.0063 21.8687 21.8699 23.0052 20.5014 23.7952C19.1328 24.5852 17.5803 25.0007 16 25C14.4198 25.0007 12.8673 24.5852 11.4987 23.7952C10.1301 23.0052 8.9938 21.8687 8.20404 20.5C8.07144 20.2703 8.0355 19.9974 8.10414 19.7412C8.17278 19.485 8.34037 19.2666 8.57004 19.134ZM14 13C14 14.656 13.104 16 12 16C10.896 16 10 14.656 10 13C10 11.344 10.896 10 12 10C13.104 10 14 11.344 14 13ZM22 13C22 14.656 21.3335 16 20 16C18.896 16 18 14.656 18 13C18 11.344 18.896 10 20 10C21.104 10 22 11.344 22 13Z"
							fill="#969696"
						/>
					</svg>
				</span>

				{message.length > 0 ? (
					<span className="send" onClick={() => sendMessage()}>
						<svg
							width="35"
							height="35"
							viewBox="0 0 35 35"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M26.3887 12.4958L1.66813 0.118832C1.47438 0.0218043 1.25675 -0.0170726 1.04144 0.00688259C0.826138 0.0308378 0.622337 0.116604 0.45458 0.253853C0.294373 0.388304 0.174795 0.564837 0.109289 0.763608C0.0437833 0.962379 0.0349462 1.17551 0.0837716 1.37903L3.06147 12.372L15.7701 12.4712C16.519 12.9963 16.519 14.0973 15.7701 14.6224C10.8071 14.6224 8.0245 14.6224 3.06147 14.6224L0.0388252 25.5816C-0.00699043 25.7516 -0.0123385 25.9299 0.0232111 26.1023C0.0587607 26.2747 0.134216 26.4364 0.24351 26.5743C0.352804 26.7122 0.492887 26.8225 0.652494 26.8963C0.812102 26.9701 0.986781 27.0054 1.16249 26.9993C1.33839 26.9983 1.51158 26.9559 1.66813 26.8756L26.3887 14.4986C26.5727 14.4042 26.7272 14.2607 26.8351 14.084C26.9429 13.9073 27 13.7043 27 13.4972C27 13.2901 26.9429 13.087 26.8351 12.9104C26.7272 12.7337 26.5727 12.5902 26.3887 12.4958Z"
								fill="#54577E"
							/>
						</svg>
					</span>
				) : (
					<span className="micro">
						<svg
							width="24"
							height="32"
							viewBox="0 0 24 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1 16.1406C1 16.1406 1 25.5469 11.75 25.5469M11.75 25.5469C22.5 25.5469 22.5 16.1406 22.5 16.1406M11.75 25.5469V30V31M11.75 1C6.375 1 6.375 6 6.375 6V14.7969C6.375 14.7969 6.375 20.1719 11.75 20.1719C17.125 20.1719 17.125 14.7969 17.125 14.7969V6C17.125 6 17.125 1 11.75 1Z"
								stroke="#969696"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
				)}
			</div>
		</SendMessageStyle>
	);
};
