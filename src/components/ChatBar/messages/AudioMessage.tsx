import React, { RefObject } from 'react';
import styled from 'styled-components';
import audioSvg from '../../../assets/img/audio.svg';
import testAudioSound from '../../../assets/sounds/pamparam.mp3';
import number from '../../../utils/helpers/converCurrentTime';
interface AudioStylesProps {
	play?: boolean;
	progressBar?: number;
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
	audio {
		display: none;
	}
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
		opacity: 0.7;
	}
`;

const AudioProgress = styled.div<AudioStylesProps>`
	position: absolute;
	transform: translateX(-100%);
	height: 100%;
	width: 100% !important;
	background-color: #222547;
	transition: left 0.25s linear;
	${(props) =>
		props.progressBar && props.progressBar > 0
			? `left: ${props.progressBar}%;`
			: 'left: 0'}
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
	const [progressBar, setProgressBar] = React.useState(0);
	const [currentTime, setCurrentTime] = React.useState(0);
	const audioRef = React.useRef<HTMLAudioElement>(null);
	console.log(currentTime);

	React.useEffect(() => {
		if (audioRef.current) {
			let loadeddataListener = () => {
				audioRef.current && setCurrentTime(audioRef.current.duration);
			};
			let playListener = () => {
				setIsPlaying(true);
			};
			let pauseListener = () => {
				setIsPlaying(false);
			};
			let endedListener = () => {
				setIsPlaying(false);
				setProgressBar(0);
			};
			let timeupdateListener = () => {
				if (audioRef.current) {
					let currentTime = audioRef.current.currentTime;
					let duration = audioRef.current.duration;
					let progress = (currentTime * 100) / duration;
					setCurrentTime(audioRef.current?.currentTime);
					if (!isNaN(progress)) {
						setProgressBar(progress);
					}
				}
			};

			audioRef.current.addEventListener('loadeddata', loadeddataListener);
			audioRef.current.addEventListener('play', playListener);
			audioRef.current.addEventListener('pause', pauseListener);
			audioRef.current.addEventListener('ended', endedListener);
			audioRef.current.addEventListener('timeupdate', timeupdateListener);

			return () => {
				audioRef.current?.removeEventListener(
					'loadeddata',
					loadeddataListener,
				);
				audioRef.current?.removeEventListener('play', playListener);
				audioRef.current?.removeEventListener('pause', pauseListener);
				audioRef.current?.removeEventListener('ended', endedListener);
				audioRef.current?.removeEventListener(
					'timeupdate',
					timeupdateListener,
				);
			};
		}
	}, []);

	const togglePlay = () => {
		if (audioRef.current) {
			if (!isPlaying) audioRef.current.play();
			else audioRef.current.pause();
		}
	};

	return (
		<AudioMessageStyles onClick={togglePlay}>
			<audio ref={audioRef} src={testAudioSound} preload="metadata" />
			<AudioMessageInfo>
				<Play play={isPlaying} />
				<img src={audioSvg} alt="Audio" />
				<p>{number(currentTime)}</p>
			</AudioMessageInfo>
			<AudioProgress progressBar={progressBar} play={isPlaying} />
		</AudioMessageStyles>
	);
};
