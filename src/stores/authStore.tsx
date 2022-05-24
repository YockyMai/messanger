import { makeAutoObservable } from 'mobx';

class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}
}

export default new AuthStore();
