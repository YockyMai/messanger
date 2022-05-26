import { action, flow, makeObservable, observable } from 'mobx';
import React from 'react';
import { dialogsItem } from '../types';
import { dialogs } from '../utils/api';
import messagesStore from './messagesStore';

class DialogsStore {
	dialogues: dialogsItem[] = [];
	currentDialog = '';
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
				this.setCurrentDialog(res.data[0]._id);
			})
			.catch(err => {
				console.log(err);
			});
	}

	setDialogs(dialogs: []) {
		this.dialogues = dialogs;
	}

	setCurrentDialog(_id: string) {
		this.currentDialog = _id;
		messagesStore.fetchMessages(_id);
	}
}

export default new DialogsStore();
