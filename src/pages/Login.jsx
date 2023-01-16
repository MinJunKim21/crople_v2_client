import React from 'react';
// import { useContext } from 'react';
// import { useRef } from 'react';
import { loginCall } from '../apiCalls';

function Login() {
  // const email = useRef();
  // const password = useRef();

  const google = () => {
    window.open(
      'https://real-gold-vulture-fez.cyclic.app/googleauth/google/callback',
      '_self'
    );
    // loginCall();
  };

  const kakao = () => {
    window.open(`${process.env.REACT_APP_API_ROOT}/kakaoauth/kakao`, '_self');
  };

  const naver = () => {
    window.open(`${process.env.REACT_APP_API_ROOT}/naverauth/naver`, '_self');
  };

  return (
    <div className="max-w-md">
      <div className="bg-green-200 flex flex-col">
        <h1>choose login method</h1>
        <button onClick={google}>google</button>
        <button onClick={kakao}>kakao</button>
        <button onClick={naver}>naver</button>
        <span>{process.env.REACT_APP_MODE}</span>
        <span>{process.env.REACT_APP_HOME_URL}</span>
        <span>{process.env.REACT_APP_API_ROOT}</span>
      </div>
    </div>
  );
}

export default Login;
