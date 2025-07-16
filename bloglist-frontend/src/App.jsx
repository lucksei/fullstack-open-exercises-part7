import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import './app.css';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  return (
    <div>
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          <BlogList />
        </>
      )}
    </div>
  );
};

export default App;
