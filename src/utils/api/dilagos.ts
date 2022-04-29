import axios from '../../core/axios';

export default {
	getAll: async () => await axios.get('/dialogs'),
};
