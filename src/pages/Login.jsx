import React from 'react';

function Login() {
  const google = () => {
    window.open('http://localhost:5001/auth/google', '_self');
  };
  return (
    <div>
      <div>login page</div>
      <h1>choose login method</h1>
      <button onClick={google}>google</button>
    </div>
  );
}

export default Login;
