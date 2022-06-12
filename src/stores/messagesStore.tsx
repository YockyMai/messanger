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
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleNewMessage(message: any) {
		if (dialgosStore.currentDialog?._id === message.dialog._id) {
			this.addMessage(message);
		}
	}

	setMessages(dialogs: messageItem[]) {
		this.currentMessages = dialogs;
	}

	addMessage(message: any) {
		this.currentMessages.push(message);
	}

	sendMessage(message: any) {
		if (dialgosStore.currentDialog?._id)
			messages
				.createMessage(message, dialgosStore.currentDialog?._id)
				.then(res => {
					this.currentMessages.push(res.data);
					console.log(res);
				});
	}
}

export default new MessagesStore();
