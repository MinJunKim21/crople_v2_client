import tw from 'twin.macro';

export const ReqCheck = ({ setReqCheck }) => {
  return (
    <div className="bg-black bg-opacity-20 w-screen h-screen max-w-md absolute left-[50%] translate-x-[-50%] top-0 z-50">
      <div className="absolute max-w-[21.5rem] w-full top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[2.5rem] p-4">
        <MainQuestion>궁금하신 시설이 있으세요?</MainQuestion>
        <SubInstruction>
          궁금하신 운동시설이 있다면
          <br />
          저희가 발로 뛰어 찾아올게요.
        </SubInstruction>

        <div className="w-full h-full flex justify-center space-x-2 pt-4">
          <button
            onClick={() => {
              setReqCheck(false);
            }}
            className="bg-[#DFDFDF] w-28 h-12 rounded-xl"
          >
            취소
          </button>
          <a href="https://forms.gle/7Mj4PjZb17v786Pk6">
            <button className="bg-[#F79D00] text-white w-28 h-12 rounded-xl">
              로그아웃
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const MainQuestion = tw.h3`
flex justify-center text-[#242424] font-semibold text-xl`;

const SubInstruction = tw.h6`flex justify-center text-center text-[#8B8B8B] mt-2 font-medium text-sm `;
