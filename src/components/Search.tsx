import React from 'react';
import styled from 'styled-components';

const SearchStyles = styled.div`
	width: 90%;
	input {
		font-weight: 600;
		font-size: 16px;
		border-radius: 0.5em;
		border: 0;
		outline: 0;
		height: 50px;
		width: 100%;
		padding: 10px;
		background-color: #171823;
		color: #fff;
		&:focus {
			border: 0;
			outline: 0;
			outline-offset: 0;
		}
	}
`;

interface SearchProps {
	value?: string;
	setValue?: React.Dispatch<React.SetStateAction<string>>;
	placeholder: string;
}

export const Search: React.FC<SearchProps> = ({
	value,
	setValue,
	placeholder,
}) => {
	return (
		<SearchStyles>
			<input
				type="text"
				value={value}
				onChange={(e) => {
					if (setValue) {
						setValue(e.target.value);
					}
				}}
				placeholder={placeholder}
			/>
		</SearchStyles>
	);
};
