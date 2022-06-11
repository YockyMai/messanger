import React from 'react';
import Modal from 'react-modal';
import './Modal.scss';

Modal.setAppElement('#app');

const customStyles = {
	overlay: {
		backgroundColor: '#0000003d',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		background: '#1C1D2C',
		borderRadius: '1em',
		border: 'none',
	},
};

interface MyModalProps {
	modalIsOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
	title?: string;
}

export const MyModal: React.FC<MyModalProps> = ({
	modalIsOpen,
	setIsOpen,
	children,
	title,
}) => {
	return (
		<div>
			<Modal
				style={customStyles}
				isOpen={modalIsOpen}
				onRequestClose={() => setIsOpen(false)}
				contentLabel="Example Modal">
				<div className="modal__header">
					<h3>{title}</h3>
				</div>
				{children}
			</Modal>
		</div>
	);
};
