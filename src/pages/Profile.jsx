import styled from 'styled-components';

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

import { MyProfileCard } from '../components/MyProfileCard';
import { UsersProfileCard } from '../components/UsersProfileCard';

export default function Profile() {
  const userObject = useContext(AuthContext);
  const [user, setUser] = useState('');
  const _id = useParams()._id;
  const [followed, setFollowed] = useState(
    userObject.followings.includes(user?._id)
  );
  console.log(followed);
  // const [profileChange, setProfileChange] = useState(false);
  // console.log(nickName, 'nickName');
  // console.log(user, 'user');
  // console.log(useParams(), 'useParams()');
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users?userId=` + _id
      );
      setUser(res.data);
    };
    fetchUser();
    setFollowed(userObject.followings.includes(user?._id));
  }, [_id, user?._id, userObject.followings]);

  // const handleClick = async () => {
  //   try {
  //     if (followed) {
  //       await axios.put(
  //         `${process.env.REACT_APP_API_ROOT}/api/users/` +
  //           user._id +
  //           '/unfollow',
  //         {
  //           userId: userObject._id,
  //         }
  //       );
  //     } else {
  //       await axios.put(
  //         `${process.env.REACT_APP_API_ROOT}/api/users/` + user._id + '/follow',
  //         {
  //           userId: userObject._id,
  //         }
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setFollowed(!followed);
  //   window.location.reload(); // 원인 알게되면 이거 바꾸기...
  // };
  return (
    <div>
      {user._id === userObject._id ? <MyProfileCard /> : <UsersProfileCard />}
    </div>
  );
}
