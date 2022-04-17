import { formatDistance, subDays } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const TimeStyles = styled.div`
	color: #8e8a9c;
	text-align: right;
	font-size: 14px;
	font-weight: 200;
	margin-bottom: 3px;
`;

export const Time = () => {
	return (
		<TimeStyles>
			{formatDistance(subDays(new Date(), 1), new Date(2021))}
		</TimeStyles>
	);
};
