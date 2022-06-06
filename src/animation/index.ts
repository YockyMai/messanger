import { keyframes } from 'styled-components';

export const popupMounted = keyframes`
    0% {
        transform: scaleY(0);
        opacity: 0;
    }
    70% {
        transform: scaleY(0.7);
        opacity: 0.7;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

export const popupUnmunted = keyframes`
    0% {
        transform: scale(0);
    }
    95% {
        transform: scaleY(1.5);
    }
`;
