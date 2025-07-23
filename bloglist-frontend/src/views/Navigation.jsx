import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../reducers/userReducer';

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  if (!user) {
    return null;
  }

  const style = {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    backgroundColor: 'lightgray',
    padding: '0.2rem',
  };

  return (
    <>
      <div style={style}>
        <Link to="/blogs">blogs</Link>
        <Link to="/users">users</Link>
        <span>{user.username} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </>
  );
};

export default Navigation;
