import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Capture1 from '../assets/Capture1.PNG';
import Capture2 from '../assets/Capture2.PNG';

const Header = () => {

  const location = useLocation();

  const pathsToHideHeader = ['/hospital-registration'];

  if(pathsToHideHeader.includes(location.pathname)){
    return null;
  }

  return (
    <div>
        <img className='myimage1' src={Capture1} />
        <img className='myimage2' src={Capture2} />
      <Link to={"/"}>
        <span className='signup'>Sign Up</span>
        </Link>
        <span className='or'>/</span>
        <Link to={"/signin"}>
          <span className='login'>Login</span>
        </Link>
        <Link to={"/capture"}></Link>
    </div>
  )
}

export default Header;
