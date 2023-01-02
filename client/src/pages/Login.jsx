import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
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
    //CHECKS WHICH INPUT IS CHANGED AND SETS THE CORRESPONDING INPUT FIELD TO THE VALUE
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const navigate = useNavigate();

  //SUBMITS INPUTS TO DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      //SEND HTTP REQ TO BACKEND SERVER USING AXIOS/PROXY PATH
      await axios.post("/api/auth/login", inputs);

      //REDIRECT USER TO LOGIN
      navigate("/")
    }catch(err){
      setError(err.response.data)
    }
    
  }
  return (
    <div className="auth">
        <h1>Login</h1>
        <form >
            <input type="text" className="username-input" placeholder="Enter Username" name="username" onChange={handleChange} required/>
            <input type="password" className="password-input" placeholder="Enter Password" name="password" onChange={handleChange} required/>
            <button type="button" className="login-submit" onClick={handleSubmit}>Login</button>
            {err && <p className='error-message'>{err}</p>}
            <span><Link to="/register">Create Account.</Link></span>
        </form>
    </div>
  )
}

export default Login