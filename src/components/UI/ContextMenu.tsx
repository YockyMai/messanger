import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const ContextMenuStyle = styled.div<{ isOpen: boolean }>`
	&.open-enter {
		opacity: 0;
		transform: scale(-1, 0);
	}
	&.open-enter-active {
		opacity: 1;
		transition: 200ms;
		transform: scale(1, 1);
	}
	&.open-exit {
		opacity: 1;
		transform: scale(1, 1);
	}
	&.open-exit-active {
		opacity: 0;
		transition: 200ms;
		transform: scale(-1, 0);
	}

	/* ${props =>
		props.isOpen
			? `display: block; opacity: 1 !important; transition: 1s all;`
			: 'display: none; opacity: 0;'} */
	z-index: 1;
	width: 200px;
	max-width: 350px;
	height: auto;
	border-radius: 0.3em;
	.warning--action {
		p {
			color: #e25c5c;
		}
	}
	li {
		background-color: #1c1d2c;
		transition: 0.1s;
		padding: 5px 0 5px 10px;
		list-style-type: none;
		font-weight: 200;
		display: flex;
		align-items: center;
		cursor: pointer;
		&:hover {
			transition: 0.1s;
			background-color: #27293d;
		}
		img {
			margin-right: 10px;
			width: 20px;
		}
	}
`;

interface ContextProps {
	children: React.ReactNode;
	isOpen: boolean;
	// setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextMenu: React.FC<ContextProps> = ({ children, isOpen }) => {
	// const [isOpen, setIsOpen] = React.useState(true);

	return (
		<div>
			<CSSTransition
				in={isOpen}
				timeout={200}
				mountOnEnter
				unmountOnExit
				classNames="open">
				<ContextMenuStyle isOpen={isOpen}>{children}</ContextMenuStyle>
			</CSSTransition>
		</div>
	);
};
