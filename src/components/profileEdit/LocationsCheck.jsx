import tw from 'twin.macro';

export const LocationsCheck = ({
  LOCATION_LIST,
  onCheckedLocationsElement,
  locations,
  locationsCheckedList,
  setLocationsCheckedList,
  initialLocationsCheckedList,
  setLocationQuestion,
  setTempLocation,
}) => {
  return (
    <div className="bg-black bg-opacity-20 w-screen h-screen absolute left-0 top-0 ">
      <div className="absolute max-w-[21.5rem] w-full top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[2.5rem] p-4">
        <MainQuestion>운동할 지역을 설정해주세요</MainQuestion>
        <SubInstruction>중복으로 선택할 수 있어요</SubInstruction>
        <div className="justify-center grid items-center mt-8">
          <ul className="grid grid-cols-2 gap-x-2 gap-y-4 ">
            {LOCATION_LIST.map((item) => {
              return (
                <li key={item.id}>
                  <input
                    id={item.id}
                    type="checkbox"
                    value={item.data}
                    ref={locations}
                    onChange={(e) => {
                      onCheckedLocationsElement(
                        e.target.checked,
                        e.target.value
                      );
                    }}
                    checked={
                      locationsCheckedList.includes(item.data) ? true : false
                    }
                    className="hidden peer"
                  />
                  <OptionBtn htmlFor={item.id}>{item.data}</OptionBtn>
                </li>
              );
            })}
          </ul>
        </div>
        {locationsCheckedList.length === 0 && (
          <h4 className="text-xs flex pt-4 justify-center text-[#FF2525]">
            1개 항목 이상 선택해 주세요
          </h4>
        )}
        <div className="w-full h-full flex justify-center space-x-2 pt-8">
          <button
            onClick={() => {
              setLocationsCheckedList(initialLocationsCheckedList);
              setLocationQuestion(false);
            }}
            className="bg-[#DFDFDF] w-28 h-12 rounded-xl"
          >
            취소
          </button>
          {locationsCheckedList.length === 0 ? (
            <div className="bg-[#F79D00] flex justify-center items-center text-white w-28 h-12 rounded-xl">
              선택완료
            </div>
          ) : (
            <button
              onClick={() => {
                setLocationQuestion(false);
                setTempLocation(true);
              }}
              className="bg-[#F79D00] text-white w-28 h-12 rounded-xl"
            >
              선택완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MainQuestion = tw.h3`
flex justify-center text-[#242424] font-semibold text-xl`;

const SubInstruction = tw.h6`flex justify-center text-[#555555] mt-2 font-medium text-sm `;

const OptionBtn = tw.label`border-2 rounded-full peer-checked:border-[#F79D00] font-semibold w-36 h-12 flex text-center justify-center text-[#A5A5A5] items-center z-10 cursor-pointer`;
