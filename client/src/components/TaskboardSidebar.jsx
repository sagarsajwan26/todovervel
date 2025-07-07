import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../store/adminThunk';

function TaskboardSidebar() {
  const links = [
    {
      name: "home",
      path: "/taskboard"
    },
    {
      name: "assignTask",
      path: "/taskboard/assign"
    }
  ];
const dispatch= useDispatch()
const navigate= useNavigate()
const handleLogout=async()=>{
  await dispatch(logoutAdmin())
  localStorage.removeItem('token')
    navigate('/')
}
  return (
    <div className="sidebar-container">
      <h1 className="logo">LOGO</h1>

      <div className="nav-links">
        {links.map((link, index) => (
          <Link key={index} to={link.path} className="nav-link">
            {link.name}
          </Link>
        ))}
      </div>

      <button 
      onClick={()=>handleLogout()}
      className="logout-btn">Logout</button>
    </div>
  )
}

export default TaskboardSidebar;
