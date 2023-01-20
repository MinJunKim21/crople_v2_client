// import styled from 'styled-components';
import tw from 'twin.macro';

import { useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BsChevronLeft } from 'react-icons/bs';

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

const LOCATION_LIST = [
  { id: 0, data: '마포구' },
  { id: 1, data: '서대문구' },
];

export default function NeedProfile() {
  const user = useContext(AuthContext);
  const [sportsCheckedList, setSportsCheckedList] = useState([]);
  const [locationsCheckedList, setLocationsCheckedList] = useState([]);
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('one');

  const nickName = useRef();
  const likeSports = useRef();
  const locations = useRef();
  const selfIntroduction = useRef();

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const onCheckedSportsElement = (checked, item) => {
    if (checked) {
      setSportsCheckedList([...sportsCheckedList, item]);
    } else if (!checked) {
      setSportsCheckedList(sportsCheckedList.filter((el) => el !== item));
    }
    if (sportsCheckedList.length > 4) {
      alert(`다섯개까지만 가능합니다.`);
      setSportsCheckedList(sportsCheckedList.filter((el) => el !== item));
    }
  };

  const onCheckedLocationsElement = (checked, item) => {
    if (checked) {
      setLocationsCheckedList([...locationsCheckedList, item]);
    } else if (!checked) {
      setLocationsCheckedList(locationsCheckedList.filter((el) => el !== item));
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    const updatedUser = {
      nickName: nickName.current.value,
      likeSports: sportsCheckedList,
      locations: locationsCheckedList,
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post(`${process.env.REACT_APP_API_ROOT}/api/upload`, data);
      } catch (err) {}
    }
    try {
      await axios.put(
        `${process.env.REACT_APP_API_ROOT}/api/users/${user._id}`,
        updatedUser
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(nickName.current.value);

  return (
    <div>
      {/* <Topbar /> */}

      <form onSubmit={updateData}>
        {question === 'one' ? (
          <BgWrapper>
            <button>
              <BsChevronLeft />
            </button>
            <MainQuestion className="mt-14">
              어떤 운동을 좋아하세요?
            </MainQuestion>
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
                        class="hidden peer"
                        value={item.data}
                        ref={likeSports}
                        onChange={(e) => {
                          onCheckedSportsElement(
                            e.target.checked,
                            e.target.value
                          );
                        }}
                        checked={
                          sportsCheckedList.includes(item.data) ? true : false
                        }
                      />
                      <OptionBtn for={item.id}>{item.data}</OptionBtn>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="fixed bottom-0 left-[50%] w-full px-4 pb-8 max-w-sm mx-auto justify-center translate-x-[-50%]">
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
            {/* </div> */}
          </BgWrapper>
        ) : null}
        {question === 'two' ? (
          <BgWrapper>
            <button
              onClick={() => {
                setQuestion('one');
              }}
            >
              <BsChevronLeft />
            </button>
            <MainQuestion className="mt-14">
              운동할 지역을 설정해주세요
            </MainQuestion>
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
                        ref={locations}
                        onChange={(e) => {
                          onCheckedLocationsElement(
                            e.target.checked,
                            e.target.value
                          );
                        }}
                        checked={
                          locationsCheckedList.includes(item.data)
                            ? true
                            : false
                        }
                        class="hidden peer"
                      />
                      <OptionBtn for={item.id}>{item.data}</OptionBtn>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="fixed bottom-0 left-[50%] w-full px-4 pb-8 max-w-sm mx-auto justify-center translate-x-[-50%]">
              <NextBtnGraBorder
                onClick={() => {
                  if (locationsCheckedList.length === 0) {
                    alert('최소 하나의 지역을 선택해야합니다');
                  } else if (locationsCheckedList.length > 0) {
                    setQuestion('three');
                  }
                }}
              >
                <NextBtnGraBg>
                  <NextBtnGraText>다음</NextBtnGraText>
                </NextBtnGraBg>
              </NextBtnGraBorder>
            </div>
          </BgWrapper>
        ) : null}
        {question === 'three' ? (
          <BgWrapper>
            <button
              onClick={() => {
                setQuestion('two');
              }}
            >
              <BsChevronLeft />
            </button>
            <MainQuestion>자기소개를 부탁드려요</MainQuestion>
            <SubInstruction className="mb-14">
              메이트를 만날 준비가 다 됐어요
            </SubInstruction>

            {/* <label>프로필 사진</label> */}
            <div>
              <div>
                <div className="relative inline-block">
                  <div>
                    <div className="bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] w-[6.75rem] h-[6.75rem] relative p-[2px] rounded-full">
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
                      htmlFor="fileInput"
                      className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs w-full text-center ${
                        file ? 'text-transparent' : 'text-[#C1C1C1]'
                      }`}
                    >
                      프로필 사진
                    </label>
                  </div>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  required
                  class="opacity-0 w-[1px] peer"
                />
              </div>
            </div>
            {/* <span>필수</span> */}
            <div>
              <span>닉네임</span>
              <input
                ref={nickName}
                type="text"
                placeholder="최대 8글자까지 가능"
                maxLength={8}
                required
                pattern="^[A-Za-z\d$@$!%*#?&]{1,8}$"
                className="peer"
                onBlur={handleFocus}
                focused={focused.toString()}
              />
              {/* <p
                // class={`display-none peer-invalid:block peer-invalid:text-red-700  `}
                class="invisible text-red-500 peer-placeholder-shown:!invisible peer-invalid:visible"
              >
                오류메세지
              </p> */}
            </div>
            <div>
              <span>소개글</span>
              <input
                ref={selfIntroduction}
                type="text"
                placeholder="나를 잘 나타내는 소개글을 입력해주세요"
              />
            </div>

            <button type="submit">입력</button>
          </BgWrapper>
        ) : null}
      </form>
    </div>
  );
}

const MainQuestion = tw.h3`
flex justify-center text-[#242424] font-semibold text-2xl`;

const SubInstruction = tw.h6`flex justify-center text-[#555555] font-medium `;

const OptionBtn = tw.label`border-2 rounded-full peer-checked:border-[#F79D00] font-semibold w-36 h-12 flex text-center justify-center text-[#A5A5A5] items-center z-10`;
// const OptionBtnChecked = tw.div`w-36 h-12 rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286]  peer-checked:bg-transparent`;
// const OptionBtnCheckedBG = tw.div`w-36 h-12 rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex justify-center items-center peer-checked:bg-transparent `;

const NextBtnGraBorder = tw.button`w-full h-[5.25rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const NextBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex justify-center items-center`;
const NextBtnGraText = tw.div`text-xl font-bold bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;

const BgWrapper = tw.div`bg-white w-screen h-screen px-4 pt-12 max-w-sm mx-auto`;

// const BgWrapper = styled.div`
//   background: linear-gradient(
//     17.6deg,
//     rgba(247, 157, 0, 0) 15.18%,
//     rgba(202, 190, 64, 0.28) 52.34%,
//     #a8d69b 89.49%
//   );
//   transform: matrix(1, 0, 0, -1, 0, 0);
// `;

// const BgWrapperA = tw(BgWrapper)`
// flex flex-col w-full h-screen`;
