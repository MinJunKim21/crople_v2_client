import tw from 'twin.macro';
import styled from 'styled-components';

import { BsChevronLeft } from 'react-icons/bs';

const LOCATION_LIST = [
  { id: 0, data: '마포구' },
  { id: 1, data: '서대문구' },
];

export const QuestionTwo = (props) => {
  return (
    <BgWrapper>
      <button
        onClick={() => {
          props.setQuestion('one');
        }}
      >
        <BsChevronLeft />
      </button>
      <MainQuestion className="mt-14">운동할 지역을 설정해주세요</MainQuestion>
      <SubInstruction className="mb-14">
        중복으로 선택할 수 있어요
      </SubInstruction>

      <div className="justify-center grid items-center">
        <ul className="grid grid-cols-2 gap-x-2 gap-y-4 px-4">
          {LOCATION_LIST.map((item) => {
            return (
              <li key={item.id}>
                <input
                  id={item.id}
                  type="checkbox"
                  value={item.data}
                  ref={props.useRef}
                  onChange={(e) => {
                    props.onCheckedLocationsElement(
                      e.target.checked,
                      e.target.value
                    );
                  }}
                  checked={
                    props.locationsCheckedList.includes(item.data)
                      ? true
                      : false
                  }
                  className="hidden peer"
                />
                <OptionBtn htmlFor={item.id}>{item.data}</OptionBtn>
              </li>
            );
          })}
        </ul>
      </div>
      {props.locationsCheckedList.length === 0 ? (
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <NextBtnGrayBg>
            <NextBtnGrayText>다음</NextBtnGrayText>
          </NextBtnGrayBg>
        </div>
      ) : (
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <NextBtnGraBorder
            onClick={() => {
              if (props.locationsCheckedList.length === 0) {
                alert('최소 하나의 지역을 선택해야합니다');
              } else if (props.locationsCheckedList.length > 0) {
                props.setQuestion('three');
              }
            }}
          >
            <NextBtnGraBg>
              <NextBtnGraText>다음</NextBtnGraText>
            </NextBtnGraBg>
          </NextBtnGraBorder>
        </div>
      )}
    </BgWrapper>
  );
};

const MainQuestion = tw.h3`
flex justify-center text-[#242424] font-semibold text-2xl`;

const SubInstruction = tw.h6`flex justify-center text-[#555555] font-medium `;

const OptionBtn = tw.label`border-2 rounded-full peer-checked:border-[#F79D00] font-semibold w-36 h-12 flex text-center justify-center text-[#A5A5A5] items-center z-10`;

const NextBtnGraBorder = tw.div`w-full h-[5.25rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const NextBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex justify-center items-center`;
const NextBtnGraText = tw.div`text-xl font-bold bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;
const NextBtnGrayBg = tw.div`w-full h-[5.25rem]  rounded-full bg-[#F5F5F5]   text-center flex justify-center items-center`;
const NextBtnGrayText = tw.div`text-xl font-bold text-[#C1C1C1]`;

const SmGraText = tw.div`text-xs text-center text-[#F79D00] font-bold`;

const BgWrapper = tw.div`bg-white w-screen h-screen  pt-12 max-w-sm mx-auto px-4`;

const BgGraWrapper = styled.div`
  background: linear-gradient(
    166.9deg,
    rgba(247, 157, 0, 0.05) -17.3%,
    rgba(202, 190, 64, 0.28) 36.08%,
    #a8d69b 89.46%
  );
`;

const BgGraWrapperA = tw(BgGraWrapper)`
w-full h-screen pt-12 max-w-sm flex flex-col `;

const CardWhiteBg = styled.div`
  background: #ffffff;

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16), 4px 8px 28px rgba(0, 0, 0, 0.08);
  border-radius: 2rem 2rem 0px 0px;
`;
