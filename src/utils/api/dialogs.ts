import axios from '../../core/axios';

export default {
	getAll: () => {
		return axios.get('/dialog');
	},
	createDialog: (partnerId: string, messageText: string) => {
		return axios.post('/dialog', {
			partner: partnerId,
			text: messageText,
		});
	},
};
