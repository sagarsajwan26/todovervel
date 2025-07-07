import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAdmin } from '../store/adminThunk';

function Signup() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: '',
    name: '',
    password: '',
    email: '',
  });

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await dispatch(createAdmin(data));
    console.log(res);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Signup</h1>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleOnChange}
            className="signup-input"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleOnChange}
            className="signup-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleOnChange}
            className="signup-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
            className="signup-input"
          />
          <button type="submit" className="signup-button">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
