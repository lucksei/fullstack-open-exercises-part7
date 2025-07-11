import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Toggleable from './Toggleable';

const BlogList = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const toggleRef = useRef();

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  // const handleAddBlog = async (newBlog) => {
  //   const newBlogResponse = await blogService.create(newBlog);
  //   setBlogs(sortBlogsByLikes(blogs.concat(newBlogResponse)));
  //   toggleRef.current.toggleVisibility();
  // };

  const handleEditBlog = async (editedBlog) => {
    await blogService.update(editedBlog);
    setBlogs(
      sortBlogsByLikes(
        blogs.map((blog) => (blog.id === editedBlog.id ? editedBlog : blog)),
      ),
    );
  };

  const handleDeleteBlog = async (deleteBlog) => {
    if (!window.confirm(`delete blog ${deleteBlog.name}?`)) {
      return;
    }
    blogService.remove(deleteBlog.id);
    setBlogs(blogs.filter((blog) => blog.id !== deleteBlog.id));
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
            handleDeleteBlog={handleDeleteBlog}
            handleEditBlog={handleEditBlog}
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
