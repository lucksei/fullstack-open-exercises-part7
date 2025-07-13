import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBlog, upvoteBlog, downvoteBlog } from '../reducers/blogsReducer';

const Blog = ({ blog, showDeleteButton }) => {
  const dispatch = useDispatch();
  const [extended, setExtended] = useState(true);

  const toggleExtended = () => {
    setExtended(!extended);
  };

  const handleUpvote = () => {
    dispatch(upvoteBlog(blog));
  };

  const handleDownvote = () => {
    dispatch(downvoteBlog(blog));
  };

  const handleDeleteBlog = () => {
    dispatch(removeBlog(blog));
  };

  return (
    <>
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={toggleExtended} className="btn-toggle-show">
          {extended ? 'show' : 'hide'}
        </button>
        <div style={{ display: extended ? 'none' : '' }}>
          <a href={blog.url} className="url">
            {blog.url}
          </a>{' '}
          <div className="likes">
            likes {blog.likes}
            <button className="btn-like" onClick={handleUpvote}>
              ▲
            </button>
            <button className="btn-dislike" onClick={handleDownvote}>
              ▼
            </button>
          </div>
          <div>{blog.user.username}</div>
          {showDeleteButton ? (
            <button type="button" onClick={handleDeleteBlog}>
              delete
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Blog;
