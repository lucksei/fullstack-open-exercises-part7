import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

const User = () => {
  const users = useSelector((state) => state.users);
  const { id } = useParams();

  const user = _.find(users, (u) => u.id === id);

  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
