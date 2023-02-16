import React from 'react';
// import { format } from 'timeago.js';

export default function Message({
  isSameSender,
  index,
  userObject,
  user,
  message,
  own,
}) {
  return (
    <div
      className={
        own
          ? 'flex flex-row-reverse text-right mb-[0.5rem]'
          : 'flex flex-col mb-[0.5rem]'
      }
    >
      <div className="flex">
        {
          <img
            src={user?.profilePicture[0]}
            alt=""
            className={`w-12 h-12 rounded-full ${
              own || isSameSender ? 'opacity-0' : ''
            }`}
          />
        }
        <p
          className={
            own
              ? 'bg-[#F79D00] items-center h-full px-5 py-3 rounded-[1.625rem] rounded-br-none mx-2 text-white'
              : 'bg-[#F7F7F7] items-center h-full px-5 py-3 rounded-[1.625rem] rounded-bl-none mx-2'
          }
        >
          {message.text}
        </p>
      </div>
      {/* <div>{format(message.createdAt)}</div> */}
    </div>
  );
}
