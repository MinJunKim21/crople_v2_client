import tw from 'twin.macro';
import styled from 'styled-components';

export const TutorialSmile = ({ file }) => {
  return (
    <div>
      <BgGraWrapperA>
        <h3 className="text-center pt-12  text-[#555555]">
          나와 꼭 맞는 메이트를 만나보세요!
        </h3>
        <div className="absolute bottom-10  left-[50%] translate-x-[-50%]">
          <img
            src="assets/pattern/WhiteCenterBlur.png"
            className="h-full w-full absolute"
            alt=""
          />
          <img
            src="assets/pattern/LineCenterCircle.png"
            className="h-full w-full object-contain absolute"
            alt=""
          />

          <div className="relative h-screen w-screen">
            <div className="w-[5.375rem] h-[5.375rem] object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286]">
              <img
                src={file ? URL.createObjectURL(file) : null}
                alt=""
                className="w-[5.25rem] h-[5.25rem] object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
              />
            </div>
          </div>
          <div className="absolute z-50 left-[47%] top-[32%]">
            <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
              <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
            </span>

            <button className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-[1px] rounded-full">
              <img
                src="/assets/BTN/Sample_Profile.jpg"
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            </button>
          </div>
          <div className="absolute left-[50%] top-[25%] translate-x-[-50%] translate-y-[-50%] w-full">
            <WhiteNoteA>
              <div className="w-3 h-3 bg-white absolute bottom-[0%] left-[50%] tra rotate-45 translate-y-[50%] translate-x-[-50%]"></div>
              매칭신청을 받으면 스마일표시가 나타나요!
            </WhiteNoteA>
          </div>
        </div>
      </BgGraWrapperA>
    </div>
  );
};

const BgGraWrapper = styled.div`
  background: linear-gradient(
    341.82deg,
    #a8d69b 10.29%,
    rgba(202, 190, 64, 0.28) 47.5%,
    rgba(247, 157, 0, 0) 84.7%
  );
`;

const BgGraWrapperA = tw(BgGraWrapper)`
w-full h-screen  flex flex-col mx-auto max-w-md`;

const WhiteNote = styled.div`
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.16))
    drop-shadow(4px 8px 28px rgba(0, 0, 0, 0.08));
`;

const WhiteNoteA = tw(WhiteNote)`
absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] text-xs text-center bg-white py-3 px-3 rounded-full text-[#555555]`;
