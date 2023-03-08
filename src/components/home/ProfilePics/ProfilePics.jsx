import { Link } from 'react-router-dom';
import { RecommendPic } from './RecommendPic';

export const ProfilePics = ({
  userObject,
  recommendUsers,
  handleUserClick,
}) => {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] bottom-5">
      <div className="relative h-screen w-screen max-w-md">
        <Link to={`/profile/${userObject._id}`}>
          <div className="w-[5.375rem] h-[5.375rem] object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286]">
            <img
              src={userObject.profilePicture[0]}
              alt=""
              className="w-[5.25rem] h-[5.25rem] object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          </div>
        </Link>
        <RecommendPic
          recommendUsers={recommendUsers}
          handleUserClick={handleUserClick}
        />
      </div>
    </div>
  );
};
