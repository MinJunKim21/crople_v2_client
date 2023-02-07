import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_ROOT}/api/users?userId=` + friendId
        );
        console.log(res);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div>
      <div className="flex">
        <img
          src={user.profilePicture}
          alt=""
          className="w-6 h-6 object-cover"
        />
        <span>{user.nickName}</span>
      </div>
    </div>
  );
}
