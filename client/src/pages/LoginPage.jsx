import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminLogin } from '../store/adminThunk'

function LoginPage() {
  const [username, setUsername] = useState('sagar')
  const [password, setPassword] = useState('1')
  const navigate= useNavigate()
  const dispatch= useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res= await dispatch(adminLogin({username,password}))
      console.log(res);
      
      if(res?.payload){
        navigate("/taskboard")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="login-btn" type="submit">Login</button>
        <p className="login-link">
          Don't have an account?
          <Link to='/signup'>Create account</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
