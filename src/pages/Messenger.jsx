import axios from 'axios';
import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
// import Topbar from '../components/Topbar';
import { AuthContext } from '../context/AuthContext';
// import ChatOnline from '../components/ChatOnline';
// import Conversations from '../components/Conversations';
import Message from '../components/Message';
import io from 'socket.io-client';
// import { Link } from 'react-router-dom';
import TabBar from '../components/TabBar';

const ENDPOINT = process.env.REACT_APP_API_ROOT;
let socket;

export default function Messenger() {
  // const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  // const [socket, setSocket] = useState(null);
  // const socket = useRef();
  const userObject = useContext(AuthContext);
  const scrollRef = useRef();
  const [friendEachother, setFriendEachother] = useState([]);
  const [convExist, setConvExist] = useState(false);
  const [showButton, setShowButton] = useState(false);

  console.log(ENDPOINT, 'endpoint');

  useEffect(() => {
    socket = io(ENDPOINT, {
      // WARNING: in that case, there is no fallback to long-polling
      transports: ['websocket', 'polling'], // or [ "websocket", "polling" ] (the order matters)
      withCredentials: true,
    });
    console.log(socket, 'socket');
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
      console.log(users);
      // setOnlineUsers(
      //   userObject.followings.filter((f) => users.some((u) => u.userId === f))
      //   // users
      //   );
    });
  }, [userObject]);

  //접속한 userObject의 모든 conversation list를 가져옴
  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_API_ROOT}/api/conversations/` +
  //           userObject._id
  //       );
  //       setConversations(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getConversations();
  // }, [userObject._id]);

  //create conversation
  const createConversation = async (user) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_ROOT}/api/conversations`, {
        senderId: userObject._id,
        receiverId: user._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/messages/` + currentChat?._id
        );
        setMessages(res.data);
        console.log(res.data, 'getMessages');
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userObject._id,
      text: newMessage,
      conversationId: currentChat._id,
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
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const getFriendEachother = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users/friendsearch/` +
          userObject._id
      );
      setFriendEachother(res.data);
      console.log(friendEachother, 'friendeachother');
    };
    getFriendEachother();
  }, [userObject._id]);

  const getConversationsOfTwo = async (user) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/conversations/find/${userObject._id}/${user._id}`
      );
      setConvExist(res.data);
      console.log(res.data, 'hiiiiii');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          {/* <Topbar /> */}
          {/* <div>
          <input placeholder="search friends" />
          {conversations.map((c) => (
            <div
              className="bg-gray-200"
              onClick={() => setCurrentChat(c)}
              key={c._id}
            >
              <Conversations
                conversation={c}
                currentUser={userObject}
                key={c._id}
              />
            </div>
          ))}
          <div>search 기능은 지금 필요 없는듯</div>
        </div> */}
          {/* <span>following each other friend</span>
          <div>
            {friendEachother.map((user) => (
              <div key={user._id} className="flex">
                <img className="w-6 h-6" src={user.profilePicture[0]} alt="" />
                <span>{user.nickName}</span>
              </div>
            ))}
          </div> */}

          <span>맞팔 리스트 중에 클릭하면 대화창 만들어짐</span>

          <div>
            {friendEachother.map((user) => (
              <div key={user._id}>
                <button
                  onClick={() => {
                    getConversationsOfTwo(user);
                    setShowButton(true);
                  }}
                >
                  <div key={user._id} className="flex">
                    <img
                      className="w-6 h-6"
                      src={user.profilePicture[0]}
                      alt=""
                    />
                    <span>{user.nickName}</span>
                  </div>
                </button>
                {showButton && (
                  <button
                    onClick={() => {
                      if (convExist === false) {
                        createConversation(user);
                      } else {
                        setCurrentChat(convExist);
                      }
                    }}
                  >
                    대화하기
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>채팅화면(대화창)</div>
          {currentChat ? (
            <>
              <div className="h-60 overflow-y-scroll">
                {messages.map((m) => (
                  <div key={m._id} ref={scrollRef}>
                    <Message
                      key={m._id}
                      message={m}
                      own={m.sender === userObject._id}
                    />
                  </div>
                ))}
              </div>
              <div>
                <textarea
                  className="border"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="write message here"
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  value={newMessage}
                ></textarea>
                <button onClick={handleSubmit}>Send</button>
              </div>
            </>
          ) : (
            <span>start conversation to chat</span>
          )}
        </div>
        <div>
          {/* <ChatOnline
            onlineUsers={onlineUsers}
            currentId={userObject._id}
            setCurrentChat={setCurrentChat}
          /> */}
        </div>
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <TabBar />
        </div>
      </div>
    </>
  );
}
