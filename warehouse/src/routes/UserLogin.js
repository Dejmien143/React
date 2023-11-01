import React, { useState, useEffect, useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";
import '../App.css';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const { usern, setUser } = useContext(UserContext);
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

  const navigate = useNavigate();

  const fetchUsers = () => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log('Error fetching users:', error));


  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (users.find((user) => user.user === username && user.pwd === password)) {
      
      setLoggedIn(true);
      setUser(username);
      localStorage.setItem('user', username);
      console.log('logged in', isLoggedIn);
      console.log('Login successful');
      if (isLoggedIn === true) { navigate('/list'); }
    } else {
      
      console.log('Incorrect username or password');
    }


  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div style={{ width: '10px' }}></div>
          <LinkContainer to="/">
            <button className="btn btn-secondary">Cancel</button>
          </LinkContainer>
        </div>
      </form>
    </div>

  );


};

export default UserLogin;
