import tw from 'twin.macro';
import { BsChevronLeft } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

export const QuestionThree = ({
  setQuestion,
  file,
  fileB,
  fileC,
  setFile,
  setFileB,
  setFileC,
  fileChange,
  nickName,
  nickNameDB,
  setNickNameDB,
  useRef,
  descDB,
  setDescDB,
  setIsLoading,
  isLoading,
  profilePictureDB,
}) => {
  const byteCounter = (s, b, i, c) => {
    for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 2 : c >> 7 ? 2 : 1);
    return b;
  };

  return (
    <BgWrapper>
      <button
        onClick={() => {
          setQuestion('two');
        }}
      >
        <BsChevronLeft />
      </button>
      <MainQuestion>자기소개를 해주세요</MainQuestion>
      <SubInstruction className="mb-8">
        메이트를 만날 준비가 다 됐어요
      </SubInstruction>

      {/* <label>프로필 사진</label> */}
      <div className="flex justify-center space-x-4">
        <div className="inline-block">
          <div className="relative inline-block">
            <div className="bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] w-[6.75rem] h-[6.75rem] relative p-[2px] rounded-full cursor-pointer">
              {file ? (
                <img
                  src={file ? URL.createObjectURL(file) : null}
                  alt=""
                  className="w-[6.75rem] h-[6.75rem] object-cover rounded-full absolute left-0 top-0"
                />
              ) : (
                <div className="bg-white w-full h-full  rounded-full"></div>
              )}
            </div>
            <label
              htmlFor="fileInputA"
              className={`absolute  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs w-full text-center cursor-pointer ${
                file ? 'text-transparent' : 'text-[#C1C1C1]'
              }`}
            >
              프로필 사진
            </label>
          </div>
          <SmGraText>필수</SmGraText>
          <input
            type="file"
            accept="image/*"
            id="fileInputA"
            onChange={(e) => {
              setFile(e.target.files[0]);
              fileChange(e, 0);
            }}
            required
            className="opacity-0 w-[1px] peer"
          />
        </div>

        <div className="inline-block">
          <div className="relative inline-block cursor-pointer">
            <div
              className={`bg-white  box-content ${
                fileB ? null : 'border-[1.5px]'
              } border-dashed border-[#C1C1C1] w-[6.75rem] h-[6.75rem] relative rounded-full `}
            >
              {fileB ? (
                <img
                  src={fileB ? URL.createObjectURL(fileB) : null}
                  alt=""
                  className="w-[6.75rem] h-[6.75rem] object-cover rounded-full absolute left-0 top-0"
                />
              ) : (
                <div className="bg-white w-full h-full  rounded-full"></div>
              )}
            </div>
            <label
              htmlFor="fileInputB"
              className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-4xl  font-extralight w-full cursor-pointer text-center ${
                fileB ? 'text-transparent' : 'text-[#C1C1C1]'
              }`}
            >
              +
            </label>
          </div>
          <h6 className="text-xs text-[#8B8B8B] text-center">선택</h6>
          <input
            type="file"
            accept="image/*"
            id="fileInputB"
            onChange={(e) => {
              setFileB(e.target.files[0]);
              fileChange(e, 1);
            }}
            className="opacity-0 w-[1px] peer"
          />
        </div>

        <div className="inline-block">
          <div className="relative inline-block cursor-pointer">
            <div
              className={`bg-white  box-content ${
                fileC ? null : 'border-[1.5px]'
              } border-dashed border-[#C1C1C1] w-[6.75rem] h-[6.75rem] relative rounded-full`}
            >
              {fileC ? (
                <img
                  src={fileC ? URL.createObjectURL(fileC) : null}
                  alt=""
                  className="w-[6.75rem] h-[6.75rem] object-cover rounded-full absolute left-0 top-0"
                />
              ) : (
                <div className="bg-white w-full h-full  rounded-full"></div>
              )}
            </div>
            <label
              htmlFor="fileInputC"
              className={`absolute cursor-pointer left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-4xl  font-extralight w-full text-center ${
                fileC ? 'text-transparent' : 'text-[#C1C1C1]'
              }`}
            >
              +
            </label>
          </div>
          <h6 className="text-xs text-[#8B8B8B] text-center">선택</h6>
          <input
            type="file"
            accept="image/*"
            id="fileInputC"
            onChange={(e) => {
              setFileC(e.target.files[0]);
              fileChange(e, 2);
            }}
            className="opacity-0 w-[1px] peer"
          />
        </div>
      </div>

      <div className="flex border-b-2 mt-4 pb-2">
        <div className="flex items-center justify-between w-full">
          <input
            ref={nickName}
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickNameDB}
            required
            pattern="^[ㄱ-ㅎ가-힣a-zA-Z]+$"
            className="peer w-full "
            onChange={() => {
              if (byteCounter(nickName.current.value) > 16) {
                nickName.current.value = nickName.current.value.slice(0, -1);
              }
              setNickNameDB(nickName.current.value);
            }}
          />
          <i
            className="text-[#DFDFDF] w-6 h-6 text-[1.5rem] cursor-pointer"
            onClick={() => {
              nickName.current.value = '';
              setNickNameDB('');
            }}
          >
            <MdCancel />
          </i>
        </div>
      </div>
      <div className="text-right w-full text-xs text-[#A5A5A5] mb-4">
        {byteCounter(nickNameDB)}/16 byte
      </div>
      <div>
        <textarea
          ref={useRef}
          type="text"
          value={descDB}
          placeholder="예시)&#10;헬스는 2년 정도 했고 무게 위주로 치는 중이에요.&#10;클라이밍은 해본 적 없지만 이번에 같이 할 친구 생기면 배워보고 싶어요!"
          className="w-full border-2 rounded-lg h-[11.75rem] px-2 py-3"
          onChange={() => {
            if (byteCounter(useRef.current.value) > 240) {
              useRef.current.value = useRef.current.value.slice(0, -1);
            }
            setDescDB(useRef.current.value);
          }}
        />
        <div className="text-[#A5A5A5] text-xs text-right">
          {byteCounter(descDB)}/240 byte
        </div>
      </div>

      <div className="mt-2">
        <p className="text-xs text-[#8B8B8B] bg-[#F5F5F5] text-center p-2.5 rounded-lg">
          과도한 노출로 선정적이거나 개인 정보를 포함한 이미지 등<br />
          <b className="font-bold">커뮤니티 가이드라인</b>을 위반할 경우 계정이
          제한될 수 있습니다.
        </p>
      </div>
      {nickNameDB === '' ||
      file === null ||
      file === undefined ||
      profilePictureDB[0] === '' ? (
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <NextBtnGrayBg>
            <NextBtnGrayText>
              {isLoading ? '이미지 업로드 중...' : '확인'}
            </NextBtnGrayText>
          </NextBtnGrayBg>
        </div>
      ) : (
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <button
            onClick={() => {
              setQuestion('four');
              setNickNameDB(nickNameDB);
              setDescDB(descDB);
            }}
            className="w-full"
          >
            <NextBtnGraBorder>
              <NextBtnGraBg>
                <NextBtnGraText>확인</NextBtnGraText>
              </NextBtnGraBg>
            </NextBtnGraBorder>
          </button>
        </div>
      )}
    </BgWrapper>
  );
};

const MainQuestion = tw.h3`
flex justify-center text-[#242424] font-semibold text-2xl`;

const SubInstruction = tw.h6`flex justify-center text-[#555555] font-medium `;

const NextBtnGraBorder = tw.div`w-full h-[5.25rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const NextBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex justify-center items-center`;
const NextBtnGraText = tw.div`text-xl font-bold bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;
const NextBtnGrayBg = tw.div`w-full h-[5.25rem]  rounded-full bg-[#F5F5F5]   text-center flex justify-center items-center`;
const NextBtnGrayText = tw.div`text-xl font-bold text-[#C1C1C1]`;

const SmGraText = tw.div`text-xs text-center text-[#F79D00] font-bold`;

const BgWrapper = tw.div`bg-white w-screen h-screen  pt-12 max-w-sm mx-auto px-4`;
