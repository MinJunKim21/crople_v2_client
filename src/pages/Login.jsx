import React from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { loginCall } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const google = () => {
    window.open('http://localhost:5001/googleauth/google', '_self');
  };

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div>
      <div>
        <div>login page</div>
        <h1>choose login method</h1>
        <button onClick={google}>google</button>
      </div>
      <div>
        <form onSubmit={handleClick}>
          <input placeholder="Email" type="email" required ref={email} />
          <input
            placeholder="Password"
            type="password"
            ref={password}
            required
            minLength="6"
          />
          <button type="submit">{isFetching ? 'loading' : 'log IN'}</button>
          <span>Forgot password?</span>
          <button>create a new account</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
