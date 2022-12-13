import React from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { loginCall } from '../apiCalls';

function Login() {
  const email = useRef();
  const password = useRef();

  const google = () => {
    window.open('http://localhost:5001/googleauth/google', '_self');
  };

  return (
    <div>
      <div>
        <div>login page</div>
        <h1>choose login method</h1>
        <button onClick={google}>google</button>
      </div>
    </div>
  );
}

export default Login;
