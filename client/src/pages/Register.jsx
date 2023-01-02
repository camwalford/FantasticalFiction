import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

const Register = () => {

  //SET STATE VARIABLE FOR INPUTS
  const [inputs, setInputs] = useState ({
    username:"",
    password:"",
    email:"",
  })

  //REALTIME UPDATE FOR INPUT FIELDS (USERNAME, EMAIL, PASSWORD)
  const handleChange = (e) =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/auth/register", inputs);
    }catch(err){
      console.log(err);
    }
    
  }

  return (
    <div className="auth">
        <h1>Register</h1>
        <form >
            <input type="text" name='username' className="username-input" placeholder="Enter Username" onChange={handleChange} required/>
            <input type="email" name='email' className="email-input" placeholder="Enter Email" onChange={handleChange} required/>
            <input type="password" name='password' className="password-input" placeholder="Enter Password" onChange={handleChange} required/>
            <button type="button" className="register-submit" onClick={handleSubmit}>Register</button>
            <p className='error-message'>This is an error message</p>
            <span>Already registered? <Link to="/login">Login.</Link></span>
        </form>
    </div>
  )
}

export default Register