import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import AddBlogForm from '../components/AddBlogForm';
import Toggleable from '../components/Toggleable';

const Blogs = () => {
  const toggleRef = useRef();
  const navigate = useNavigate();

  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="p-3">
      <Toggleable buttonLabel="New Blog" ref={toggleRef}>
        <AddBlogForm />
      </Toggleable>
      <ul>
        {blogs.map((blog) => (
          <li
            key={blog.id}
            role="button"
            onClick={() => navigate(`/blogs/${blog.id}`)}
            className="cursor-pointer">
            <span className="font-semibold"> {blog.title}</span>
            <span className="mx-2">{'-'}</span>
            <span> {blog.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
