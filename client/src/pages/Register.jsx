import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const Register = () => {

  //SET STATE HOOK FOR INPUTS
  const [inputs, setInputs] = useState ({
    username:"",
    password:"",
    email:"",
  })

  //SET STATE HOOK FOR ERROR
  const [err, setError] = useState(null);

  //REALTIME UPDATE FOR INPUT FIELDS (USERNAME, EMAIL, PASSWORD)
  const handleChange = (e) =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const navigate = useNavigate();

  //SUBMITS INPUTS TO DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      //SEND HTTP REQ TO BACKEND SERVER USING AXIOS/PROXY PATH
      await axios.post("/api/auth/register", inputs);

      //REDIRECT USER TO LOGIN
      navigate("/login")
    }catch(err){
      setError(err.response.data)
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

            {/* CHECKS IF ERROR STATE IS NOT NULL AND DISPLAYS ERROR MESSAGE IF TRUE */}
            {err && <p className='error-message'>{err}</p>}
            <span>Already registered? <Link to="/login">Login.</Link></span>
        </form>
    </div>
  )
}

export default Register