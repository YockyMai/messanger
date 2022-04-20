import { formatDistance, subDays } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const TimeStyles = styled.div`
	color: #8e8a9c;
	font-size: 14px;
	font-weight: 200;
`;

interface TimeProps {
	time: string;
}

export const Time: React.FC<TimeProps> = ({ time }) => {
	return <TimeStyles>{time}</TimeStyles>;
};
