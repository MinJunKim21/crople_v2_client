import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { myContext } from '../context/Context';
import axios from 'axios';

function Navbar() {
  const userObject = useContext(myContext);
  const logout = () => {
    axios
      .get('https://localhost:5001/auth/logout', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === 'done') {
          window.location.href = '/';
        }
      });
  };
  return (
    <div>
      <span>navbar</span>
      <span className="bg-red-500">
        <Link to="/">crople</Link>
      </span>
      {userObject ? (
        <span>
          <span>mj</span>
          <button onClick={logout}>logout</button>
        </span>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Navbar;
