import React from 'react';
import styled from 'styled-components';
import { Dialogs } from './Dialogs';
import { Search } from '../Search';
import { dialogsItem } from '../../types';
import { observer } from 'mobx-react-lite';
import dialogsStore from '../../stores/dialgosStore';
import { SideMenu } from './SideMenu';
import authStore from '../../stores/authStore';
import socket from '../../core/socket';
import dialgosStore from '../../stores/dialgosStore';
import playNotice from '../../utils/helpers/playNotice';

const SideBarStyles = styled.div`
	background-color: #1c1d2c;
	position: sticky;
	height: 100vh;
	top: 0;
`;

const UserBlock = styled.div`
	display: flex;
	position: relative;
	padding: 10px 0 10px 10px;
	.header {
		.menu {
			div {
				height: 50px;
				&:hover {
					span,
					span::after,
					span::before {
						transition: 0.2s;
						background-color: #a8a8a8;
					}
				}
				span {
					transition: 0.2s;
					top: 50%;
					height: 2px;
					width: 30px;
					display: block;
					background-color: #787878;
					position: relative;
					z-index: -1;
					&::before {
						transition: 0.2s;
						content: '';
						position: absolute;
						background-color: #787878;
						height: 2px;
						width: 30px;
						top: -10px;
					}
					&::after {
						transition: 0.2s;
						content: '';
						position: absolute;
						background-color: #787878;
						height: 2px;
						width: 30px;
						top: 10px;
					}
				}
				cursor: pointer;
			}
			margin-right: 10px;
		}
		width: 100%;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}
	&:before {
		content: '';
		background-color: #747474;
		width: 60%;
		height: 1px;
		position: absolute;
		bottom: 0;
		left: 5px;
	}
`;

export const SideBar = observer(() => {
	const [sideIsOpen, setSideIsOpen] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');
	const menuBtn = React.useRef(null);
	const [loaded, setLoaded] = React.useState(false);
	React.useEffect(() => {
		setLoaded(false);
		dialogsStore.fetchDialogs();
		setLoaded(true);

		socket.on('SERVER:DIALOG_CREATED', data => {
			if (
				data.contributors.author === authStore.user._id ||
				data.contributors.partner === authStore.user._id
			) {
				dialgosStore.fetchDialogs();

				if (data.contributors.author !== authStore.user._id) {
					playNotice();
				}
			}

			console.log(data);
		});
	}, [authStore.isAuth]);
	const filteredDialogs = dialogsStore.dialogues
		.filter(item =>
			item.partner.fullname
				.toLowerCase()
				.includes(searchValue.toLowerCase()),
		)
		.sort((before_el, after_el) => {
			if (before_el.updatedAt) return -1;
			else if (after_el.updatedAt) return 1;
			else return 0;
		});
	return (
		<SideBarStyles>
			<UserBlock>
				<div className="header">
					<div className="menu" onClick={() => setSideIsOpen(true)}>
						<div ref={menuBtn}>
							<span />
						</div>
					</div>
					<Search setValue={setSearchValue} placeholder="Search" />
				</div>
			</UserBlock>
			<Dialogs loaded={loaded} dialogsItems={filteredDialogs} />
			<SideMenu
				menuBtnRef={menuBtn}
				sideIsOpen={sideIsOpen}
				setSideIsOpen={setSideIsOpen}
			/>
		</SideBarStyles>
	);
});
