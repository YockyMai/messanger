import axios from 'axios';
import { action, flow, makeObservable, observable } from 'mobx';
import { messageItem } from '../types';
import { messages } from '../utils/api';
import dialgosStore from './dialgosStore';

class MessagesStore {
	currentMessages: messageItem[] = [];
	loaded = false;
	constructor() {
		makeObservable(this, {
			currentMessages: observable,
			loaded: observable,
			fetchMessages: action.bound,
			setMessages: action,
			setLoaded: action,
		});
	}

	fetchMessages(_id: string) {
		messages
			.getAllById(_id)
			.then(res => {
				this.setMessages(res.data);
				this.setLoaded();
			})
			.catch(err => {
				console.log(err);
			});
	}

	setMessages(dialogs: messageItem[]) {
		this.currentMessages = dialogs;
	}

	sendMessage(message: messageItem) {
		this.currentMessages.push(message);
	}

	setLoaded() {
		this.loaded = true;
	}
}

export default new MessagesStore();
