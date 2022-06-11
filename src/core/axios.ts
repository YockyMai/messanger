import axios from 'axios';
import { AxiosRoutes } from './axiosRoutes';

const jwtToken = localStorage.getItem('token');

//http://localhost:8080/
//https://hiyocky.herokuapp.com/'

const instance = axios.create({
	baseURL: AxiosRoutes.prod,
	headers: {
		token: jwtToken ? jwtToken : '',
		'X-Custom-Header': 'foobar',
	},
});

export default instance;
