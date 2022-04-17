import React from 'react';
import styled from 'styled-components';
import { DialogItem } from './DialogItem';

const DilagosStyles = styled.div``;

export const Dialogs = () => {
	const dialogs = [
		{
			_id: Math.random(), //id from mongoDB

			unreaded: 1,
			message: {
				user: {
					_id: 1,
					fullname: 'Артур Шарифуллин',
					avatar: 'https://sun9-15.userapi.com/impf/c638619/v638619462/15436/Wnw_NvpgzwY.jpg?size=1280x960&quality=96&sign=8cba5477e99bead50b2a4b43b80ac48b&type=album',
					isOnline: true,
				},
				text: 'Привет!',
				created_at: new Date(),
			},
		},
		{
			_id: Math.random(), //id from mongoDB

			unreaded: 1,
			message: {
				user: {
					_id: 1,
					fullname: 'Петрович',
					isOnline: true,
				},
				text: 'Привет!',
				created_at: new Date(),
			},
		},
		{
			_id: Math.random(), //id from mongoDB

			unreaded: 1,
			message: {
				user: {
					_id: 1,
					fullname: 'Генадий Горин',
					isOnline: false,
				},
				text: 'Привет!',
				created_at: new Date(),
			},
		},
	];
	return (
		<DilagosStyles>
			{dialogs.map((obj) => (
				<DialogItem
					key={obj._id}
					message={obj.message}
					unreaded={obj.unreaded}
				/>
			))}
		</DilagosStyles>
	);
};
