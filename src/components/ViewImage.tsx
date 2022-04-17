import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import imagePatch from '../store/imagePatch';

const ViewImageStyles = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 2;
	img {
		z-index: 1;
		border-radius: 1em;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		max-width: 95%;
		max-height: 95%;
	}
`;

const ViewImageContainer = styled.div`
	cursor: pointer;
	background-color: #000000ce;
	position: fixed;
	width: 100%;
	height: 100%;
`;

export const ViewImage = observer(() => {
	return (
		<>
			{imagePatch.flag && (
				<ViewImageStyles>
					<ViewImageContainer
						onClick={() => imagePatch.removeImagePatch()}
					/>
					<img src={imagePatch.imagePatch} alt="qwe" />
				</ViewImageStyles>
			)}
		</>
	);
});
