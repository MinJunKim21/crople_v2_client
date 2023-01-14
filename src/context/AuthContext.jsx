import React from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const AuthContext = createContext();
export default function Context({ children }) {
  const [userObject, setUserObject] = useState({});
  console.log(`${process.env.REACT_APP_API_ROOT}/getuser`);
  console.log(userObject, 'authContext');
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/getuser`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setUserObject(res.data);
        }
      });
  }, [userObject._id]);
  return (
    <AuthContext.Provider value={userObject}>{children}</AuthContext.Provider>
  );
}
