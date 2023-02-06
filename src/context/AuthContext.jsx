import React from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const AuthContext = createContext();
export default function Context({ children }) {
  const [userObject, setUserObject] = useState({});
  // console.log(`${process.env.REACT_APP_API_ROOT}/getuser`);
  // console.log(userObject, 'authContext');
  useEffect(() => {
    console.log(process.env.REACT_APP_API_ROOT, 'getting authcontext');
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/getuser`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res, 'got res');
        if (res.data) {
          // console.log(res.data, 'res.data 존재');
          setUserObject(res.data);
          // console.log('did set object');
        }
      });
  }, [userObject._id]);

  // useEffect(() => {
  //   const getUserObject = async () => {
  //     const res = await axios.get(`${process.env.REACT_APP_API_ROOT}/getuser`, {
  //       withCredentials: true,
  //     });
  //     setUserObject(res.data);
  //     console.log(res, 'res');
  //   };
  //   getUserObject();
  // }, [userObject._id]);

  return (
    <AuthContext.Provider value={userObject}>{children}</AuthContext.Provider>
  );
}
