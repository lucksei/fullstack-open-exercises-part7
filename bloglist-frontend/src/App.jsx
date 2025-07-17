import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import './app.css';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUser } from './reducers/userReducer';

const AuthRequired = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
};

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
    <BrowserRouter>
      <Notification />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="" element={<AuthRequired user={user} />}>
          <Route path="/blogs" element={<BlogList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
