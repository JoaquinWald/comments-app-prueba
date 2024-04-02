import CommentForm from './CommentForm';

/* eslint-disable react/prop-types */
const Comment = ({ comment, replies, currentUserId, deleteComment, activeComment, setActiveComment, parentId = null, addComment, updateComment }) => {
	// Renderiza el contenido del comentario y luego, si hay respuestas, renderiza recursivamente el componente Comment (este) para cada respuesta.
	const fiveMinutes = 300000;
	const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;

	const canReply = Boolean(currentUserId);
	const canEdit = currentUserId === comment.userId && !timePassed;
	const canDelete = currentUserId === comment.userId && !timePassed;
	const createdAt = new Date(comment.createdAt).toLocaleDateString();
	const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id;
	const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id;
	const replyId = parentId ? parentId : comment.id;

	return (
		<div className='comment'>
			<div className='comment-image-container'>
				<img src='/user-icon.png' alt='' />
			</div>

			<div className='comment-right-part'>
				<div className='comment-content'>
					<div className='comment-author'>{comment.username}</div>
					<div>{createdAt}</div>
				</div>

				{!isEditing && <div className='comment-text'>{comment.body}</div>}
				{isEditing && (
					<CommentForm
						submitLabel='Update'
						hasCancelButton
						initialText={comment.body}
						handleSubmit={(text) => updateComment(text, comment.id)}
						handleCancel={() => setActiveComment(null)}
					/>
				)}

				<div className='comment-actions'>
					{canReply && (
						<div className='comment-action' onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>
							Reply
						</div>
					)}
					{canEdit && (
						<div className='comment-action' onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>
							Edit
						</div>
					)}
					{canDelete && (
						<div className='comment-action' onClick={() => deleteComment(comment.id)}>
							Delete
						</div>
					)}
				</div>

				{isReplying && <CommentForm submitLabel={'Reply'} handleSubmit={(text) => addComment(text, replyId)} />}

				<div className='replies'>
					{replies?.map((reply) => (
						<Comment
							comment={reply}
							key={reply.id}
							currentUserId={currentUserId}
							deleteComment={deleteComment}
							parentId={comment.id}
							addComment={addComment}
							activeComment={activeComment}
							setActiveComment={setActiveComment}
							updateComment={updateComment}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export default Comment;
