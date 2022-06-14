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
	deleteOneMessage: (id: string) => {
		return axios.delete(`/message/${id}`);
	},
	updateOneMessage: (id: string, text: string) => {
		return axios.post('/messageupdate', {
			id,
			text,
		});
	},
};
