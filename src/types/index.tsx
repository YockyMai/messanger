export interface dialogsItem {
	_id: string;
	unreaded: 1;
	message: {
		user: any;
		text: string;
		created_at: Date;
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
	dialogs: string;
}
