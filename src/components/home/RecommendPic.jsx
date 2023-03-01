import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export const RecommendPic = ({ recommendUsers, handleUserClick }) => {
  const userObject = useContext(AuthContext);

  return (
    <>
      <div className="absolute z-50 left-[50%] top-[35%]">
        {recommendUsers[0]?.followings.includes(userObject._id) && (
          <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        )}
        <button
          onClick={() => handleUserClick(recommendUsers[0])}
          className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-[1px] rounded-full"
        >
          <img
            src={recommendUsers[0]?.profilePicture[0]}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      <div className="absolute z-50 left-[65%] top-[53%]">
        {recommendUsers[1]?.followings.includes(userObject._id) && (
          <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        )}
        <button
          onClick={() => handleUserClick(recommendUsers[1])}
          className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-[1px] rounded-full"
        >
          <img
            src={recommendUsers[1]?.profilePicture[0]}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      <div className="absolute z-50 left-[20%] top-[52%]">
        {recommendUsers[2]?.followings.includes(userObject._id) && (
          <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        )}
        <button
          onClick={() => handleUserClick(recommendUsers[2])}
          className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-[1px] rounded-full"
        >
          <img
            src={recommendUsers[2]?.profilePicture[0]}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      <div className="absolute z-50 left-[37%] top-[64%]">
        {recommendUsers[3]?.followings.includes(userObject._id) && (
          <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        )}
        <button
          onClick={() => handleUserClick(recommendUsers[3])}
          className="w-[3.75rem] h-[3.75rem] border-[#A5A5A5] border-[1px] rounded-full"
        >
          <img
            src={recommendUsers[3]?.profilePicture[0]}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      <div className="absolute z-50 left-[75%] top-[35%]">
        {recommendUsers[4]?.followings.includes(userObject._id) && (
          <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        )}
        <button
          onClick={() => handleUserClick(recommendUsers[4])}
          className="w-[3.75rem] h-[3.75rem] border-[#A5A5A5] border-[1px] rounded-full"
        >
          <img
            src={recommendUsers[4]?.profilePicture[0]}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      <div className="absolute z-50 left-[18%] top-[29%]">
        {recommendUsers[5]?.followings.includes(userObject._id) && (
          <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        )}
        <button
          onClick={() => handleUserClick(recommendUsers[5])}
          className="w-[3.75rem] h-[3.75rem] border-[#A5A5A5] border-[1px] rounded-full"
        >
          <img
            src={recommendUsers[5]?.profilePicture[0]}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      <div className="absolute z-50 left-[45%] top-[17%]">
        {recommendUsers[6]?.followings.includes(userObject._id) && (
          <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        )}
        <button
          onClick={() => handleUserClick(recommendUsers[6])}
          className="w-[3.125rem] h-[3.125rem] border-[#A5A5A5] border-[1px] rounded-full"
        >
          <img
            src={recommendUsers[6]?.profilePicture[0]}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      <div className="absolute z-50 left-[15%] top-[76%]">
        {recommendUsers[7]?.followings.includes(userObject._id) && (
          <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        )}
        <button
          onClick={() => handleUserClick(recommendUsers[7])}
          className="w-[3.125rem] h-[3.125rem] border-[#A5A5A5] border-[1px] rounded-full"
        >
          <img
            src={recommendUsers[7]?.profilePicture[0]}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      <div className="absolute z-50 left-[74%] top-[74%]">
        {recommendUsers[8]?.followings.includes(userObject._id) && (
          <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        )}
        <button
          onClick={() => handleUserClick(recommendUsers[8])}
          className="w-[3.125rem] h-[3.125rem] border-[#A5A5A5] border-[1px] rounded-full"
        >
          <img
            src={recommendUsers[8]?.profilePicture[0]}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>
    </>
  );
};
