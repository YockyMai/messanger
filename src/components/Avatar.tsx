import React from 'react';
import styled from 'styled-components';

const AvatarStyles = styled.div<AvatarProps>`
	img {
		width: ${(props) => props.width};
		height: ${(props) => props.height};
		border-radius: 50%;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	}
`;

interface AvatarProps {
	width?: string;
	height?: string;
	src?: string;
	alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ width, height, src, alt }) => {
	return (
		<AvatarStyles width={width} height={height}>
			<img src={src} alt={alt} />
		</AvatarStyles>
	);
};
