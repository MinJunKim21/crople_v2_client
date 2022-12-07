import React from 'react';
import { useRef } from 'react';

function Login() {
  const email = useRef();
  const password = useRef();

  const google = () => {
    window.open('http://localhost:5001/googleauth/google', '_self');
  };

  const handleClick = (e) => {
    e.preventDefault();
  };
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
          <button>Log In</button>
          <span>Forgot password?</span>
          <button>create a new account</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
