import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { createContext, useState, useEffect } from 'react';
import ProductList from "./routes/ProductList";
import ProductForm from "./routes/ProductAdd";
import ProductEdit from "./routes/ProductEdit";
import UserLogin from "./routes/UserLogin";
import UserRegister from "./routes/UserRegister";
import Welcome from "./routes/Welcome";
import AppNavbar from './Navbar';

export const UserContext = createContext({
  usern: '',
  setUser: () => { },
  isLoggedIn: false,
  setLoggedIn: () => { },
});

function App() {

  const [usern, setUser] = useState(0);

  const [isLoggedIn, setLoggedIn] = useState(false);

  const value = {
    usern,
    setUser,
    isLoggedIn,
    setLoggedIn
  };



  useEffect(() => {

    const user = localStorage.getItem('user');
    if (user) {
      setUser(user);
      setLoggedIn(true);
    }
  }, []);



  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <AppNavbar />

        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <ProductList /> : <Welcome />}
          />

          <Route
            path="/add"
            element={isLoggedIn ? <ProductForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <UserLogin /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <UserRegister /> : <Navigate to="/" />}
          />
          <Route
            path="/edit/:id"
            element={isLoggedIn ? <ProductEdit /> : <Navigate to="/login" />}
          />
        </Routes>

      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;