import io from 'socket.io-client';
import { AxiosRoutes } from '../types/axiosRoutes';

const socket = io(AxiosRoutes.dev); // configuration socket

export default socket;
