/* eslint-disable react/prop-types */
import { useState } from 'react';

const CommentForm = ({ handleSubmit, submitLabel }) => {
	const [text, setText] = useState('');
	const isTextareaDisabled = text.length === 0;
	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmit(text);
		setText('');
	};

	return (
		<form onSubmit={onSubmit}>
			<textarea className='comment-form-textarea' value={text} onChange={(e) => setText(e.target.value)}></textarea>
			<button disabled={isTextareaDisabled} className='comment-form-button'>
				{submitLabel}
			</button>
		</form>
	);
};
export default CommentForm;
