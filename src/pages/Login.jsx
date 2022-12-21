import React from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { loginCall } from '../apiCalls';

function Login() {
  const email = useRef();
  const password = useRef();

  const google = () => {
    window.open('http://localhost:5001/googleauth/google', '_self');
    loginCall();
  };

  const kakao = () => {
    window.open('http://localhost:5001/kakaoauth/kakao', '_self');
  };

  const naver = () => {
    window.open('http://localhost:5001/naverauth/naver', '_self');
  };

  return (
    <div>
      <div>
        <div>login page</div>
        <h1>choose login method</h1>
        <button onClick={google}>google</button>
        <button onClick={kakao}>kakao</button>
        <button onClick={naver}>naver</button>
      </div>
    </div>
  );
}

export default Login;
