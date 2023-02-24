import axios from 'axios';
import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/ko';
import { ChatTab } from '../components/btn&tab&bar/ChatTab';
import { useNavigate } from 'react-router-dom';

moment.locale('ko');

const ENDPOINT = process.env.REACT_APP_API_ROOT;
let socket;

export default function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const userObject = useContext(AuthContext);
  const scrollRef = useRef();
  const [friendEachother, setFriendEachother] = useState([]);
  const [convExist] = useState('');
  const [conversation, setConversation] = useState([]);
  const [lastMessageArray, setLastMessageArray] = useState([]);

  const navigate = useNavigate();

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
          `${process.env.REACT_APP_API_ROOT}/api/messages/` + currentChat?._id
        );
        setMessages(res.data);
        // console.log(res.data, 'getMessages');
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, convExist]);

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
      if (res.data === null) {
        const conversation = await createConversation(user);
        setCurrentChat(conversation);
        navigate(`/chat/${res.data._id}`); // navigate to chat page with conversation ID
      } else {
        setCurrentChat(convExist);
        navigate(`/chat/${res.data._id}`); // navigate to chat page with existing conversation ID
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const conversationOfTwo = async (user) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/conversations/find/${userObject._id}/${user._id}`
        );
        setConversation((prevConversation) => [...prevConversation, res.data]);
      } catch (err) {
        console.log(err);
      }
    };
    friendEachother.forEach((friend) => {
      conversationOfTwo(friend);
    });
  }, [friendEachother, userObject._id]);

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

  useEffect(() => {
    // Call getLastMessage for each conversation

    const getLastMessage = async (conversationIndex) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/messages/` +
            conversation[conversationIndex]?._id
        );
        const lastMessageIndex = res.data.length - 1;
        const lastMessage = res.data[lastMessageIndex].updatedAt;

        setLastMessageArray((prevLastMessageArray) => {
          const updatedArray = [...prevLastMessageArray];
          updatedArray[conversationIndex] = lastMessage;
          return updatedArray;
        });
      } catch (err) {
        console.log(err);
      }
    };
    conversation.forEach((conv, index) => {
      getLastMessage(index);
    });
  }, [conversation]);

  return (
    <>
      <div className="flex justify-center h-screen">
        {!currentChat && (
          <div className="relative">
            <h3 className="fix absolute top-0 left-[50%] translate-x-[-50%] text-center justify-center text-xl text-[#A5A5A5] pt-12 pb-4 border-b-2 w-full">
              채팅 목록
            </h3>

            <div className="flex flex-col mt-[100px] w-full px-2 space-y-2">
              {friendEachother.map((user, index) => {
                // const conv = conversation[index];
                // getLastMessage(conv);

                return (
                  <div key={user._id} className="border px-4 py-2 rounded-2xl">
                    <button
                      onClick={() => {
                        getConversationsOfTwo(user);
                        // navigate(`/chat/${user._id}`);
                      }}
                    >
                      <div
                        key={user._id}
                        className="flex space-x-4 items-center"
                      >
                        <img
                          className="w-20 h-20 object-cover rounded-full"
                          src={user.profilePicture[0]}
                          alt=""
                        />
                        <div>
                          <div className="flex flex-col">
                            <span>{user.nickName}</span>
                            <span>
                              {moment(lastMessageArray[index]).fromNow()}
                            </span>
                            {/* {conv && moment(conv.updatedAt).fromNow()} */}
                          </div>
                          <div className="flex">
                            <span>서울</span>
                            <div className="flex">
                              {user.locations.map((location) => {
                                return (
                                  <h4
                                    key={location}
                                    className="text-[#A5A5A5] text-lg"
                                  >
                                    {location}
                                  </h4>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex flex-wrap w-full">
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
                );
              })}
            </div>

            <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
              <ChatTab />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
