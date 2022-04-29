import { dialogs } from '../../../utils/api';
import React from 'react';
import styled from 'styled-components';
import { DialogItem } from './DialogItem';

const DilagosStyles = styled.div`
	height: 100%;
	overflow-y: auto;
`;

interface dialogsItem {
	_id: string;
	unreaded: 1;
	message: {
		user: any;
		text: string;
		created_at: Date;
	};
	// message: {
	// 	user: {
	// 		_id: string;
	// 		fullname: string;
	// 		avatar: string | null;
	// 		isOnline: boolean;
	// 	};
	// 	text: string;
	// 	created_at: string;
	// };
}

export const Dialogs = () => {
	const dialogsTest = [
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

	const [dialogsItems, setDialogsItems] = React.useState<Array<dialogsItem>>(
		[],
	);

	React.useEffect(() => {
		(async () => {
			const response = await dialogs.getAll();
			setDialogsItems(response.data);
		})();
	}, []);
	return (
		<DilagosStyles>
			{dialogsItems.map((obj) => (
				<DialogItem
					key={obj._id}
					message={obj.message}
					unreaded={obj.unreaded}
				/>
			))}
		</DilagosStyles>
	);
};
