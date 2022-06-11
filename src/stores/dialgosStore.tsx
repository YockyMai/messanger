import { action, flow, makeObservable, observable } from 'mobx';
import React from 'react';
import { dialogsItem } from '../types';
import { dialogs } from '../utils/api';
import authStore from './authStore';
import messagesStore from './messagesStore';

class DialogsStore {
	dialogues: dialogsItem[] = [];
	currentDialog: dialogsItem | null = null;

	constructor() {
		makeObservable(this, {
			dialogues: observable,
			currentDialog: observable,
			fetchDialogs: action.bound,
			setDialogs: action,
			setCurrentDialog: action,
		});
	}

	fetchDialogs() {
		dialogs
			.getAll()
			.then(res => {
				this.setDialogs(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}

	createDialog(partnerId: string, messageText: string) {
		dialogs
			.createDialog(partnerId, messageText)
			.then(res => {
				console.log(res);
				this.addDialog(res.data.dialogs);
				this.setCurrentDialog(res.data.dialogs);
			})
			.catch(e => {
				console.log(e);
			});
	}

	setDialogs(dialogs: []) {
		this.dialogues = dialogs;
	}

	addDialog(dialog: dialogsItem) {
		this.dialogues.unshift(dialog);
	}

	setCurrentDialog(dialog: dialogsItem) {
		this.currentDialog = dialog;
		// messagesStore.fetchMessages(dialog._id);
	}
}

export default new DialogsStore();
