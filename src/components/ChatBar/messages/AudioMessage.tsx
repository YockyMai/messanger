import React from 'react';
import styled from 'styled-components';
import audioSvg from '../../../assets/img/audio.svg';
interface AudioStylesProps {
	play?: boolean;
}

const AudioMessageStyles = styled.div<AudioStylesProps>`
	cursor: pointer;
	width: 400px;
	max-width: 100%;
	height: 50px;
	background-color: #414570;
	border-radius: 1em;
	margin-top: 5px;
	margin-bottom: 5px;
	position: relative;
	overflow: hidden;
`;

const AudioMessageInfo = styled.div<AudioMessageProps>`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
	z-index: 1;
	display: flex;
	justify-content: space-between;
	width: 90%;
	align-items: center;
	* {
		width: 33%;
	}
	p {
		text-align: right;
	}
`;

const AudioProgress = styled.div<AudioStylesProps>`
	position: absolute;
	left: 0;
	height: 100%;
	width: 0;
	background-color: #222547;
	${(props) => props.play && 'width: 100%; transition: 5s all linear;'}
`;

const Play = styled.button<AudioStylesProps>`
	border: 1px;
	background: transparent;
	box-sizing: border-box;
	height: 8px;
	border-color: transparent transparent transparent #ffffff;
	transition: 100ms all ease;
	cursor: pointer;
	border-style: solid;
	border-width: 12px 0 12px 20px;
	${(props) =>
		props.play &&
		`height: 20px;
		border-style: double;
		border-width: 0px 0 0px 20px;`}

	&:hover {
		border-color: transparent transparent transparent #cacaca;
	}
`;

interface AudioMessageProps {}

export const AudioMessage: React.FC<AudioMessageProps> = () => {
	const [isPlaying, setIsPlaying] = React.useState(false);

	return (
		<AudioMessageStyles onClick={() => setIsPlaying(!isPlaying)}>
			<AudioMessageInfo>
				<Play play={isPlaying} />
				<img src={audioSvg} alt="Audio" />
				<p>00:22</p>
			</AudioMessageInfo>
			<AudioProgress play={isPlaying} />
		</AudioMessageStyles>
	);
};
