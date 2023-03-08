import { Link } from 'react-router-dom';
import tw from 'twin.macro';

export const EditCancelCheck = ({
  setCancelEdit,
  setSportsQuestion,
  setTempSports,
  userObject,
}) => {
  return (
    <div className="bg-black bg-opacity-20 w-screen h-screen absolute left-[50%] top-0 max-w-md  translate-x-[-50%]  ">
      <div className="absolute max-w-[21.5rem] w-full top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[2.5rem] p-4">
        <MainQuestion>작성을 취소할까요?</MainQuestion>
        <SubInstruction>저장되지 않은 내용은 삭제됩니다</SubInstruction>
        <div className="w-full h-full flex justify-center space-x-2 pt-8">
          <button
            onClick={() => {
              setCancelEdit(false);
            }}
            className="bg-[#DFDFDF] w-28 h-12 rounded-xl "
          >
            아니요
          </button>
          <Link to={`/profile/${userObject._id}`}>
            <button
              onClick={() => {
                setSportsQuestion(false);
                setTempSports(true);
              }}
              className="bg-[#F79D00] text-white w-28 h-12 rounded-xl"
            >
              네
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const MainQuestion = tw.h3`
flex justify-center text-[#242424] font-semibold text-xl`;

const SubInstruction = tw.h6`flex justify-center text-[#555555] mt-2 font-medium text-sm `;
