// import Topbar from '../components/Topbar';
// import Sidebar from '../components/Sidebar';
// import Rightbar from '../components/Rightbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// import Infoedit from '../components/Infoedit';

import { MyProfileCard } from '../components/profile/MyProfileCard';
import { UsersProfileCard } from '../components/profile/UsersProfileCard';

export default function Profile() {
  const userObject = useContext(AuthContext);
  const [user, setUser] = useState('');
  const _id = useParams()._id;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users?userId=` + _id
      );
      setUser(res.data);
    };
    fetchUser();
  }, [_id, user?._id, userObject.followings]);

  return (
    <div>
      {user._id === userObject._id ? <MyProfileCard /> : <UsersProfileCard />}
    </div>
  );
}
