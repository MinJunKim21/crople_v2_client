import React from 'react';

export const RecommendEachUser = ({ user, handleUserClick, className }) => {
  if (!user || !user.profilePicture) {
    return null; // or return an error message
  }
  return (
    <div className={`${className}`}>
      <button
        key={user._id}
        onClick={() => handleUserClick(user)}
        className="w-10 h-10"
      >
        <img
          src={user.profilePicture[0]}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </button>
    </div>
  );
};
