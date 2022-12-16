import React from 'react';

export default function Message({ own }) {
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
        <p>
          accusamus reiciendis repellendus nostrum adipisci consequuntur ea!
          Delectus quos cupiditate incidunt!
        </p>
      </div>
      <div>1 minute ago</div>
    </div>
  );
}
