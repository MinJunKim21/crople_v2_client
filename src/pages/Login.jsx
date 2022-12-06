import React from 'react';

function Login() {
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
      <div>
        <div>
          <input placeholder="Email" />
          <input placeholder="Password" />
          <button>Log In</button>
          <span>Forgot password?</span>
          <button>create a new account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
