import { useState, useEffect } from 'react';
import {
	getComments as getCommentsApi,
	createComment as createCommentApi,
	deleteComment as deleteCommentApi,
	updateComment as updateCommentApi,
} from '../api';
import Comment from './Comment';
import CommentForm from './CommentForm';

/* eslint-disable react/prop-types */
const Comments = ({ currentUserId }) => {
	const [backendComments, setBackendComments] = useState([]);
	const [activeComment, setActiveComment] = useState(null);

	const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);

	const getReplies = (commentID) => {
		return backendComments
			.filter((backendComment) => backendComment.parentId === commentID)
			.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
	};

	const addComment = (text, parentId) => {
		// console.log('addComment', text, parentId);
		createCommentApi(text, parentId, currentUserId).then((comment) => {
			setBackendComments([comment, ...backendComments]);
			setActiveComment(null);
		});
	};

	const deleteComment = (commentID) => {
		if (window.confirm('Are you sure that you want to remove comment?')) {
			deleteCommentApi(commentID).then(() => {
				const updateBackendComment = backendComments.filter((backendComment) => backendComment.id !== commentID);
				setBackendComments(updateBackendComment);
			});
		}
	};

	const updateComment = (text, commentID) => {
		updateCommentApi(text, commentID).then(() => {
			const updateBackendComment = backendComments.map((backendComment) => {
				if (backendComment.id === commentID) {
					return { ...backendComment, body: text };
				}
				//debo poner este return backendComment; ya que los métodos (map,etc.) así lo exigen, como en este caso no puedo ponerlo de manera implícita entre paréntesis xq dentro hay una lógica un poco más compleja.
				return backendComment;
			});
			setBackendComments(updateBackendComment);
			setActiveComment(null);
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
					<Comment
						key={rootComment.id}
						comment={rootComment}
						replies={getReplies(rootComment.id)}
						currentUserId={currentUserId}
						deleteComment={deleteComment}
						activeComment={activeComment}
						setActiveComment={setActiveComment}
						addComment={addComment}
						updateComment={updateComment}
					/>
				))}
			</div>
		</div>
	);
};
export default Comments;
