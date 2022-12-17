import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import Topbar from '../components/Topbar';
import { AuthContext } from '../context/AuthContext';
import ChatOnline from '../components/ChatOnline';
import Conversations from '../components/Conversations';
import Message from '../components/Message';
import { io } from 'socket.io-client';

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [socket, setSocket] = useState(null);
  const socket = useRef(io('ws://localhost:8900'));
  const userObject = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
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
    socket.current.emit('addUser', userObject._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        userObject.followings.filter((f) => users.some((u) => u.userId === f))
        // users
      );
    });
  }, [userObject]);
  console.log(userObject.followings, 'followings');
  console.log(userObject, 'userobject');
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5001/api/conversations/' + userObject._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userObject._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5001/api/messages/' + currentChat?._id
        );
        setMessages(res.data);
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

    socket.current.emit('sendMessage', {
      senderId: userObject._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        'http://localhost:5001/api/messages/',
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

  return (
    <>
      <Topbar />
      <div className="flex justify-between">
        <div>
          <input placeholder="serach friends" />
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)} key={c._id}>
              <Conversations
                conversation={c}
                currentUser={userObject}
                key={c._id}
              />
            </div>
          ))}
        </div>
        <div>
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
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={userObject._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </>
  );
}
