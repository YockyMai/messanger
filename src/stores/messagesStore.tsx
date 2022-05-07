import axios from 'axios';
import { action, flow, makeObservable, observable } from 'mobx';
import { messageItem } from '../types';
import { messages } from '../utils/api';
import dialgosStore from './dialgosStore';

class MessagesStore {
	currentMessages: messageItem[] = [];
	constructor() {
		makeObservable(this, {
			currentMessages: observable,
			fetchMessages: action.bound,
			setMessages: action,
		});
	}

	fetchMessages(_id: string) {
		messages
			.getAllById(_id)
			.then(res => {
				this.setMessages(res.data);
				console.log(res);
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
}

export default new MessagesStore();
