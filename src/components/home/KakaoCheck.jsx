import tw from 'twin.macro';

export const KakaoCheck = ({ setKakaoCheck }) => {
  return (
    <div className="bg-black bg-opacity-20 w-screen h-screen absolute left-0 top-0 z-50 max-w-md  ">
      <div className="absolute max-w-[21.5rem] w-full top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[2.5rem] p-4">
        <MainQuestion>1:1 문의로 연결 하시겠어요?</MainQuestion>
        <SubInstruction>카카오톡 채널로 연결됩니다</SubInstruction>

        <div className="w-full h-full flex justify-center space-x-2 pt-8">
          <button
            onClick={() => {
              setKakaoCheck(false);
            }}
            className="bg-[#DFDFDF] w-28 h-12 rounded-xl"
          >
            취소
          </button>

          <a
            href="https://open.kakao.com/me/crople79"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F79D00] text-white w-28 h-12 rounded-xl flex justify-center items-center"
          >
            연결
          </a>
        </div>
      </div>
    </div>
  );
};

const MainQuestion = tw.h3`
flex justify-center text-[#242424] font-semibold text-xl`;

const SubInstruction = tw.h6`flex justify-center text-[#555555] mt-2 font-medium text-sm `;
