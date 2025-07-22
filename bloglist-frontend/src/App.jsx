import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
} from 'react-router-dom';

import LoginForm from './views/LoginForm';
import Blogs from './views/Blogs';
import Users from './views/Users';
import Notification from './components/Notification';

import './app.css';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUser } from './reducers/userReducer';

const AuthRequired = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        console.log('not logged in');
        await navigate('/login');
      }
    };
    checkUser();
  }, [user, navigate]);

  return user ? <Outlet /> : null;
};

const RedirectBlogs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/blogs');
  }, [navigate]);
  return null;
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Notification />
      <Routes>
        <Route path="/" element={<RedirectBlogs />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<AuthRequired user={user} />}>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
