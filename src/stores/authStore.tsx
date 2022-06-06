import { makeAutoObservable } from 'mobx';

import { User } from '../types';
import auth from '../utils/api/auth';

class AuthStore {
	isAuth: boolean = false;
	user: User | any = {};
	errorMessage: string = '';
	constructor() {
		makeAutoObservable(this);
	}

	setUser(userData: User) {
		this.isAuth = true;
		this.user = userData;
	}

	async registration(email: string, password: string, fullname: string) {
		const { data } = await auth.registration(email, password, fullname);
		return data.auth;
		// this.setUser(userData);
	}

	auth(email: string, password: string) {}

	async login(email: string, password: string) {
		const { data } = await auth.auth(email, password);
		console.log(data);
		if (
			data.message === 'Incorrect password or email' ||
			data.message === 'User not found' ||
			data.status === 'error'
		) {
			this.setErrorMessage(data.message);
		} else {
			localStorage.setItem('token', data.token);
			this.setUser(data.user);
			this.setErrorMessage(data.message);
			console.log(data.user);
		}
	}

	setErrorMessage(err: string) {
		this.errorMessage = err;
	}

	async getUser() {
		const { data } = await auth.getUser();
		if (data.email) {
			this.setUser(data);
			console.log(data);
		}
	}
}

export default new AuthStore();
