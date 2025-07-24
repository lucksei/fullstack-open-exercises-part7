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
    setContent('');
  };
  return (
    <form className="flex flex-row w-full">
      <input
        type="text"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        className="no-style bg-white focus:border-3 focus:outline-none focus:border-blue-600 border-t border-b border-l border-gray-300 rounded-tl-md rounded-bl-md py-2 px-4 block w-full appearance-none leading-normal"></input>
      <button
        type="submit"
        onClick={handleSubmit}
        className="no-style bg-blue-500 hover:bg-blue-700 text-white text-nowrap tracking-wide font-bold pt-0.5 pb-1 px-6 rounded-tr rounded-br w-max cursor-pointer">
        Add Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
