import React from 'react'
import { useState } from 'react'
import { axiosInstance } from '../utils/axios'

function LoginPage() {
    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')

    const handleLogin=async(e)=>{
        e.preventDefault()
        const res= await axiosInstance.post('/admin/loginAdmin',{username,password})
        console.log(res);
        
    }
  return (
    <div>
<form action="" onSubmit={handleLogin}>
    
        <input type="text" value={username} 
        onChange={(e)=> setUsername(e.target.value)}
        />
        <input type="password" value={password} 
        onChange={(e)=> setPassword(e.target.value)}
        />
        <button 
        
        type="submit">Login</button>
</form>
    </div>
  )
}

export default LoginPage