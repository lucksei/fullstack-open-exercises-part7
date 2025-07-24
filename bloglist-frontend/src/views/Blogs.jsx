import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AddBlogForm from '../components/AddBlogForm';
import Toggleable from '../components/Toggleable';

const Blogs = () => {
  const toggleRef = useRef();

  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <Toggleable buttonLabel="New Blog" ref={toggleRef}>
        <AddBlogForm />
      </Toggleable>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} className="blog">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
