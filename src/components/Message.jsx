import React from 'react';
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
  console.log(isSameDay);
  return (
    <div
      className={
        own ? 'flex flex-row-reverse mb-[0.5rem]' : 'flex flex-col mb-[0.5rem]'
      }
    >
      <div className={own ? 'flex flex-row-reverse ' : 'flex flex-row '}>
        {
          <img
            src={user?.profilePicture[0]}
            alt=""
            className={`w-12 h-12 rounded-full ${
              isSameSender ? 'opacity-0' : ''
            } ${own && 'hidden'} `}
          />
        }
        <div className={own ? 'flex flex-row-reverse' : 'flex flex-row '}>
          <p
            className={
              own
                ? 'max-w-[17.5rem] bg-[#F79D00] h-full px-5 py-3 rounded-[1.625rem] rounded-br-none text-white break-words whitespace-normal ml-2'
                : 'max-w-[17.5rem] ml-2 bg-[#F7F7F7] h-full px-5 py-3 rounded-[1.625rem] rounded-bl-none break-words whitespace-normal'
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
          <div className={`text-[#979797]  ${isSameDay ? 'opacity-0' : ''}`}>
            {daystamp}
          </div>
        </div>
      </div>
    </div>
  );
}
