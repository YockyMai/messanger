import React from 'react';
import styled from 'styled-components';
import generate from '../utils/helpers/gradientGenerator';

const AvatarStyles = styled.div<{ width?: string; height?: string }>`
	border-radius: 50%;
	width: ${props => props.width};
	height: ${props => props.height};
	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	}
`;

const DefaultAvatar = styled.div<{ gradient: string }>`
	background: linear-gradient(72deg, #c045c1, #1418a9);
	background: ${props => props.gradient};
	border-radius: 50%;
	height: 100%;
	width: 100%;
	position: relative;
	h2 {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-53%, -50%);
	}
`;

interface AvatarProps {
	width?: string;
	height?: string;
	src?: string;
	alt?: string;
	fullname: string;
	user_id: string;
}

export const Avatar: React.FC<AvatarProps> = ({
	width,
	height,
	src,
	alt,
	fullname,
	user_id,
}) => {
	return (
		<AvatarStyles width={width} height={height}>
			{src ? (
				<img src={src} alt={alt} />
			) : (
				<DefaultAvatar gradient={generate(user_id)}>
					<h2>{fullname[0]}</h2>
				</DefaultAvatar>
			)}
		</AvatarStyles>
	);
};
