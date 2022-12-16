import React from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const AuthContext = createContext();
export default function Context({ children }) {
  const [userObject, setUserObject] = useState({});
  useEffect(() => {
    axios
      .get('http://localhost:5001/getuser', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUserObject(res.data);
        }
      });
  }, [userObject._id]);
  console.log(userObject, 'ddd');
  return (
    <AuthContext.Provider value={userObject}>{children}</AuthContext.Provider>
  );
}
