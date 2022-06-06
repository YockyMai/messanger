import axios from '../../core/axios';

export default {
	getFilteredUsers: async (username: string, limit: number) => {
		return await axios.get(`/find/user/${username}/${limit}`);
	},
};
