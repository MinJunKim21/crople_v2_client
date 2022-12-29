import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Conversations({ conversation, currentUser }) {
  const [friend, setFriend] = useState('');
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios(
          'http://localhost:5001/api/users?userId=' + friendId
        );
        console.log(res);
        setFriend(res.data);
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
          friend.profilePicture === '' || friend.profilePicture === undefined
            ? PF + 'person/noAvatar.png'
            : PF + friend.profilePicture
        }
        alt=""
        className="w-6"
      />
      <span>{friend?.username}</span>
    </div>
  );
}
