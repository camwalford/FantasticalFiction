import React from 'react';
import Logo from "../img/logo.png";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';

const Nav = () => {

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='nav'>
        <div className="container">
            <div className="logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="links">
                <Link className="link" to="/booklist"><h6>LISTS</h6></Link>
                <Link className="link" to="/?cat=popular"><h6>BOOKS</h6></Link>
                <Link className="link" to="/search"><h6>SEARCH</h6></Link>

                {/* DISPLAY CURRENT USERNAME */}
                <span>{currentUser?.username}</span>
                {/* DISPLAY LOG IN IF USER LOGGED OUT, VICE VERSA */}
                {currentUser ? (<span onClick={logout}>Logout</span>) : (<Link className="link" to="/login">Login</Link>)}
            </div>
        </div>
    </div>
  )
}

export default Nav