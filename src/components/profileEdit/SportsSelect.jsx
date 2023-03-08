import { AiOutlineDown } from 'react-icons/ai';

export const SportsSelect = ({
  tempSports,
  sportsCheckedList,
  userObject,
  setSportsQuestion,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-wrap w-[75%] mb-2 ">
        {tempSports
          ? sportsCheckedList.map((likeSports, index) => (
              <h4
                key={index}
                className="border px-4 py-2 border-[#A5A5A5] text-center rounded-full text-[#A5A5A5] text-sm mr-2 mb-2"
              >
                {likeSports}
              </h4>
            ))
          : userObject.likeSports.map((likeSports, index) => (
              <h4
                key={index}
                className="border px-4 py-2 border-[#A5A5A5] text-center mb-2 rounded-full text-[#A5A5A5] text-sm mr-2"
              >
                {likeSports}
              </h4>
            ))}
      </div>
      <i
        onClick={() => {
          setSportsQuestion(true);
        }}
        className="text-2xl text-[#DFDFDF] cursor-pointer"
      >
        <AiOutlineDown />
      </i>
    </div>
  );
};
