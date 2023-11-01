import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import '../App.css';

const UserRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (users.find((user) => user.user === username)) {
      console.log('Username already exists');
      return;
    }

    try {
      const newUser = { user: username, pwd: password };
      await axios.post('http://localhost:5000/users', newUser);


      console.log('User registered successfully');

      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
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
            Register
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

export default UserRegister;