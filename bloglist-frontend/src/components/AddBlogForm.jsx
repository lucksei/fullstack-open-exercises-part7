import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createBlog } from '../reducers/blogsReducer';

const AddBlogForum = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    dispatch(createBlog(newBlog));
  };

  return (
    <>
      <h3>create new</h3>
      <form onSubmit={handleSubmit} className="blog-form">
        <div>
          title:
          <input
            className="input-title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            className="input-author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            className="input-url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="btn-submit" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default AddBlogForum;
