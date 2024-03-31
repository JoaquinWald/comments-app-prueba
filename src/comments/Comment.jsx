/* eslint-disable react/prop-types */
const Comment = ({ comment, replies }) => {
	// console.log('replies', replies);
	// Renderiza el contenido del comentario y luego, si hay respuestas, renderiza recursivamente el componente Comment para cada respuesta.

	return (
		<div className='comment'>
			<div className='comment-image-container'>
				<img src='/user-icon.png' alt='' />
			</div>

			<div className='comment-right-part'>
				<div className='comment-content'>
					<div className='comment-author'>{comment.username}</div>
					<div>{comment.createdAt}</div>
				</div>

				<div className='comment-text'>{comment.body}</div>

				<div className='replies'>
					{replies?.map((reply) => (
						<Comment comment={reply} key={reply.id} />
					))}
				</div>
			</div>
		</div>
	);
};
export default Comment;
