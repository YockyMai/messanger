import { formatDistance, subDays } from 'date-fns';
import { toDate } from 'date-fns/esm';
import React from 'react';
import styled from 'styled-components';

const TimeStyles = styled.div`
	color: #8e8a9c;
	font-size: 14px;
	font-weight: 200;
	display: inline-block;
`;

interface TimeProps {
	time: string;
}

export const Time: React.FC<TimeProps> = ({ time }) => {
	// const convertedTime = toDate(Number(time));
	return <TimeStyles>{time}</TimeStyles>;
};
