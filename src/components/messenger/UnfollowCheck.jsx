import tw from 'twin.macro';

export const UnfollowCheck = ({ setUnfollowCheck, handleUnfollow, user }) => {
  return (
    <div className="bg-black bg-opacity-20 w-screen h-screen absolute left-0 top-0 z-50 max-w-md  ">
      <div className="absolute max-w-[21.5rem] w-full top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[2.5rem] p-4">
        <MainQuestion>대화방을 나가시겠습니까?</MainQuestion>
        <SubInstruction>
          해당 유저와의 대화는 재매칭이 이루어져야 가능합니다
        </SubInstruction>

        <div className="w-full h-full flex justify-center space-x-2 pt-8">
          <button
            onClick={() => {
              setUnfollowCheck(false);
            }}
            className="bg-[#DFDFDF] w-28 h-12 rounded-xl"
          >
            아니요
          </button>

          <div
            onClick={() => {
              handleUnfollow(user);
              setUnfollowCheck(false);
            }}
            className="bg-[#F79D00] text-white w-28 h-12 rounded-xl flex justify-center items-center"
          >
            네
          </div>
        </div>
      </div>
    </div>
  );
};

const MainQuestion = tw.h3`
flex justify-center text-[#242424] font-semibold text-xl`;

const SubInstruction = tw.h6`flex justify-center text-[#8B8B8B
] mt-2 font-medium text-xs `;
