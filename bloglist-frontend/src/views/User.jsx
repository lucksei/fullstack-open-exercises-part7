import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import _ from 'lodash';

const User = () => {
  const users = useSelector((state) => state.users);
  const { id } = useParams();

  const user = _.find(users, (u) => u.id === id);

  return (
    <>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <span className="font-semibold">{blog.title}</span>
            </Link>
            <span className="mx-2">{'-'}</span>
            <span> {blog.author}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default User;
