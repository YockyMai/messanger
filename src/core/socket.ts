import io from 'socket.io-client';
import { AxiosRoutes } from './axiosRoutes';

const socket = io(AxiosRoutes.prod); // configuration socket

export default socket;
