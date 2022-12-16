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

  return (
    <>
      <Topbar />
      <div className="flex justify-between">
        <div>
          <input placeholder="serach friends" />
          {conversations.map((c) => (
            <Conversations
              conversation={c}
              currentUser={userObject}
              key={c._id}
            />
          ))}
        </div>
        <div>
          {currentChat ? (
            <>
              <div>
                <Message />
                <Message own={true} />
                <Message />
              </div>
              <div>
                <textarea
                  className="border"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="write message here"
                ></textarea>
                <button>Send</button>
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
