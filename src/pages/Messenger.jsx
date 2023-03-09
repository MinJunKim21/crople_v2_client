import axios from 'axios';
import React from 'react';
import tw from 'twin.macro';
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/ko';
import { ChatTab } from '../components/btn&tab&bar/ChatTab';
import styled from 'styled-components';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { UnfollowCheck } from '../components/messenger/UnfollowCheck';
import { MessengerHeader } from '../components/messenger/MessengerHeader';
import { ConvListDefault } from '../components/messenger/ConvListDefault';

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
  const [allConversations, setAllConversations] = useState([]);
  const [unfollowCheck, setUnfollowCheck] = useState(false);
  const [showUnfollow, setShowUnfollow] = useState(null);

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
    if (
      arrivalMessage &&
      currentChat &&
      currentChat.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
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
      window.location.href = `/chat/${res.data._id}`;
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
        setConversation((prevConversation) => [...prevConversation, res.data]); // 마지막 메세지 시간 알기 위해
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

  const getLastMessage = async (conversation) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/messages/${conversation._id}`
      );
      const lastMessageIndex = res.data.length - 1;
      const lastMessage = res.data[lastMessageIndex];
      if (!lastMessage) {
        return null;
      }
      return lastMessage.updatedAt;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    const newConversations = [];
    //create conversation
    const createConversation = async (user) => {
      try {
        // Check if a conversation with the user already exists
        const existingConversationRes = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/conversations/find/${user._id}/${userObject._id}`
        );
        const existingConversation = existingConversationRes.data;
        if (existingConversation) {
          return existingConversation;
        }

        // If no existing conversation, create a new one
        const newConversationRes = await axios.post(
          `${process.env.REACT_APP_API_ROOT}/api/conversations`,
          {
            senderId: userObject._id,
            receiverId: user._id,
          }
        );
        return newConversationRes.data;
      } catch (err) {
        console.log(err);
      }
    };

    // Loop through each friend and create/update conversations
    (async function () {
      for (const user of friendEachother) {
        let conversationsWithUser = [];
        for (const conv of conversation) {
          if (conv.members.includes(user._id)) {
            const lastMessage = await getLastMessage(conv);
            const conversationWithUser = {
              conversationId: conv._id,
              userId: conv.members.find((memberId) => memberId === user._id),
              createdAt: conv.createdAt,
              updatedAt: conv.updatedAt,
              membersUpdatedTime: conv.membersUpdatedTime,
              ...user,
              lastMessage: lastMessage,
            };
            conversationsWithUser.push(conversationWithUser);
          }
        }

        if (conversationsWithUser.length === 0) {
          const newConversation = await createConversation(user);
          const conversationWithUser = {
            conversationId: newConversation._id,
            userId: user._id,
            createdAt: newConversation.createdAt,
            updatedAt: newConversation.updatedAt,
            membersUpdatedTime: newConversation.membersUpdatedTime,
            ...user,
            lastMessage: null,
          };
          conversationsWithUser.push(conversationWithUser);
        }

        newConversations.push(...conversationsWithUser);
      }

      Promise.all(newConversations)
        .then((updatedConversations) => {
          setAllConversations(
            updatedConversations.filter((conv) => conv.conversationId !== null)
          );
        })
        .catch((error) => {
          console.error('Error updating conversations:', error);
        });
    })();
  }, [conversation, friendEachother, userObject._id]);

  const handleUnfollow = async (user) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_ROOT}/api/users/` + user._id + '/unfollow',
        {
          userId: userObject._id,
        }
      );

      // Remove the unfollowed user from allConversations
      setAllConversations(
        allConversations.filter((conversation) => conversation._id !== user._id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowUnfollow = (user) => {
    setShowUnfollow(user._id);
  };

  return (
    <div className="flex flex-col justify-cente max-w-md mx-auto">
      <div className="h-screen flex flex-col">
        <MessengerHeader
          showUnfollow={showUnfollow}
          setShowUnfollow={setShowUnfollow}
        />
        <ConvListDefault allConversations={allConversations} />
        <BgGra className="w-full h-full" />
      </div>
      <div className="absolute top-0 max-w-md w-full ">
        <div
          className={`flex flex-col mt-[100px] w-full  space-y-2 z-10 ${
            showUnfollow ? '' : 'px-2'
          }`}
        >
          {allConversations
            .sort((a, b) => {
              if (a.lastMessage === null || b.lastMessage === null) {
                return -1;
              }
              return moment(b.lastMessage) - moment(a.lastMessage);
            })
            .map((conversation, index) => {
              const user = conversation;
              const lastCheckedTime =
                conversation.membersUpdatedTime[userObject._id];
              return (
                <div
                  key={user._id}
                  className={`flex items-center ${
                    showUnfollow && 'space-x-2.5'
                  }`}
                >
                  <div className="absolute left-0 top-0">
                    {unfollowCheck && showUnfollow === user._id && (
                      <UnfollowCheck
                        setUnfollowCheck={setUnfollowCheck}
                        handleUnfollow={handleUnfollow}
                        user={user}
                      />
                    )}
                  </div>
                  {showUnfollow && (
                    <i
                      onClick={() => {
                        setUnfollowCheck(true);
                        handleShowUnfollow(user);
                      }}
                    >
                      <IoIosCloseCircleOutline className="text-[#A5A5A5] cursor-pointer text-lg" />
                    </i>
                  )}
                  <div
                    className={`border  py-2  bg-white shadow-md w-full relative ${
                      showUnfollow ? 'pl-4 rounded-l-2xl' : 'px-4 rounded-2xl'
                    }`}
                  >
                    {lastCheckedTime &&
                      lastCheckedTime < conversation.lastMessage && (
                        <i className="bg-[#F79D00] h-2 w-2 absolute rounded-full top-4 left-4 "></i>
                      )}
                    <button
                      onClick={() => {
                        getConversationsOfTwo(user);
                      }}
                    >
                      <div
                        key={user._id}
                        className="flex space-x-4 items-center"
                      >
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
                              {conversation.lastMessage === null
                                ? ''
                                : moment(conversation.lastMessage).fromNow()}
                            </span>
                          </div>
                          <div className="flex">
                            <div className="flex space-x-2">
                              {user.locations.map((location) => {
                                return (
                                  <h4
                                    key={location}
                                    className="text-[#A5A5A5] "
                                  >
                                    {location}
                                  </h4>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex flex-wrap w-full ">
                            {user.likeSports.map((likeSports, index) => {
                              return (
                                <NextBtnGraBorder
                                  key={index}
                                  className="mr-2 mb-1"
                                >
                                  <NextBtnGraBg>
                                    <NextBtnGraText>
                                      {likeSports}
                                    </NextBtnGraText>
                                  </NextBtnGraBg>
                                </NextBtnGraBorder>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
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
