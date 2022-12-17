import React from 'react';
import { format } from 'timeago.js';

export default function Message({ message, own }) {
  return (
    <div
      className={
        own
          ? 'flex flex-col flex-row-reverse text-right font-bold mb-5'
          : 'flex flex-col mb-5'
      }
    >
      <div className="flex">
        <img
          src="https://news.nateimg.co.kr/orgImg/nt/2021/06/16/222060206070.jpg"
          alt=""
          className="w-6 h-6"
        />
        <p>{message.text}</p>
      </div>
      <div>{format(message.createdAt)}</div>
    </div>
  );
}
