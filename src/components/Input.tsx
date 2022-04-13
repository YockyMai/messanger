import React from 'react';
import styled from 'styled-components';

const InputStyles = styled.div<InputStyleProps>`
	input {
		width: ${(props) => props.width};
		height: ${(props) => props.height};
		border-radius: ${(props) => props.radius};
		border: 0;
		transition: 0.3s;
		font-size: 18px;
		&:focus {
			outline: 1px solid #1c1d2c;
			border: 0;
			outline-offset: 0;
		}
		&:active {
			outline: 1px solid #1c1d2c;
			border: 0;
			outline-offset: 0;
		}
		padding: 15px;
		background-color: #171823;
		color: #fff;
	}
`;

interface InputStyleProps {
	width: string;
	height: string;
	radius: string;
	backgroundColor: string;
}

interface InputProps {
	placeholder?: string;
	type: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	width: string;
	height?: string;
	radius?: string;
	backgroundColor?: string;
}

export const Input: React.FC<InputProps> = ({
	placeholder,
	type,
	value,
	setValue,
	width,
	height,
	radius,
	backgroundColor,
}) => {
	return (
		<InputStyles
			radius={radius || '0.6em'}
			height={height || '50px'}
			backgroundColor={backgroundColor || '#171823'}
			width={width}>
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
