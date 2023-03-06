import React from 'react';

export const BannerEach = ({ banner }) => {
  const [firstLine, secondLine] = banner.desc.split('/');

  return (
    <div className="relative">
      <img
        src={banner.image}
        className="h-[300px] object-cover w-full"
        alt=""
      />
      <img
        src="/assets/pattern/BlackDownGra.png"
        className="absolute bottom-0 w-full object-contain flex"
        alt=""
      />
      <div className="absolute bottom-0 right-0 text-white bg-opacity-50 px-4 py-8 text-left">
        <h3 className="text-2xl font-bold">{banner.name}</h3>
        <p className="text-sm">
          {firstLine} <br />
          {secondLine}
        </p>
      </div>
    </div>
  );
};
