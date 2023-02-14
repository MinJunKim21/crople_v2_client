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
import { QuestionOne } from './questions/QuestionOne';
import { QuestionTwo } from './questions/QuestionTwo';
import { QuestionThree } from './questions/QuestionThree';
import { PreviewCard } from './questions/\bPreviewCard';

export default function NeedProfile() {
  const user = useContext(AuthContext);
  const [sportsCheckedList, setSportsCheckedList] = useState([]);
  const [locationsCheckedList, setLocationsCheckedList] = useState([]);
  const [file, setFile] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [fileC, setFileC] = useState(null);
  const [question, setQuestion] = useState('one');
  const [profilePictureDB, setProfilePictureDB] = useState(['', '', '']);
  if (profilePictureDB[2] !== '' && profilePictureDB[1] === '') {
    profilePictureDB[1] = profilePictureDB[2];
    profilePictureDB[2] = '';
  }
  const [nickNameDB, setNickNameDB] = useState('');
  const [descDB, setDescDB] = useState('');

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

  const fileChange = async (e, index) => {
    const uploaded = await uploadImage(e.target.files[0]);
    profilePictureDB[index] = uploaded.data.secure_url;
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
      }, 2000);
    } catch (err) {
      console.log(err);
      setProfilePictureDB([]);
    }
  };

  return (
    <div>
      <form onSubmit={updateData}>
        {question === 'one' ? (
          <QuestionOne
            sportsCheckedList={sportsCheckedList}
            onCheckedSportsElement={onCheckedSportsElement}
            setQuestion={setQuestion}
            useRef={likeSports}
          />
        ) : null}
        {question === 'two' ? (
          <QuestionTwo
            locationsCheckedList={locationsCheckedList}
            onCheckedLocationsElement={onCheckedLocationsElement}
            setQuestion={setQuestion}
            useRef={locations}
          />
        ) : null}
        {question === 'three' ? (
          <QuestionThree
            setQuestion={setQuestion}
            file={file}
            fileB={fileB}
            fileC={fileC}
            setFile={setFile}
            setFileB={setFileB}
            setFileC={setFileC}
            fileChange={fileChange}
            nickName={nickName}
            nickNameDB={nickNameDB}
            setNickNameDB={setNickNameDB}
            useRef={selfIntroduction}
            descDB={descDB}
            setDescDB={setDescDB}
          />
        ) : null}
        {question === 'four' ? (
          <PreviewCard
            setQuestion={setQuestion}
            file={file}
            nickNameDB={nickNameDB}
            locationsCheckedList={locationsCheckedList}
            sportsCheckedList={sportsCheckedList}
            descDB={descDB}
            profilePictureDB={profilePictureDB}
          />
        ) : null}
        {question === 'five' ? (
          <div>
            <div className="relative h-screen w-screen">
              <h3 className="text-center">나와 꼭 맞는 메이트를 만나보세요!</h3>
              <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] border">
                <h4 className="text-center">
                  여기서 프로필을 수정할 수 있어요.
                </h4>
              </div>
              <img
                src={file ? URL.createObjectURL(file) : null}
                alt=""
                className="w-20 h-20 object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
              />
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

// const OptionBtn = tw.label`border-2 rounded-full peer-checked:border-[#F79D00] font-semibold w-36 h-12 flex text-center justify-center text-[#A5A5A5] items-center z-10`;

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
