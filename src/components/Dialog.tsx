import React from 'react';
import styled from 'styled-components';
import { Avatar } from './Avatar';

const DialogsStyles = styled.div`
	display: flex;
	align-items: center;
	padding: 5px 8px 5px 8px;
	img {
		margin-top: 3px;
	}
	&:hover {
		background-color: #171823;
	}
`;

interface DialogProps {}

export const Dialog: React.FC<DialogProps> = () => {
	return (
		<DialogsStyles>
			<Avatar
				src="https://sun9-15.userapi.com/impf/c638619/v638619462/15436/Wnw_NvpgzwY.jpg?size=1280x960&quality=96&sign=8cba5477e99bead50b2a4b43b80ac48b&type=album"
				width="50px"
				height="50px"
			/>
			<div className="">
				<h3 className="dialog-title">Артур Шарифуллин</h3>
				<p className="last-user">qwe : 1234</p>
			</div>
		</DialogsStyles>
	);
};
