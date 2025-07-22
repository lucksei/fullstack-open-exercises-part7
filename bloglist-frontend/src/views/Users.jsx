import _ from 'lodash';

import { useSelector } from 'react-redux';

const Users = () => {
  const blogs = useSelector((state) => state.blogs);

  const users = _(blogs)
    .groupBy('user.username')
    .map((items, user) => {
      console.log(user);
      return {
        user: user,
        blogCount: items.length,
      };
    })
    .value();

  console.log(users);
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <th>User</th>
          <th>blogs created</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user}>
              <td>{user.user}</td>
              <td>{user.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
