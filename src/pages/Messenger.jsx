import axios from 'axios';
import React from 'react';
import tw from 'twin.macro';
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/ko';
import { ChatTab } from '../components/btn&tab&bar/ChatTab';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    <div className="flex flex-col justify-center">
      <div className="h-screen flex flex-col">
        <h3 className="text-center justify-center text-xl text-[#555555] pt-8 pb-2  border-b-4 border-[#F5F5F5] w-full">
          채팅 목록
        </h3>
        <BgGra className="w-full h-full"> </BgGra>
      </div>
      <div className="absolute top-0 left-0">
        <div className="flex flex-col mt-[100px] w-full px-2 space-y-2 z-10">
          {friendEachother.map((user, index) => {
            // const conv = conversation[index];
            // getLastMessage(conv);

            return (
              <div
                key={user._id}
                className="border px-4 py-2 rounded-2xl bg-white shadow-md"
              >
                <button
                  onClick={() => {
                    getConversationsOfTwo(user);
                  }}
                >
                  <div key={user._id} className="flex space-x-4 items-center">
                    <PicGraBorder key={index} className="mr-2 mb-1">
                      <PicGraBg>
                        <img
                          className="w-full h-full object-cover rounded-full"
                          src={user.profilePicture[0]}
                          alt=""
                        />
                      </PicGraBg>
                    </PicGraBorder>
                    <div className="flex flex-col ">
                      <div className="flex space-x-3 items-baseline mb-[-0.25rem]">
                        <span className="text-lg text-[#3D3D3D] font-semibold ">
                          {user.nickName}
                        </span>
                        <span className="text-[#A5A5A5] text-xs">
                          {moment(lastMessageArray[index]).fromNow()}
                        </span>
                      </div>
                      <div className="flex">
                        <div className="flex space-x-2">
                          {user.locations.map((location) => {
                            return (
                              <h4 key={location} className="text-[#A5A5A5] ">
                                {location}
                              </h4>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-wrap w-full ">
                        {user.likeSports.map((likeSports, index) => {
                          return (
                            <NextBtnGraBorder key={index} className="mr-2 mb-1">
                              <NextBtnGraBg>
                                <NextBtnGraText>{likeSports}</NextBtnGraText>
                              </NextBtnGraBg>
                            </NextBtnGraBorder>
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
      </div>

      <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
        <ChatTab />
      </div>
    </div>
  );
}

const BgGra = styled.div`
  background: linear-gradient(
    166.9deg,
    rgba(247, 157, 0, 0.05) -17.3%,
    rgba(202, 190, 64, 0.28) 36.08%,
    #a8d69b 89.46%
  );
  opacity: 0.3;
`;

const NextBtnGraBorder = tw.div`rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const NextBtnGraBg = tw.div` py-1 px-2 w-full h-full rounded-full bg-white  border-[1px] border-transparent [background-clip: padding-box]  text-center flex justify-center items-center`;
const NextBtnGraText = tw.div`text-sm bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;

const PicGraBorder = tw.div`rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const PicGraBg = tw.div` w-[5.75rem] h-[5.75rem] rounded-full border-[2px] border-transparent [background-clip: padding-box] flex justify-center items-center`;
