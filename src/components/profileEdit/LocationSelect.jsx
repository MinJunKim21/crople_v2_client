import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineDown } from 'react-icons/ai';

export const LocationSelect = ({
  tempLocation,
  locationsCheckedList,
  userObject,
  setLocationQuestion,
}) => {
  return (
    <div className="flex items-center space-x-1">
      <span className="text-lg text-[#DFDFDF]">
        <HiLocationMarker />
      </span>
      {tempLocation
        ? locationsCheckedList.map((location) => {
            return (
              <h4 key={location} className="text-[#A5A5A5] text-lg ">
                {location}
              </h4>
            );
          })
        : userObject.locations.map((location) => {
            return (
              <h4 key={location} className="text-[#A5A5A5] text-lg ">
                {location}
              </h4>
            );
          })}
      <i
        onClick={() => {
          setLocationQuestion(true);
        }}
        className="text-2xl text-[#DFDFDF] cursor-pointer"
      >
        <AiOutlineDown />
      </i>
    </div>
  );
};
