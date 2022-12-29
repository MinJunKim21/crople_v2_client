import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState('');
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios(
          'http://localhost:5001/api/users?userId=' + friendId
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
      <img
        src={
          user.profilePicture === '' || user.profilePicture === undefined
            ? PF + 'person/noAvatar.png'
            : PF + user.profilePicture
        }
        alt=""
        className="w-6"
      />
      <span>{user?.username}</span>
    </div>
  );
}
