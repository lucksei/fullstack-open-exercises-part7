import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import blogService from './services/blogs';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import './app.css';
import { initializeBlogs } from './reducers/blogsReducer';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const handleSetUser = (user) => {
    blogService.setToken(user.token);
    setUser(user);
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      handleSetUser(user);
    }
  }, [setUser]);

  return (
    <div>
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm handleSetUser={handleSetUser} />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          <BlogList user={user} setUser={setUser} />
        </>
      )}
    </div>
  );
};

export default App;
