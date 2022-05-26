import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../Avatar';
import friendsImg from '../../assets/img/friends.svg';

const SideMenuStyle = styled.div<{ sideIsOpen: boolean }>`
	height: 100vh;
	background-color: #1c1d2c;
	position: absolute;
	left: 0;
	top: 0;
	width: 80%;
	box-shadow: 5px 0px 20px 0px rgba(0, 0, 0, 0.3);
	z-index: 100;
	transition: 0.2s all ease-in-out;
	${props => !props.sideIsOpen && 'transform: translateX(-100%);'};
	.qwe {
		border: 2px solid red;
		top: 0;
		left: 0;
		position: absolute;
		z-index: -1;
		width: 100vw;
		height: 100%;
	}
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

const SideItem = styled.div<{ itemOpen: boolean }>`
	p {
		margin-left: 10px;
	}
	img {
		width: 25px;
	}
	.sideItem {
		&:hover {
			background-color: #171823;
			cursor: pointer;
		}
		min-height: 50px;
		width: 100%;
		padding: 0 10px 0 10px;
		display: flex;
		align-items: center;
	}
	.sideItemBody {
		transition: 1s;
		height: 0;
		overflow: hidden;
		height: ${props => props.itemOpen && '300px;'};
	}
`;

const Header = styled.div``;

interface ISideMenu {
	sideIsOpen: boolean;
	setSideIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	menuBtnRef: React.RefObject<HTMLDivElement>;
}

export const SideMenu: React.FC<ISideMenu> = ({
	sideIsOpen,
	setSideIsOpen,
	menuBtnRef,
}) => {
	const sideMenu = React.useRef(null);
	const [sideItemIsOpen, setSideItemOpen] = React.useState(false);

	React.useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick);

		return () => {
			document.body.removeEventListener('click', handleOutsideClick);
		};
	}, [sideIsOpen]);

	const handleOutsideClick = (e: any) => {
		if (
			!e.path.includes(sideMenu.current) &&
			sideIsOpen &&
			e.target != menuBtnRef.current
		) {
			setSideIsOpen(false);
		}
	};

	return (
		<>
			<SideMenuStyle sideIsOpen={sideIsOpen} ref={sideMenu}>
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
						<SideItem itemOpen={sideItemIsOpen}>
							<div
								className="sideItem"
								onClick={() =>
									setSideItemOpen(!sideItemIsOpen)
								}>
								<img src={friendsImg} alt="Add friends" />
								<p>Add friends</p>
							</div>
							<div className="sideItemBody">
								<p>
									Lorem ipsum, dolor sit amet consectetur
									adipisicing elit. Dicta mollitia cupiditate
									doloribus accusantium quia praesentium vel
									commodi dolore asperiores dolor nesciunt
									voluptatum fugiat facere, minima quos at,
									sed rerum eligendi.
								</p>
							</div>
						</SideItem>
					</SideItemContent>
				</SideMenuContent>
			</SideMenuStyle>
		</>
	);
};
