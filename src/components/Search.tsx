import React from 'react';
import styled from 'styled-components';

interface SearchStylesProps {
	bgColor?: string;
	height?: string;
	width?: string;
	focusWidth?: string;
}
interface SearchProps {
	value?: string;
	setValue?: React.Dispatch<React.SetStateAction<string>>;
	placeholder: string;
	bgColor?: string;
	height?: string;
	width?: string;
	focusWidth?: string;
}

const SearchInput = styled.input<SearchStylesProps>`
	font-weight: 600;
	font-size: 16px;
	border-radius: 0.5em;
	border: 0;
	outline: 0;
	width: ${props => (props.width ? props.width : '90%')};
	height: ${props => (props.height ? props.height : '50px')};
	padding: 10px;
	background-color: ${props => (props.bgColor ? props.bgColor : '#171823')};
	color: #fff;
	transition: 0.3s;
	&:focus {
		border: 0;
		outline: 0;
		outline-offset: 0;
		width: ${props => props.focusWidth && props.focusWidth};
		transition: 0.5s;
	}
`;

export const Search: React.FC<SearchProps> = ({
	bgColor,
	value,
	setValue,
	placeholder,
	width,
	height,
	focusWidth,
}) => {
	return (
		<SearchInput
			bgColor={bgColor}
			width={width}
			height={height}
			focusWidth={focusWidth}
			type="text"
			value={value}
			onChange={e => {
				if (setValue) {
					setValue(e.target.value);
				}
			}}
			placeholder={placeholder}
		/>
	);
};
