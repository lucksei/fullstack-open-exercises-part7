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
      <div className="fixed top-0 left-0 z-10 flex flex-row items-center justify-start gap-4 bg-slate-300 p-2 w-full shadow-lg">
        <Link to="/blogs" style={{ textDecoration: 'none' }}>
          <span className="no-underline hover:underline underline-offset-7 text-slate-900 font-semibold tracking-widest">
            blogs
          </span>
        </Link>
        <Link to="/users" style={{ textDecoration: 'none' }}>
          <span className="no-underline hover:underline underline-offset-7 text-slate-900 font-semibold tracking-widest">
            users
          </span>
        </Link>
        <div className="flex flex-row items-center gap-2 ml-auto">
          <span className="text-slate-700">
            User{' '}
            <span className="font-semibold text-blue-600">{user.username}</span>{' '}
            logged in
          </span>

          <div
            role="button"
            className="bg-slate-800 hover:bg-slate-600 text-white tracking-wide text-sm pt-0.5 pb-1 px-3 rounded w-max cursor-pointer"
            onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
