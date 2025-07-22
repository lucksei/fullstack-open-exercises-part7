import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Blog from '../components/Blog';
import AddBlogForm from '../components/AddBlogForm';
import Toggleable from '../components/Toggleable';

import { logoutUser } from '../reducers/userReducer';

const Blogs = () => {
  const toggleRef = useRef();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();

    dispatch(logoutUser());
  };

  return (
    <>
      <h2>blogs</h2>
      <div>
        <span>{user.username} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Toggleable buttonLabel="new blog" ref={toggleRef}>
        <AddBlogForm />
      </Toggleable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            showDeleteButton={
              user.username === blog.user.username ? true : false
            }
          />
        ))}
      </div>
    </>
  );
};

export default Blogs;
