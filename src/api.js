export const getComments = async () => {
	return [
		{
			id: '1',
			body: 'First comment',
			username: 'Jack',
			userId: '1',
			parentId: null,
			createdAt: '2023-08-16T23:00:33.010+02:00',
		},
		{
			id: '2',
			body: 'Second comment',
			username: 'John',
			userId: '2',
			parentId: null,
			createdAt: '2023-08-16T23:00:33.010+02:00',
		},
		{
			id: '3',
			body: 'First comment first child',
			username: 'John',
			userId: '2',
			parentId: '1',
			createdAt: '2023-08-16T23:00:33.010+02:00',
		},
		{
			id: '4',
			body: 'Second comment second child',
			username: 'John',
			userId: '2',
			parentId: '2',
			createdAt: '2023-08-16T23:00:33.010+02:00',
		},
	];
};

export const createComment = async (text, parentId = null, currentUserId) => {
	return {
		id: Math.random().toString(36).substring(2, 11),
		body: text,
		parentId,
		userId: currentUserId,
		username: 'John',
		createdAt: new Date().toISOString(),
	};
};

export const updateComment = async (text) => {
	return { text };
};

export const deleteComment = async () => {
	return {};
};
