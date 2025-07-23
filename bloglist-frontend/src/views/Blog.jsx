import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { upvoteBlog, downvoteBlog, removeBlog } from '../reducers/blogsReducer';

const Blog = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const { id } = useParams();
  const blog = _.find(blogs, (b) => b.id === id);

  const handleUpvote = () => {
    dispatch(upvoteBlog(blog));
  };

  const handleDownvote = () => {
    dispatch(downvoteBlog(blog));
  };

  const handleDeleteBlog = () => {
    dispatch(removeBlog(blog));
  };

  if (!blog) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
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
      <div>Added by {blog.user.username}</div>
      {user.username === blog.user.username ? (
        <button type="button" onClick={handleDeleteBlog}>
          delete
        </button>
      ) : null}
    </>
  );
};

export default Blog;
