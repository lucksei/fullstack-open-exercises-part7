import { useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Toggleable from './Toggleable';

const BlogList = ({ user, setUser }) => {
  const blogs = useSelector((state) => state.blogs);
  const toggleRef = useRef();

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  return (
    <>
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

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default BlogList;
