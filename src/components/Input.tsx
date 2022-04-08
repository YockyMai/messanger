import React from 'react';
import styled from 'styled-components';

const InputStyles = styled.div<InputStyleProps>`
	input {
		width: ${(props) => props.width};
		border-radius: 1em;
		border: 0;
		transition: 0.3s;
		font-size: 18px;
		&:focus {
			border: 0;
			padding: 20px;
			transition: 0.3s;
		}
		padding: 10px;
		background-color: #171823;
		color: #fff;
	}
`;

interface InputStyleProps {
	width: string;
}

interface InputProps {
	placeholder?: string;
	type: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	width: string;
}

export const Input: React.FC<InputProps> = ({
	placeholder,
	type,
	value,
	setValue,
	width,
}) => {
	return (
		<InputStyles width={width}>
			<input
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				type={type}
				placeholder={placeholder}
			/>
		</InputStyles>
	);
};
