// Navbar.js

import React from 'react';
// import { Link } from 'react-router-dom';
import Capture3 from '../assets/Capture3.PNG';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><img className='myimage3' src={Capture3} alt="logo" />
        <button id='logout'>Log out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
