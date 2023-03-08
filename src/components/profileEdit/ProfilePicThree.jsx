import React from 'react';

export const ProfilePicThree = ({
  fileC,
  userObject,
  setFileC,
  fileChange,
}) => {
  return (
    <div className="inline-block">
      <div className="relative inline-block">
        <div className="bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] w-[6.75rem] h-[6.75rem] relative p-[2px] rounded-full">
          {fileC ? (
            <img
              src={fileC ? URL.createObjectURL(fileC) : null}
              alt=""
              className="w-[6.75rem] h-[6.75rem] object-cover rounded-full absolute left-0 top-0"
            />
          ) : (
            <div className="bg-white w-full h-full  rounded-full"></div>
          )}
        </div>
        <label
          htmlFor="fileInputC"
          className={`absolute cursor-pointer left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs w-full h-full text-center ${
            fileC ? 'text-transparent' : 'text-[#C1C1C1]'
          }`}
        >
          {userObject.profilePicture[2] && !fileC ? (
            <img
              className="object-cover rounded-full w-full h-full"
              src={userObject.profilePicture[2]}
              alt=""
            />
          ) : (
            <span className="flex w-full h-full justify-center items-center">
              +
            </span>
          )}
        </label>
      </div>
      <h6 className="text-xs text-[#8B8B8B] text-center">선택</h6>
      <input
        type="file"
        accept="image/*"
        id="fileInputC"
        onChange={(e) => {
          setFileC(e.target.files[0]);
          fileChange(e, 2);
        }}
        className="opacity-0 w-[1px] peer"
      />
    </div>
  );
};
