import { makeAutoObservable } from 'mobx';

import { User } from '../types';
import auth from '../utils/api/auth';
import dialgosStore from './dialgosStore';
import messagesStore from './messagesStore';

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
		if (
			data.message === 'Incorrect password or email' ||
			data.message === 'User not found' ||
			data.status === 'error'
		) {
			this.setErrorMessage(data.message);
		} else {
			localStorage.setItem('token', data.token);
			this.setUser(data.user);
		}
	}

	logOut() {
		dialgosStore.dialogues = [];
		dialgosStore.currentDialog = null;
		messagesStore.currentMessages = [];
		localStorage.removeItem('token');
		this.user = {};
		this.isAuth = false;
	}

	setErrorMessage(err: string) {
		this.errorMessage = err;
	}

	async getUser() {
		const { data } = await auth.getUser();
		if (data.email) {
			this.setUser(data);
		}
	}
}

export default new AuthStore();
