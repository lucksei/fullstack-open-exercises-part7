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
    <div className="">
      <h3>Create New</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="title">Title</label>
          <input
            id="title"
            className="input-title"
            type="text"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label for="author">Author</label>
          <input
            id="author"
            className="input-author"
            type="text"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label for="url">Url</label>
          <input
            className="input-url"
            type="text"
            value={url}
            name="Url"
            placeholder="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="mt-2" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddBlogForum;
