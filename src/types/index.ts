export interface dialogsItem {
	_id: string;
	unreaded: number;
	author: User;
	partner: User;
	createdAt: string;
	updatedAt: string;
	lastMessage?: messageItem;
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
	updatedAt: string;
	user: User;
	audio?: string;
	dialog: dialogsItem;
	updated?: boolean;
	unread: boolean;
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
