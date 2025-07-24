import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createComment } from '../reducers/blogsReducer';

const AddCommentForm = ({ blog }) => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      content: content,
    };
    dispatch(createComment(blog, newComment));
  };
  return (
    <form>
      <input
        type="text"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}></input>
      <button type="submit" onClick={handleSubmit}>
        add comment
      </button>
    </form>
  );
};

export default AddCommentForm;
