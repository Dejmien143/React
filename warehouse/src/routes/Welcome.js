import React from 'react';


const Welcome = () => {
  

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        borderRadius: '5px',
      }}
    >
      <h2
        style={{
          color: '#333',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Welcome to the Warehouse Management System!
      </h2>
      <p
        style={{
          color: '#777',
          fontSize: '18px',
          marginTop: '10px',
        }}
      >
        Please register and login to acces the system or login if you already have an account
      </p>
    </div>

  );
};

export default Welcome;
