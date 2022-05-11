import React from 'react';
import styled from 'styled-components';
import { Dialogs } from './Dialogs';
import { Search } from '../Search';
import { dialogsItem } from '../../types';
import { observer } from 'mobx-react-lite';
import dialogsStore from '../../stores/dialgosStore';

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
			cursor: pointer;
			margin-right: 10px;
			&:hover {
				path {
					fill: #a8a8a8;
				}
			}
		}
		width: 99%;
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
	const [dialogsItems, setDialogsItems] = React.useState<Array<dialogsItem>>(
		[],
	);
	const [searchValue, setSearchValue] = React.useState('');
	const [loaded, setLoaded] = React.useState(false);
	React.useEffect(() => {
		(() => {
			setLoaded(false);
			dialogsStore.fetchDialogs();
			setLoaded(true);
		})();
	}, []);

	const filteredDialogs = dialogsStore.dialogues.filter(item =>
		item.message.user.fullname
			.toLowerCase()
			.includes(searchValue.toLowerCase()),
	);
	return (
		<SideBarStyles>
			<UserBlock>
				<div className="header">
					<div className="menu">
						<svg
							className="burgerBtn"
							width="25"
							height="21"
							viewBox="0 0 25 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.780612 2.62256H24.2194C24.6505 2.62256 25 2.20727 25 1.69499C25 1.18271 24.6505 0.767426 24.2194 0.767426H0.780612C0.34949 0.767426 0 1.18271 0 1.69499C0 2.20727 0.34949 2.62256 0.780612 2.62256Z"
								fill="#787878"
							/>
							<path
								d="M0.780612 20.7674H24.2194C24.6505 20.7674 25 20.3521 25 19.8398C25 19.3275 24.6505 18.9123 24.2194 18.9123H0.780612C0.34949 18.9123 0 19.3275 0 19.8398C0 20.3521 0.34949 20.7674 0.780612 20.7674Z"
								fill="#787878"
							/>
							<path
								d="M0.780612 11.695H24.2194C24.6505 11.695 25 11.2797 25 10.7674C25 10.2552 24.6505 9.83987 24.2194 9.83987H0.780612C0.34949 9.83987 0 10.2552 0 10.7674C0 11.2797 0.34949 11.695 0.780612 11.695Z"
								fill="#787878"
							/>
						</svg>
					</div>
					<Search setValue={setSearchValue} placeholder="Search" />
				</div>
			</UserBlock>

			<Dialogs loaded={loaded} dialogsItems={filteredDialogs} />
		</SideBarStyles>
	);
});
