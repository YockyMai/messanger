export interface dialogsItem {
	_id: string;
	unreaded: 1;
	message: {
		user: any;
		text: string;
		createdAt: string;
	};

	// message: {
	// 	user: {
	// 		_id: string;
	// 		fullname: string;
	// 		avatar: string | null;
	// 		isOnline: boolean;
	// 	};
	// 	text: string;
	// 	created_at: string;
	// };
}
export interface messageItem {
	_id: string;
	text: string;
	attachments: [] | null;
	createdAt: string;
	user: {
		_id: string;
		fullname: string;
		avatar: string | null;
	};
	audio?: string;
	dialogs: string;
}

export interface User {
	_id: string;
	email: string;
	fullname: string;
	password: string;
	confirmed: boolean;
	last_seen: string;
	createdAt: string;
	updatedAt: string;
	avatar?: string;
}
