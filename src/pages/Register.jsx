import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const navigate = useNavigate();

  const [userObject, setUserObject] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(
          `${process.env.REACT_APP_API_ROOT}/api/auth/register`,
          user
        );
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/getuser`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res, 'got res');
        if (res.data) {
          console.log(res.data, 'res.data 존재');
          setUserObject(res.data);
          console.log('did set object');
        }
      });
  }, [userObject._id]);

  return (
    <div>
      <form onSubmit={handleClick}>
        <input placeholder="Username" required ref={username} />
        <input placeholder="Email" required ref={email} type="email" />
        <input placeholder="Password" required ref={password} type="password" />
        <input
          placeholder="Password again"
          required
          ref={passwordAgain}
          type="password"
        />
        <button type="submit">Sign up</button>
        <button>log in to account</button>
      </form>
    </div>
  );
}
