import tw from 'twin.macro';
import styled from 'styled-components';

import { useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BsChevronLeft } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';

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
  const [fileB, setFileB] = useState(null);
  const [fileC, setFileC] = useState(null);
  const [question, setQuestion] = useState('one');
  const [profilePictureDB, setProfilePictureDB] = useState([]);
  const [nickNameDB, setNickNameDB] = useState('');
  const [descDB, setDescDB] = useState('');
  // const [imageSelected, setImageSelected] = useState('');
  console.log(file, 'file');
  console.log(fileB, 'fileB');
  console.log(fileC, 'fileC');
  console.log(profilePictureDB, 'profilePictureDB');

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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      `${process.env.REACT_APP_CLOUDINARY_PRESET}`
    );

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      formData
    );
    return res;
  };

  const fileChange = async (e) => {
    const uploaded = await uploadImage(e.target.files[0]);
    console.log(uploaded, 'filechange uploaded');
    // setProfilePictureDB(uploaded.data.secure_url);
    profilePictureDB.push(uploaded.data.secure_url);
  };

  const updateData = async (e) => {
    const updatedUser = {
      nickName: nickNameDB,
      likeSports: sportsCheckedList,
      locations: locationsCheckedList,
      userId: user._id,
      desc: descDB,
      profilePicture: profilePictureDB,
    };
    e.preventDefault();
    console.log(profilePictureDB, 'expecting url');

    try {
      setQuestion('five');
      await axios.put(
        `${process.env.REACT_APP_API_ROOT}/api/users/${user._id}`,
        updatedUser
      );
      await setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (err) {
      console.log(err);
      setProfilePictureDB([]);
    }
  };

  const byteCounter = (s, b, i, c) => {
    for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);

    return b;
  };

  return (
    <div>
      {/* <Topbar /> */}

      <form onSubmit={updateData}>
        {question === 'one' ? (
          <BgWrapper>
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
                        className="hidden peer"
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
                        className="hidden peer"
                      />
                      <OptionBtn htmlFor={item.id}>{item.data}</OptionBtn>
                    </li>
                  );
                })}
              </ul>
            </div>
            {locationsCheckedList.length === 0 ? (
              <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
                <NextBtnGrayBg>
                  <NextBtnGrayText>다음</NextBtnGrayText>
                </NextBtnGrayBg>
              </div>
            ) : (
              <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
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
            )}
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
            <SubInstruction className="mb-8">
              메이트를 만날 준비가 다 됐어요
            </SubInstruction>

            {/* <label>프로필 사진</label> */}
            <div className="flex justify-center space-x-4">
              <div className="inline-block">
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
                      htmlFor="fileInputA"
                      className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs w-full text-center ${
                        file ? 'text-transparent' : 'text-[#C1C1C1]'
                      }`}
                    >
                      프로필 사진
                    </label>
                  </div>
                </div>
                <SmGraText>필수</SmGraText>
                <input
                  type="file"
                  id="fileInputA"
                  onChange={(e) => {
                    // setImageSelected(e.target.files[0]);
                    setFile(e.target.files[0]);
                    fileChange(e);
                  }}
                  required
                  className="opacity-0 w-[1px] peer"
                />
              </div>

              <div className="inline-block">
                <div className="relative inline-block">
                  <div>
                    <div className="bg-white  border-[1.5px] border-dashed border-[#C1C1C1] w-[6.75rem] h-[6.75rem] relative p-[2px]  rounded-full">
                      {file ? (
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
                      className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-4xl  font-extralight w-full text-center ${
                        fileB ? 'text-transparent' : 'text-[#C1C1C1]'
                      }`}
                    >
                      +
                    </label>
                  </div>
                </div>
                <h6 className="text-xs text-[#8B8B8B] text-center">선택</h6>
                <input
                  type="file"
                  id="fileInputB"
                  onChange={(e) => {
                    setFileB(e.target.files[0]);
                    fileChange(e);
                  }}
                  className="opacity-0 w-[1px] peer"
                />
              </div>

              <div className="inline-block">
                <div className="relative inline-block">
                  <div>
                    <div className="bg-white  border-[1.5px] border-dashed border-[#C1C1C1] w-[6.75rem] h-[6.75rem] relative p-[2px]  rounded-full">
                      {file ? (
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
                      className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-4xl  font-extralight w-full text-center ${
                        fileC ? 'text-transparent' : 'text-[#C1C1C1]'
                      }`}
                    >
                      +
                    </label>
                  </div>
                </div>
                <h6 className="text-xs text-[#8B8B8B] text-center">선택</h6>
                <input
                  type="file"
                  id="fileInputC"
                  onChange={(e) => {
                    // setImageSelected(e.target.files[0]);
                    setFileC(e.target.files[0]);
                    fileChange(e);
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
                  maxLength={8}
                  required
                  pattern="^[ㄱ-ㅎ가-힣a-zA-Z]+$"
                  className="peer w-full "
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  onChange={() => setNickNameDB(nickName.current.value)}
                />
                <i
                  className="text-[#DFDFDF] w-6 h-6 text-[1.5rem]"
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
              {nickNameDB.length}/8
            </div>
            <div>
              <textarea
                ref={selfIntroduction}
                type="text"
                value={descDB}
                placeholder="나를 잘 나타내는 소개글을 입력해주세요 (선택)"
                className="w-full border-2 rounded-lg h-[11.75rem] px-2 py-3"
                onChange={() => {
                  if (byteCounter(selfIntroduction.current.value) > 240) {
                    selfIntroduction.current.value =
                      selfIntroduction.current.value.slice(0, -1);
                    console.log(selfIntroduction.current.value.slice(0, -5));
                  }
                  setDescDB(selfIntroduction.current.value);
                }}
              />
              <div className="text-[#A5A5A5] text-xs text-right">
                {byteCounter(descDB)}/240
              </div>
            </div>

            <div className="mt-2">
              <p className="text-xs text-[#8B8B8B] bg-[#F5F5F5] text-center p-2.5 rounded-lg">
                과도한 노출로 선정적이거나 개인 정보를 포함한 이미지 등<br />
                <b className="font-bold">커뮤니티 가이드라인</b>을 위반할 경우
                계정이 제한될 수 있습니다.
              </p>
            </div>
            {nickNameDB === '' || file === null || file === undefined ? (
              <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
                <NextBtnGrayBg>
                  <NextBtnGrayText>확인</NextBtnGrayText>
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
        ) : null}
        {question === 'four' ? (
          <div>
            <div>
              <BgGraWrapperA>
                <div>
                  <button
                    onClick={() => {
                      setQuestion('three');
                    }}
                    className="px-4 pb-2"
                  >
                    <BsChevronLeft />
                  </button>
                </div>
                <div className="h-full">
                  <CardWhiteBg className="bg-white w-full h-full backdrop-blur-[2px]	 opacity-95 flex-col">
                    <div className="flex py-4 w-full">
                      <h4 className="w-full text-center text-[#8B8B8B]">
                        프로필카드가 완성되었어요!
                      </h4>
                    </div>
                    <div className="px-4">
                      <hr className="w-full bg-gradient-to-r to-[#F79D00] via-[#CABE40] from-[#9AE286] h-[2px] px-4" />
                    </div>
                    <div className="w-[9.5rem] h-[9.5rem] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286] p-[2px] rounded-full justify-center mx-auto mt-6 mb-14">
                      <div className="justify-center flex items-center h-full w-full">
                        <img
                          src={file ? URL.createObjectURL(file) : null}
                          alt=""
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>

                    <div className="px-4 flex flex-col  w-full">
                      <div className="flex w-full items-center justify-between">
                        <div>
                          <h4 className="text-[#8B8B8B] text-2xl">
                            {nickNameDB}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-lg text-[#DFDFDF]">
                            <HiLocationMarker />
                          </span>
                          {locationsCheckedList.map((location) => {
                            return (
                              <h4
                                key={location}
                                className="text-[#A5A5A5] text-lg "
                              >
                                {location}
                              </h4>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex w-full">
                        {sportsCheckedList.map((likeSports) => {
                          return (
                            <h4 className="border-2 border-[#C1C1C1] w-20 h-[1.875rem] text-center items-center rounded-full text-[#C1C1C1]">
                              {likeSports}
                            </h4>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-1 border-[#DFDFDF] w-full border-t mt-[3.75rem]"></div>
                    <div className=" px-4 mt-4">
                      <div className="w-full h-40 px-6 text-[#6F6F6F]">
                        <span>{descDB}</span>
                      </div>
                    </div>
                  </CardWhiteBg>
                </div>
              </BgGraWrapperA>
            </div>
            <div>
              {nickNameDB !== '' && profilePictureDB !== '' ? (
                <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
                  <button type="submit" className="w-full">
                    <NextBtnGraBorder>
                      <NextBtnGraBg>
                        <NextBtnGraText>시작하기</NextBtnGraText>
                      </NextBtnGraBg>
                    </NextBtnGraBorder>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {question === 'five' ? (
          <div>
            <div>
              <h3>loading...</h3>
              <h4>여기서 프로필을 수정할 수 있어요.</h4>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}

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
