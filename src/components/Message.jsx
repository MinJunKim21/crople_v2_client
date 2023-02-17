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
}) {
  return (
    <div
      className={
        own ? 'flex flex-row-reverse mb-[0.5rem]' : 'flex flex-col mb-[0.5rem]'
      }
    >
      <div className={own ? 'flex flex-row-reverse items-baseline' : 'flex'}>
        {
          <img
            src={user?.profilePicture[0]}
            alt=""
            className={`w-12 h-12 rounded-full ${
              isSameSender ? 'opacity-0' : ''
            } ${own && 'hidden'} `}
          />
        }
        <p
          className={
            own
              ? 'max-w-sm bg-[#F79D00] items-center h-full px-5 py-3 rounded-[1.625rem] rounded-br-none mx-2 text-white break-words  whitespace-normal'
              : 'max-w-sm bg-[#F7F7F7] items-center h-full px-5 py-3 rounded-[1.625rem] rounded-bl-none mx-2 break-words  whitespace-normal'
          }
        >
          {message.text}
        </p>
        {<span className="text-xs text-[#979797]">{timestamp}</span>}
      </div>
      {/* <div>{format(message.createdAt)}</div> */}
    </div>
  );
}
