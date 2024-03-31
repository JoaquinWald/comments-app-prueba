import { useState, useEffect } from 'react';
import { getComments as getCommentsApi, createComment as createCommentApi } from '../api';
import Comment from './Comment';
import CommentForm from './CommentForm';

/* eslint-disable react/prop-types */
const Comments = ({ currentUserId }) => {
	const [backendComments, setBackendComments] = useState([]);
	const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
	// console.log(rootComments);

	const getReplies = (commentID) => {
		return backendComments
			.filter((backendComment) => backendComment.parentId === commentID)
			.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
	};

	const addComment = (text, parentId) => {
		// console.log('addComment', text, parentId);
		createCommentApi(text, parentId).then((comment) => {
			setBackendComments([comment, ...backendComments]);
		});
	};

	useEffect(() => {
		getCommentsApi().then((data) => {
			setBackendComments(data);
		});
	}, []);

	return (
		<div className='comments'>
			<h3 className='comments-title'>Comments</h3>
			<div className='comment-form-title'>Write comment</div>
			<CommentForm submitLabel='Write' handleSubmit={addComment} />
			<div className='comments-container'>
				{/* Por cada comentario principal (rootComment), renderiza un componente Comment. */}
				{rootComments.map((rootComment) => (
					<Comment key={rootComment.id} comment={rootComment} replies={getReplies(rootComment.id)} />
				))}
			</div>
		</div>
	);
};
export default Comments;
