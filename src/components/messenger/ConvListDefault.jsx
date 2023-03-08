import React from 'react';

export const ConvListDefault = ({ allConversations }) => {
  return (
    <div>
      {allConversations.length === 0 && (
        <div className="text-[#555555] absolute left-[50%] top-[35%] translate-x-[-50%] text-center">
          <p>현재 채팅방이 없습니다.</p>
          <p>새로운 메이트를 찾아보세요.</p>
          <img
            src="/assets/BTN/Btn_GotLiked.png"
            alt=""
            className="absolute w-12 h-12 bottom-[35%] left-[95%]"
          />
        </div>
      )}
    </div>
  );
};
