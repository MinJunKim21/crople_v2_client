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
// import { ChatList } from '../components/messenger/ChatList';
// import { Chatting } from '../components/messenger/Chatting';

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
  const [convExist, setConvExist] = useState('');
  // const [chatListPage, setChatListPage] = useState(true);

  useEffect(() => {
    socket = io(ENDPOINT, {
      // WARNING: in that case, there is no fallback to long-polling
      transports: ['websocket', 'polling'], // or [ "websocket", "polling" ] (the order matters)
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
          `${process.env.REACT_APP_API_ROOT}/api/messages/` + currentChat?._id
        );
        setMessages(res.data);
        console.log(res.data, 'getMessages');
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, convExist]);

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
    };
    getFriendEachother();
  }, [userObject._id]);

  const getConversationsOfTwo = async (user) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/conversations/find/${userObject._id}/${user._id}`
      );
      setConvExist(res.data);
      console.log(res, 'getconversationoftwo res');
      if (res.data === null) {
        createConversation(user).then((conversation) => {
          setCurrentChat(conversation);
        });
      } else {
        setCurrentChat(convExist);
      }
      console.log(user, 'user');
      // createConversation(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    (user) => {
      if (convExist !== null) {
        setCurrentChat(convExist);
      }
    },
    [convExist]
  );

  //create conversation
  const createConversation = async (user) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/conversations`,
        {
          senderId: userObject._id,
          receiverId: user._id,
        }
      );
      console.log(res, 'createdconversation');
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* {chatListPage ? <ChatList /> : <Chatting />} */}
      <div className="flex justify-between">
        {!currentChat && (
          <div className="relative">
            <h3 className="fix absolute top-0 left-[50%] translate-x-[-50%] text-center justify-center text-xl text-[#A5A5A5] pt-12 pb-4 border-b-2 w-full">
              채팅 목록
            </h3>

            <div className="flex flex-col mt-[100px] w-full px-2 space-y-2">
              {friendEachother.map((user) => (
                <div key={user._id} className="border px-4 py-2 rounded-2xl">
                  <button
                    onClick={() => {
                      getConversationsOfTwo(user);
                    }}
                  >
                    <div key={user._id} className="flex space-x-4 items-center">
                      <img
                        className="w-20 h-20 object-cover rounded-full"
                        src={user.profilePicture[0]}
                        alt=""
                      />
                      <div>
                        <div className="flex">
                          <span>{user.nickName}</span>
                          <span>10분전</span>
                        </div>
                        <div className="flex">
                          <span>서울</span>
                          <div className="flex">
                            {user.locations.map((location) => {
                              return (
                                <h4
                                  key={location}
                                  className="text-[#A5A5A5] text-lg "
                                >
                                  {location}
                                </h4>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex flex-wrap w-full  ">
                          {user.likeSports.map((likeSports, index) => {
                            return (
                              <h4
                                key={index}
                                className="border px-2 py-1 border-[#A5A5A5] text-center rounded-full text-[#A5A5A5] text-sm mb-2 mr-2"
                              >
                                {likeSports}
                              </h4>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          {currentChat && (
            <>
              <button onClick={() => setCurrentChat(null)}>back</button>
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
          )}
        </div>
        <div></div>
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <TabBar />
        </div>
      </div>
    </>
  );
}

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

// {
//   /* <ChatOnline
//             onlineUsers={onlineUsers}
//             currentId={userObject._id}
//             setCurrentChat={setCurrentChat}
//           /> */
// }
