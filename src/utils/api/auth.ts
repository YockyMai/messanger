import { AxiosResponse } from 'axios';
import axios from '../../core/axios';

export default {
	registration: async (email: string, password: string, fullname: string) => {
		const data: AxiosResponse = await axios.post('user/registration', {
			email,
			password,
			fullname,
		});
		return data;
	},
	auth: async (email: string, password: string) => {
		const data: AxiosResponse = await axios.post('user/login', {
			email,
			password,
		});
		return data;
	},
	getUser: () => {
		return axios.get('user/me/');
	},
};
