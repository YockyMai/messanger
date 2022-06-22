import axios from 'axios';
import { action, flow, makeObservable, observable } from 'mobx';
import { messageItem } from '../types';
import { messages } from '../utils/api';
import authStore from './authStore';
import dialgosStore from './dialogsStore';

class MessagesStore {
	currentMessages: messageItem[] = [];
	isLoaded: boolean = false;

	constructor() {
		makeObservable(this, {
			currentMessages: observable,

			fetchMessages: action.bound,
			setMessages: action,
		});
	}

	fetchMessages(_id: string) {
		this.isLoaded = true;
		messages
			.getAllById(_id)
			.then(res => {
				this.setMessages(res.data);
			})
			.catch(err => {
				console.log(err);
				this.isLoaded = false;
			});
	}

	sendMessage(message: any) {
		if (dialgosStore.currentDialog?._id)
			messages
				.createMessage(message, dialgosStore.currentDialog?._id)
				.then(res => {
					this.currentMessages.push(res.data);
				});
	}

	handleNewMessage(message: any) {
		if (dialgosStore.currentDialog?._id === message.dialog._id) {
			this.addMessage(message);
		}
	}

	setMessages(dialogs: messageItem[]) {
		this.currentMessages = dialogs;
		this.isLoaded = false;
	}

	addMessage(message: any) {
		this.currentMessages.push(message);
	}

	deleteMessage(messageId: any) {
		this.currentMessages = this.currentMessages.filter(
			el => el._id !== messageId,
		);
	}

	updateMessage(index: number, updatedMessage: messageItem) {
		this.currentMessages[index] = updatedMessage;
	}

	updateUnreadStatus(dialogId: string) {
		this.currentMessages.forEach(msg => {
			if (msg.unread === false || msg.user._id !== authStore.user._id)
				msg.unread = true;
		});
		dialgosStore.dialogues.forEach(el => {
			if (el._id === dialogId && el.lastMessage) {
				el.lastMessage!.unread = false;
			}
		});
	}
}

export default new MessagesStore();
