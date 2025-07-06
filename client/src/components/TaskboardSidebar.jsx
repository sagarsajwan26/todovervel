import React from 'react'
import { Link } from 'react-router-dom'

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

      <button className="logout-btn">Logout</button>
    </div>
  )
}

export default TaskboardSidebar;
