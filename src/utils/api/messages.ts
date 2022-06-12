import axios from '../../core/axios';

export default {
	getAll: async () => await axios.get('/messages'),
	getAllById: (id: string) => {
		return axios.get(`/message/${id}`);
	},
	createMessage: (text: string, dialogID: string) => {
		return axios.post('/message', {
			text,
			dialogID,
		});
	},
};
