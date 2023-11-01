import { Navbar, Nav } from 'react-bootstrap';
import { UserContext } from "./App";
import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
const AppNavbar = () => {
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);
  const { usern, setUser } = useContext(UserContext);
  useEffect(() => {
    fetchProducts();
  }, []);

  const [users, setUsers] = useState({
    id: 0,
    user: '',
    pwd: '',
  });

  const [foundUserId, setFoundUserId] = useState(null);

  const findUserIdByUsername = async (username) => {
    const foundUser = users.find((user) => user.user === username);
    if (foundUser) {
      setFoundUserId(foundUser.id);
    } else {
      setFoundUserId(null);
    }
  };


  const fetchProducts = async () => {
    await fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log('Error fetching users:', error));


  };

  const handleLogout = () => {
    
    setLoggedIn(false);
    localStorage.removeItem('user');
    console.log('Logged out');
  };

  const handleDeleteAccount = async () => {
    await findUserIdByUsername(usern);
  };

  useEffect(() => {
    if (foundUserId) {
      deleteAccount(foundUserId);
    }
  }, [foundUserId]);

  const deleteAccount = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      console.log('Account deleted');
      setLoggedIn(false);
      localStorage.removeItem('user');
      console.log('Logged out');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  
  const renderLoginNavbar = () => (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/" style={{ marginLeft: '1em' }}>Warehouse Management</Navbar.Brand>

      <Nav className="mr-auto" style={{ marginRight: '1em' }}>

        <Button variant="outline-light" style={{ marginRight: '1em' }} href="/login">Login</Button>
        <Button variant="outline-light" href="/register">Register</Button>
      </Nav>
    </Navbar>
  );

  
  const renderLoggedInNavbar = () => (
    <Navbar bg="dark" variant="dark" >
      <Navbar.Brand href="/" style={{ marginLeft: '1em' }}>Warehouse Management</Navbar.Brand>
      <Nav className="mr-auto" style={{ marginRight: '1em' }}>
        <Button variant="outline-light" style={{ marginRight: '1em' }} onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="outline-light" onClick={handleDeleteAccount}>
          Delete account
        </Button>
      </Nav>

    </Navbar>

  );

  return isLoggedIn ? renderLoggedInNavbar() : renderLoginNavbar();
};

export default AppNavbar;
