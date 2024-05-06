// Navbar.js

import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Capture3 from '../assets/Capture3.PNG';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';


const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session/token here
    // For example, if using localStorage:
    localStorage.removeItem('token');

    // Redirect the user to the login page or homepage
    navigate('/signin');
  };

  return (
    <nav>
      <ul>
        <li><img className='myimage3' src={Capture3} alt="logo" />
        <button id='logout' onClick={handleLogout}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
