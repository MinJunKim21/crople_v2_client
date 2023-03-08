import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Message from '../components/chat/Message/Message';
import io from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/ko';

import { useParams } from 'react-router-dom';
import { ChatHeader } from '../components/chat/ChatHeader';
import { MessageInput } from '../components/chat/MessageInput';

moment.locale('ko');

const ENDPOINT = process.env.REACT_APP_API_ROOT;
let socket;

export const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const userObject = useContext(AuthContext);
  const scrollRef = useRef();
  const [user, setUser] = useState('');
  const _id = useParams()._id;
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit('addUser', userObject._id);
    socket.on('getUsers', (users) => {
      // setOnlineUsers(
      //   userObject.followings.filter((f) => users.some((u) => u.userId === f))
      //   // users
      //   );
    });
  }, [userObject]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/messages/` + _id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userObject._id,
      text: newMessage,
      conversationId: _id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userObject._id
    );

    socket.emit('sendMessage', {
      senderId: userObject._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/messages/`,
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const convRes = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/conversations/find/${_id}`
        );
        setCurrentChat(convRes.data);
        const otherUser = convRes.data.members.find(
          (memberId) => memberId !== userObject._id
        );

        const userRes = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/users?userId=` + otherUser
        );
        setUser(userRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [_id, userObject._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  //채팅방 들어오거나, 글작성하거나, 나가면 사용자의 아이디와 시간을 업데이트하기
  useEffect(() => {
    axios
      .put(
        `${process.env.REACT_APP_API_ROOT}/api/conversations/updatetime/${_id}`,
        { memberId: userObject._id }
      )
      .then((response) => setUpdatedAt(response.data.updatedAt))
      .catch((error) => console.log(error));

    return () => {
      axios
        .put(
          `${process.env.REACT_APP_API_ROOT}/api/conversations/updatetime/${_id}`,
          { memberId: userObject._id }
        )
        .then((response) => setUpdatedAt(response.data.updatedAt))
        .catch((error) => console.log(error));
    };
  }, [_id, userObject._id]);

  return (
    <div>
      <div className="hidden">{updatedAt}</div>
      <div className="max-h-screen h-screen w-full max-w-md mx-auto relative flex flex-col">
        <ChatHeader user={user} />
        <div className="flex flex-col h-full overflow-y-scroll pt-8 text-center pb-4">
          <p className="text-xs text-[#555555]">
            메이트와 연결되었습니다.
            <br /> 장소, 시간 약속을 정하고 함께 운동을 즐겨보세요!
          </p>
          {messages.map((m, index) => {
            const previousMessage = messages[index - 1];
            const nextMessage = messages[index + 1];

            const isSameSender =
              previousMessage && previousMessage.sender === m.sender;
            const timestamp = new Date(m.createdAt)
              .toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
              .toUpperCase();
            const timeFormat = (t) =>
              new Date(t)
                .toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                .toUpperCase();
            const dayFormat = (t) =>
              new Date(t)
                .toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
                .replace(/\./g, '년 ')
                .replace(' ', '월 ') + '일';
            const isSameTime =
              nextMessage &&
              timeFormat(nextMessage.createdAt) === timeFormat(m.createdAt);
            const isSameDay =
              previousMessage &&
              dayFormat(previousMessage.createdAt) === dayFormat(m.createdAt);

            const daystamp = new Date(m.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            });

            return (
              <div key={index} ref={scrollRef} className="px-2">
                <Message
                  key={m._id}
                  message={m}
                  timestamp={timestamp}
                  daystamp={daystamp}
                  own={m.sender === userObject._id}
                  user={user}
                  userObject={userObject}
                  index={index}
                  isSameSender={isSameSender}
                  isSameTime={isSameTime}
                  isSameDay={isSameDay}
                />
              </div>
            );
          })}
        </div>
        <MessageInput
          handleSubmit={handleSubmit}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
        />
      </div>
    </div>
  );
};
