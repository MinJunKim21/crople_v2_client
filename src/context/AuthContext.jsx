import React from 'react';
import styled from 'styled-components';
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

  if (isLoading) {
    return (
      <div>
        <div>
          <BgWhiteBlur>
            <BgWrapper>
              <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="flex justify-center mb-64 mt-24">
                  <img src="/assets/croXple.png" className="h-10" alt="" />
                </div>
              </div>
            </BgWrapper>
          </BgWhiteBlur>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={userObject}>{children}</AuthContext.Provider>
  );
}

const BgWrapper = styled.div`
  background: linear-gradient(
    341.82deg,
    #a8d69b 10.29%,
    rgba(202, 190, 64, 0.28) 47.5%,
    rgba(247, 157, 0, 0) 84.7%
  );
  // mix-blend-mode: multiply;
`;

const BgWhiteBlur = styled.div`
  background: radial-gradient(
    55.16% 29.06% at 49.87% 37.81%,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 100%
  );
`;
