import { action, makeObservable, observable } from 'mobx';
import { dialogsItem } from '../types';
import { dialogs } from '../utils/api';

class DialogsStore {
	dialogues: dialogsItem[] = [];
	currentDialog: dialogsItem | null = null;
	dialogsIsLoaded: boolean = false;

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
		this.dialogsIsLoaded = true;
		dialogs
			.getAll()
			.then(res => {
				this.setDialogs(res.data);
				this.dialogsIsLoaded = false;
			})
			.catch(err => {
				console.log(err);
				this.dialogsIsLoaded = false;
			});
	}

	createDialog(partnerId: string, messageText: string) {
		dialogs
			.createDialog(partnerId, messageText)
			.then(res => {
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
