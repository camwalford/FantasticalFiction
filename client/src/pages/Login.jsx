import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="auth">
        <h1>Login</h1>
        <form >
            <input type="text" className="username-input" placeholder="Enter Username" required/>
            <input type="password" className="password-input" placeholder="Enter Password" required/>
            <button type="button" className="login-submit">Login</button>
            <p className='error-message'>This is an error message</p>
            <span><Link to="/register">Create Account.</Link></span>
        </form>
    </div>
  )
}

export default Login