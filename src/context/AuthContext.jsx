import React from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const AuthContext = createContext();
export default function Context({ children }) {
  const [userObject, setUserObject] = useState({});
  const [isLoading, setIsLoading] = useState(true); //eslint-disable-line no-unused-vars

  // useEffect(() => {
  //   console.log(process.env.REACT_APP_API_ROOT, 'getting authcontext');
  //   axios
  //     .get(`${process.env.REACT_APP_API_ROOT}/getuser`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       // console.log(res, 'got res');
  //       if (res.data) {
  //         // console.log(res.data, 'res.data 존재');
  //         setUserObject(res.data);
  //         // console.log('did set object');
  //       }
  //     });
  // }, [userObject._id]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/getuser`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setUserObject(res.data);
        }
      })
      .finally(() => setIsLoading(false)); // set isLoading to false regardless of success/failure
  }, [userObject._id]);

  return (
    <AuthContext.Provider value={userObject}>{children}</AuthContext.Provider>
  );
}
