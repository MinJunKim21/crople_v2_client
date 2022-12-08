import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

export default function QuestionOne() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [nickName, setNickName] = useState('');

  // const updateData = () => {
  //   axios.put(`http://localhost:5001/api/users/${user._id}`, {
  //     nickName: nickName,
  //     userId: user._id,
  //   });
  // };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5001/api/users?username=${username}`
      );
      setUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      <span>캐릭터 이름을 입력하세요</span>
      <input
        onChange={(e) => {
          setNickName(e.target.value);
        }}
        type="text"
        placeholder="handsomeJ"
        required
      />
      {/* <button onClick={updateData}>입력</button> */}
    </div>
  );
}
