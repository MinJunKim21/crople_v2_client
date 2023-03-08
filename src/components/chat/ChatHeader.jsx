import { Link } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';

export const ChatHeader = ({ user }) => {
  return (
    <div className="flex items-center justify-between pb-2 pt-8 border-b-4 border-[#F5F5F5]">
      <Link to="/messenger">
        <button className="px-2 z-50">
          <BsChevronLeft />
        </button>
      </Link>
      <div className="flex flex-col">
        <h3 className="flex justify-center text-xl font-bold text-[#555555] text-center w-full">
          {user.nickName}
        </h3>
      </div>
      <button className="px-2 z-50 invisible">
        <BsChevronLeft />
      </button>
    </div>
  );
};
