import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Profile from '../pages/Profile';
// import axios from 'axios';

function Navbar() {
  const userObject = useContext(AuthContext);
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_ROOT}/googleauth/logout`, '_self');
  };
  return (
    <div className="bg-gray-300 max-w-md">
      <span>navbar 이거는 무시해도됨</span>
      <span className="bg-red-500">
        <Link to="/">crople</Link>
      </span>
      {userObject._id ? (
        <span>
          <span>{userObject.displayName}</span>
          <button onClick={logout}>logout</button>
        </span>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Navbar;
