import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../reducers/userReducer';

const LoginForm = () => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  return (
    <div className="flex justify-center pt-10">
      <div className="flex flex-col border border-gray-300 rounded-md m-2 py-4 ps-4 pe-12 shadow-lg w-max">
        <h2>Log in to Application</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              placeholder="username"
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              placeholder="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
