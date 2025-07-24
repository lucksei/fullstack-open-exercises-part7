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
    <div className="flex flex-col border border-gray-300 rounded-md shadow-lg w-auto">
      {/* Header */}
      <div className="flex flex-row justify-between p-2 bg-gray-100">
        <h3 className="no-style text-xl text-slate-600">
          <span className="font-semibold">{blog.title}</span>
          <span className="mx-2">{'-'}</span>
          <span>{blog.author}</span>
        </h3>
        {user.username === blog.user.username ? (
          <button
            type="button"
            onClick={handleDeleteBlog}
            className="no-style bg-red-500 hover:bg-red-700 text-white tracking-wide font-bold pt-0.5 pb-1 px-6 rounded w-max cursor-pointer">
            delete
          </button>
        ) : null}
      </div>
      {/* Content */}
      <div className="pb-4 ps-4 pe-12 ">
        <p>
          <span className="mr-2">URL:</span>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          <span className="mr-2">Likes:</span>
          <span>{blog.likes}</span>
          <span className="mx-2">
            <button
              className="no-style shadow-md border-l border-t border-b border-slate-400 hover:outline-2 outline-slate-400 pt-0.5 pb-1 px-2 rounded-l w-max cursor-pointer"
              onClick={handleUpvote}>
              ▲
            </button>
            <button
              className="no-style shadow-md border-r border-t border-b border-slate-400 hover:outline-2 outline-slate-400 pt-0.5 pb-1 px-2 rounded-r w-max cursor-pointer"
              onClick={handleDownvote}>
              ▼
            </button>
          </span>
        </p>
        <div>
          Added by <span className="font-semibold">{blog.user.username}</span>
        </div>
      </div>
      <h3>Comments</h3>
      <AddCommentForm blog={blog} />
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
