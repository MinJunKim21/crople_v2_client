import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export const RecommendPic = ({
  recommendUsers,
  handleUserClick,
  left,
  top,
  width,
  height,
}) => {
  const userObject = useContext(AuthContext);

  return (
    <div className={`absolute z-50 left-[${left}] top-[${top}]`}>
      {recommendUsers?.followings.includes(userObject._id) && (
        <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
          <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
        </span>
      )}
      <button
        onClick={() => handleUserClick(recommendUsers)}
        className={`w-[${width}] h-[${height}] border-[#A5A5A5] border-[1px] rounded-full`}
      >
        <img
          src={recommendUsers?.profilePicture[0]}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </button>
    </div>
  );
};
