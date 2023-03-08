import { BsChevronLeft } from 'react-icons/bs';

export const ProfileEditHeader = ({ setCancelEdit }) => {
  return (
    <div>
      <div className="absolute left-[50%] translate-x-[-50%] z-50 justify-center">
        <img src="/assets/croXple.png" className="h-6" alt="" />
      </div>
      <div className="px-4 pb-2">
        <i
          onClick={() => {
            setCancelEdit(true);
          }}
          className="cursor-pointer"
        >
          <BsChevronLeft />
        </i>
      </div>
    </div>
  );
};
