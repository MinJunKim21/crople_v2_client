import React from 'react';

export const MessengerHeader = ({ showUnfollow, setShowUnfollow }) => {
  return (
    <div className="flex text-center justify-between px-4 text-xl text-[#555555] pt-8 pb-2  border-b-4 border-[#F5F5F5] w-full relative items-center">
      <div className="text-sm invisible">편집</div>
      <h3 className="font-bold text-xl">채팅 목록</h3>
      <div
        onClick={() => {
          setShowUnfollow((prev) => !prev);
        }}
        className="text-sm cursor-pointer z-10"
      >
        {showUnfollow ? '완료' : '편집'}
      </div>
    </div>
  );
};
