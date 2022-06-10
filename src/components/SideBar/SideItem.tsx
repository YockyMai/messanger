import React, { SetStateAction } from 'react';
import styled from 'styled-components';

const SideItemStyle = styled.div<{
	isOpen?: boolean;
	openningItem?: boolean;
	color?: string;
}>`
	p {
		margin-left: 10px;
	}

	.sideItem {
		p {
			color: ${props => (props.color ? props.color : '#fff')};
		}
		&:hover {
			background-color: #171823;
			cursor: pointer;
		}
		img {
			width: 30px;
		}
		div {
			display: flex;
			align-items: center;
		}
		min-height: 50px;
		width: 100%;
		padding: 0 10px 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.openStatus {
			transition: 0.2s;
			position: relative;
			right: 10px;
			top: ${props => (props.isOpen ? '0px' : '-3px')};

			border: 1px solid transparent;
			width: 10px;
			height: 10px;
			${props => props.isOpen && 'transform: rotate(180deg);'}
			&::after {
				position: absolute;
				content: '';
				background-color: ${props =>
					props.openningItem ? `#fff` : 'transparent'};
				width: 1px;
				height: 10px;
				transform: rotate(45deg);
			}
			&::before {
				position: absolute;
				content: '';
				background-color: ${props =>
					props.openningItem ? `#fff` : 'transparent'};
				transform: rotate(-45deg);
				width: 1px;
				height: 10px;
				left: 7px;
			}
		}
	}
	.sideItemBody {
		overflow-y: auto;
		&::-webkit-scrollbar {
			width: 0px;
			height: 0px;
		}
		max-height: 500px;
		width: 90%;
		margin: 0 auto;
		height: ${props => (props.isOpen ? '100%' : '0px')};

		.friends-search-input {
			position: relative;
			img {
				cursor: pointer;
				position: absolute;
				top: 8px;
				right: 5px;

				transition: 0.1s;
				&:hover {
					transition: 0.1s;
					transform: translateY(-50%);
					transform: scale(1.1);
					filter: invert(1);
				}
			}
		}
	}
	input {
		margin-bottom: 10px;
		padding-right: 30px;
	}

	.friends-search__viewmore {
		font-size: 12px;
		padding: 2px 0px 6px;
		cursor: pointer;
		transition: 0.1s;
		color: #fff;
		&:hover {
			color: #a3a3a3;
			transition: 0.1s;
		}
	}
	.friends-search__loader {
		position: relative;
		height: 40px;
	}
	h5 {
		text-align: center;
		font-weight: 400;
		color: #e25c5c;
	}
`;

interface SideItemProps {
	children?: React.ReactNode;
	icon: string;
	title: string;
	callback?: () => void;
	color?: string;
}

export const SideItem: React.FC<SideItemProps> = ({
	children,
	icon,
	title,
	callback,
	color,
}) => {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<SideItemStyle
			color={color}
			openningItem={children ? true : false}
			isOpen={isOpen}
			onClick={() => callback && callback()}>
			<div
				className="sideItem"
				onClick={() => {
					setIsOpen(!isOpen);
				}}>
				<div>
					<img src={icon} alt={title} />
					<p>{title}</p>
				</div>
				<span className="openStatus" />
			</div>
			<div className="sideItemBody">{children}</div>
		</SideItemStyle>
	);
};
