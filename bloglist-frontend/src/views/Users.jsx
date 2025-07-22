import _ from 'lodash';

import { useSelector } from 'react-redux';

const Users = () => {
  const blogs = useSelector((state) => state.blogs);

  const result = _(blogs)
    .groupBy('user')
    .map((items, user) => {
      return {
        user,
        blogCount: items.length,
      };
    });
  console.log(result);
  return <div>Users</div>;
};

export default Users;
