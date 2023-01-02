import React from 'react';
import Logo from "../img/logo.png";
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='nav'>
        <div className="container">
            <div className="logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="links">
                <Link className="link" to="/?cat=top"><h6>TOP RATED</h6></Link>
                <Link className="link" to="/?cat=popular"><h6>MOST POPULAR</h6></Link>
                <Link className="link" to="/search"><h6>SEARCH</h6></Link>
                <span>Cameron</span>
                <span>Logout</span>
            </div>
        </div>
    </div>
  )
}

export default Nav