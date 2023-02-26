import React from 'react';
import { RecommendEachUser } from './RecommendEachUser';

export const RecommendUserPlace = ({ recommendUsers, handleUserClick }) => {
  return (
    <div className="relative absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <RecommendEachUser
        user={recommendUsers[0]}
        handleUserClick={handleUserClick}
        className="absolute top-0 left-0"
      />
      <RecommendEachUser
        user={recommendUsers[1]}
        handleUserClick={handleUserClick}
        className="absolute bottom-0 right-0"
      />
      <RecommendEachUser
        user={recommendUsers[2]}
        handleUserClick={handleUserClick}
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};
