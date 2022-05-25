import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../Avatar';
import friendsImg from '../../assets/img/friends.svg';

const SideMenuStyle = styled.div<{ sideIsOpen: boolean }>`
	height: 100vh;
	background-color: #1c1d2c;
	position: absolute;
	border: 2px solid red;
	left: 0;
	top: 0;
	width: 80%;
	box-shadow: 5px 0px 20px 0px rgba(0, 0, 0, 0.3);
	z-index: 100;
	transition: 0.2s all ease-in-out;
	${props => props.sideIsOpen == false && 'transform: translateX(-100%);'}
`;

const SideMenuContent = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const UserBlock = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	padding: 10px 0 0 10px;
	p {
		margin-left: 10px;
	}
	&::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 0;
		width: 80%;
		height: 1px;
		background-color: #101018;
	}
`;

const SideItemContent = styled.div`
	margin-top: 25px;
`;

const SideItem = styled.div`
	display: flex;
	align-items: center;
	min-height: 50px;
	width: 100%;
	padding: 0 10px 0 10px;
	p {
		margin-left: 10px;
	}
	img {
		width: 25px;
	}
	&:hover {
		background-color: #171823;
		cursor: pointer;
	}
`;

const Header = styled.div``;

interface ISideMenu {
	sideIsOpen: boolean;
	setSideIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideMenu: React.FC<ISideMenu> = props => {
	const sideMenu = React.useRef(null);

	React.useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick);
	}, []);

	const handleOutsideClick = (e: any) => {
		if (!e.path.includes(sideMenu.current) && props.sideIsOpen) {
			props.setSideIsOpen(false);
			console.log('Отработало событие');
			console.log(`side - ${props.sideIsOpen}`);
		} else {
			console.log('Событие НЕ ОТРАБОТАЛО!');
			console.log(`side - ${props.sideIsOpen}`);
		}
	};

	return (
		<SideMenuStyle sideIsOpen={props.sideIsOpen} ref={sideMenu}>
			<SideMenuContent>
				<UserBlock>
					<Avatar
						width="50px"
						height="50px"
						fullname="TestUser"
						user_id="1356164"
					/>
					<p>TestUser</p>
				</UserBlock>
				<SideItemContent>
					<SideItem>
						<img src={friendsImg} alt="Add friends" />
						<p>Add friends</p>
					</SideItem>
					<SideItem />
					<SideItem />
				</SideItemContent>
			</SideMenuContent>
		</SideMenuStyle>
	);
};
