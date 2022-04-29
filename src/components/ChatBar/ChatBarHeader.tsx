import React from 'react';
import styled from 'styled-components';
import volumeMuteSvg from '../../assets/img/volume-mute.svg';

const ChatBarHeaderStyles = styled.div`
	z-index: 3;
	height: 50px;
	width: 75%;
	position: fixed;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	background-color: #171823;
	display: flex;
	justify-content: space-between;
	padding-left: 10px;
	div {
		h3 {
			display: block;
			margin: 0 auto;
			max-width: 300px;
			text-align: center;
			font-size: 16px;
			font-weight: 400;
		}
	}
`;

const Status = styled.span`
	text-align: center;
	color: #969696;
	font-weight: 200;
	position: relative;
	display: block;
	width: 70px;
	margin: 0 auto;
	p {
		text-align: left;
	}
	p::before {
		content: '';
		width: 10px;
		height: 10px;
		position: absolute;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
		background-color: #5ca8eb;
		border-radius: 50%;
	}
`;

const ControlPanel = styled.div`
	width: 70px;
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
	${(props) =>
		props.isOpen
			? `display: block; opacity: 1 !important; transition: 1s all;`
			: 'display: none; opacity: 0;'}
	position: absolute;
	z-index: 100;
	transition: 1s all;
	right: 10px;
	top: 40px;
	width: 200px;
	max-width: 350px;
	height: auto;
	border-radius: 0.3em;
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
			width: 30px;
		}
	}
`;

interface ChatSettingsPopupProps {
	isOpen: boolean;
}

interface ChatBarHeader {}

export const ChatBarHeader: React.FC<ChatBarHeader> = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const chatSettingsPopup = React.useRef(null);
	console.log(isOpen);
	React.useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick);
	}, []);

	const handleOutsideClick = (e: any) => {
		if (!e.path.includes(chatSettingsPopup.current) && !isOpen) {
			setIsOpen(false);
		}
	};
	return (
		<ChatBarHeaderStyles>
			<div>
				<h3>Петрович</h3>
				<Status>
					<p>online</p>
				</Status>
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
						<img src={volumeMuteSvg} alt="" /> Mute
					</li>
					<li>
						<img src={volumeMuteSvg} alt="" /> Mute
					</li>
					<li>
						<img src={volumeMuteSvg} alt="" /> Mute
					</li>
					<li>
						<img src={volumeMuteSvg} alt="" /> Mute
					</li>
				</ChatSettingsPopup>
			</ControlPanel>
		</ChatBarHeaderStyles>
	);
};
