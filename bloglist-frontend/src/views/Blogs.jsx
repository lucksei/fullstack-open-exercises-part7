import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AddBlogForm from '../components/AddBlogForm';
import Toggleable from '../components/Toggleable';

const Blogs = () => {
  const toggleRef = useRef();

  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="p-3">
      <Toggleable buttonLabel="New Blog" ref={toggleRef}>
        <AddBlogForm />
      </Toggleable>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <span className="font-semibold">{blog.title}</span>
            </Link>
            <span className="mx-2">{'-'}</span>
            <span> {blog.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
