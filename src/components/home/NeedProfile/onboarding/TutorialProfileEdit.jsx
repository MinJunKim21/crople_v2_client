import tw from 'twin.macro';
import styled from 'styled-components';

export const TutorialProfileEdit = ({ file }) => {
  return (
    <div>
      <BgGraWrapperA>
        <h3 className="text-center pt-12  text-[#555555]">
          나와 꼭 맞는 메이트를 만나보세요!
        </h3>
        <div className="absolute bottom-10  left-[50%] translate-x-[-50%]">
          <img
            src="assets/pattern/WhiteCenterBlur.png"
            className="h-full w-full absolute object-contain"
            alt=""
          />
          <img
            src="assets/pattern/LineCenterCircle.png"
            className="h-full w-full object-contain absolute"
            alt=""
          />

          <div className="relative h-screen w-screen">
            <WhiteNoteA>
              <div className="w-3 h-3 bg-white absolute bottom-[0%] left-[50%] tra rotate-45 translate-y-[50%] translate-x-[-50%]"></div>
              여기서 프로필을 수정할 수 있어요
            </WhiteNoteA>
            <img
              src={file ? URL.createObjectURL(file) : null}
              alt=""
              className="w-20 h-20 object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
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
w-full h-screen  flex flex-col mx-auto max-w-md bg-white`;

const WhiteNote = styled.div`
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.16))
    drop-shadow(4px 8px 28px rgba(0, 0, 0, 0.08));
`;

const WhiteNoteA = tw(WhiteNote)`
absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] text-xs text-center bg-white py-3 px-3 rounded-full text-[#555555]`;
