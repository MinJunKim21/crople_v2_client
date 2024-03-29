import tw from 'twin.macro';

const SPORTS_LIST = [
  { id: 0, data: '헬스' },
  { id: 1, data: '테니스' },
  { id: 2, data: '클라이밍' },
  { id: 3, data: '러닝' },
  { id: 4, data: '골프' },
  { id: 5, data: '수영' },
  { id: 6, data: '주짓수' },
  { id: 7, data: '싸이클' },
];

export const QuestionOne = ({
  useRef,
  onCheckedSportsElement,
  sportsCheckedList,
  setQuestion,
}) => {
  return (
    <BgWrapper>
      <div className="absolute left-[50%] translate-x-[-50%] z-50 justify-center">
        <img src="/assets/croXple.png" className="h-6" alt="" />
      </div>
      <MainQuestion className="mt-14">어떤 운동을 좋아하세요?</MainQuestion>
      <SubInstruction className="mb-14">
        다섯 개까지 선택할 수 있어요
      </SubInstruction>
      <div className="justify-center grid items-center">
        <ul className="grid grid-cols-2 gap-x-2 gap-y-4 px-4">
          {SPORTS_LIST.map((item) => {
            return (
              <li key={item.id}>
                <input
                  id={item.id}
                  type="checkbox"
                  className="hidden peer"
                  value={item.data}
                  ref={useRef}
                  onChange={(e) => {
                    onCheckedSportsElement(e.target.checked, e.target.value);
                  }}
                  checked={sportsCheckedList.includes(item.data) ? true : false}
                />
                <OptionBtn htmlFor={item.id}>{item.data}</OptionBtn>
              </li>
            );
          })}
        </ul>
      </div>
      {sportsCheckedList.length === 0 ? (
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <NextBtnGrayBg>
            <NextBtnGrayText>다음</NextBtnGrayText>
          </NextBtnGrayBg>
        </div>
      ) : (
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <NextBtnGraBorder
            onClick={() => {
              if (sportsCheckedList.length === 0) {
                alert('최소 하나의 운동을 선택해야합니다');
              } else if (sportsCheckedList.length > 0) {
                setQuestion('two');
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

const OptionBtn = tw.label`border-2 rounded-full peer-checked:border-[#F79D00] font-semibold w-36 h-12 flex text-center justify-center text-[#A5A5A5] items-center z-10 cursor-pointer`;

const NextBtnGraBorder = tw.div`w-full h-[5.25rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const NextBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex justify-center items-center cursor-pointer`;
const NextBtnGraText = tw.div`text-xl font-bold bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;
const NextBtnGrayBg = tw.div`w-full h-[5.25rem]  rounded-full bg-[#F5F5F5]   text-center flex justify-center items-center`;
const NextBtnGrayText = tw.div`text-xl font-bold text-[#C1C1C1]`;

const BgWrapper = tw.div`bg-white w-screen h-screen  pt-12 max-w-sm mx-auto px-4 bg-white`;
