import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Topbar from '../components/Topbar';
import { AuthContext } from '../context/AuthContext';
import ChatOnline from './ChatOnline';
import Conversations from './Conversations';
import Message from './Message';

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userObject = useContext(AuthContext);

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
                  <Message message={m} own={m.sender === userObject._id} />
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
          <ChatOnline />
        </div>
      </div>
    </>
  );
}
