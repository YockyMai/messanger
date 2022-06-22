import { makeAutoObservable } from 'mobx';
import authStore from './authStore';

class UserStore {
	constructor() {
		makeAutoObservable(this);
	}

	setAvatar(path: string) {
		authStore.user.avatar = path;
	}
}

export default new UserStore();
