import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { upvoteBlog, downvoteBlog, removeBlog } from '../reducers/blogsReducer';
import AddCommentForm from '../components/AddCommentForm';

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
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
      <h3>Comments</h3>
      <AddCommentForm blog={blog} />
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
