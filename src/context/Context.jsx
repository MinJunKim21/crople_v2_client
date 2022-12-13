import React from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const myContext = createContext({});
export default function Context(props) {
  const [userObject, setUserObject] = useState();
  useEffect(() => {
    axios
      .get('http://localhost:5001/getuser', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          // console.log(res);
          setUserObject(res.data);
        }
      });
  }, []);
  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
}
