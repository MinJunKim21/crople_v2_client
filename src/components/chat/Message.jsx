import React, { useState } from 'react';
// import moment from 'moment-with-locales-es6';
import moment from 'moment';
import 'moment/locale/ko';
import { ProfileFromMessage } from '../ProfileFromMessage';

moment.locale('ko');
// import { format } from 'timeago.js';

export default function Message({
  isSameSender,
  index,
  userObject,
  user,
  message,
  own,
  timestamp,
  daystamp,
  isSameTime,
  isSameDay,
}) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseProfileCard = () => {
    setShowProfileCard(false);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowProfileCard(true);
  };

  return (
    <div>
      <div className="flex flex-col mb-[0.5rem]">
        {!isSameDay ? (
          <div className="flex items-center pt-3 pb-5">
            <span className="border-[1px]  w-full h-full" />
            <span
              className={`text-[#979797] px-1 text-sm flex justify-center max-w-xs w-full ${
                isSameDay ? 'opacity-0' : ''
              }`}
            >
              {moment({ daystamp }).format('ll')}
            </span>
            <span className="border-[1px]  w-full h-full" />
          </div>
        ) : null}
        <div className={own ? 'flex flex-row-reverse ' : 'flex flex-row '}>
          {
            <img
              src={user?.profilePicture?.[0]}
              alt=""
              className={`w-12 h-12 cursor-pointer rounded-full ${
                isSameSender ? 'opacity-0' : ''
              } ${own && 'hidden'} `}
              onClick={() => handleUserClick(user)}
            />
          }

          <div className={own ? 'flex flex-row-reverse' : 'flex flex-row '}>
            <p
              className={
                own
                  ? 'max-w-[17.5rem] bg-[#F79D00] h-full px-5 py-3 rounded-[1.625rem] whitespace-pre-line rounded-br-none text-white break-words  text-left ml-2'
                  : 'max-w-[17.5rem] ml-2 bg-[#F7F7F7] h-full px-5 py-3 rounded-[1.625rem] rounded-bl-none whitespace-pre-line text-left break-words'
              }
            >
              {message.text}
            </p>

            <div className="text-xs h-full flex flex-col justify-end">
              <span
                className={`text-[#979797] ${
                  isSameSender && isSameTime ? 'opacity-0' : ''
                }`}
              >
                {timestamp}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showProfileCard && (
        <div className="absolute bg-black/20 top-0 left-0 w-screen h-screen max-w-md mx-auto">
          <ProfileFromMessage
            user={selectedUser}
            onClose={handleCloseProfileCard}
          />
        </div>
      )}
    </div>
  );
}
