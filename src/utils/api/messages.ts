import axios from '../../core/axios';

export default {
	getAll: async () => await axios.get('/messages'),
	getAllById: async (id: string) =>
		await axios.get(`/messages?dialogs=${id}`),
};
