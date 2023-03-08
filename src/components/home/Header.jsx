import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

export const Header = ({ showMenu, handleShowMenu }) => {
  return (
    <div className="flex justify-between z-50 pt-11 ">
      <i className="z-30 text-[#9AE286] text-2xl ml-4 cursor-pointer invisible">
        <FiMenu />
      </i>
      <img src="/assets/croXple.png" className="h-6" alt="" />
      {!showMenu ? (
        <i
          onClick={handleShowMenu}
          className={`z-30 text-[#9AE286] text-2xl mr-4 cursor-pointer ${
            showMenu && 'invisible'
          }`}
        >
          <FiMenu />
        </i>
      ) : (
        <i
          onClick={handleShowMenu}
          className={`z-30 text-[#555555] text-2xl mr-4 cursor-pointer ${
            !showMenu && 'invisible'
          }`}
        >
          <AiOutlineClose />
        </i>
      )}
    </div>
  );
};
