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
        ) : // <div>
        //   <div>
        //     <BgGraWrapperA>
        //       <div>
        //         <button
        //           onClick={() => {
        //             setQuestion('three');
        //           }}
        //           className="px-4 pb-2"
        //         >
        //           <BsChevronLeft />
        //         </button>
        //       </div>
        //       <div className="h-full">
        //         <CardWhiteBg className="bg-white w-full h-full backdrop-blur-[2px]	 opacity-95 flex-col">
        //           <div className="flex py-4 w-full">
        //             <h4 className="w-full text-center text-[#8B8B8B]">
        //               프로필카드가 완성되었어요!
        //             </h4>
        //           </div>
        //           <div className="px-4">
        //             <hr className="w-full bg-gradient-to-r to-[#F79D00] via-[#CABE40] from-[#9AE286] h-[2px] px-4" />
        //           </div>
        //           <div className="w-[9.5rem] h-[9.5rem] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286] p-[2px] rounded-full justify-center mx-auto mt-6 ">
        //             <div className="justify-center flex items-center h-full w-full">
        //               <img
        //                 src={file ? URL.createObjectURL(file) : null}
        //                 alt=""
        //                 className="w-full h-full object-cover rounded-full"
        //               />
        //             </div>
        //           </div>
        //           <div className="mt-4 mb-[1.125rem] w-full flex justify-center ">
        //             <div className="bg-[#C1C1C1] w-1.5 h-1.5 rounded-full" />
        //           </div>

        //           <div className="px-6 flex flex-col  w-full">
        //             <div className="flex w-full items-center justify-between mb-8 ">
        //               <div>
        //                 <h4 className="text-[#8B8B8B] text-2xl">
        //                   {nickNameDB}
        //                 </h4>
        //               </div>
        //               <div className="flex items-center space-x-1">
        //                 <span className="text-lg text-[#DFDFDF]">
        //                   <HiLocationMarker />
        //                 </span>
        //                 {locationsCheckedList.map((location) => {
        //                   return (
        //                     <h4
        //                       key={location}
        //                       className="text-[#A5A5A5] text-lg "
        //                     >
        //                       {location}
        //                     </h4>
        //                   );
        //                 })}
        //               </div>
        //             </div>
        //             <div className="flex flex-wrap w-[75%]  ">
        //               {sportsCheckedList.map((likeSports) => {
        //                 return (
        //                   <h4
        //                     key={likeSports}
        //                     className="border px-4 py-2 border-[#A5A5A5] text-center rounded-full text-[#A5A5A5] text-sm mb-2 mr-2"
        //                   >
        //                     {likeSports}
        //                   </h4>
        //                 );
        //               })}
        //             </div>
        //           </div>

        //           <div className="border-1 border-[#DFDFDF] w-full border-t mt-4"></div>
        //           <div className="mt-4">
        //             <div className="w-full h-40 px-6 text-[#6F6F6F] whitespace-pre-wrap">
        //               <span>{descDB}</span>
        //             </div>
        //           </div>
        //         </CardWhiteBg>
        //       </div>
        //     </BgGraWrapperA>
        //   </div>
        //   <div>
        //     {nickNameDB !== '' && profilePictureDB !== '' ? (
        //       <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
        //         <button type="submit" className="w-full">
        //           <LineBtn text={'시작하기'} />
        //         </button>
        //       </div>
        //     ) : null}
        //   </div>
        // </div>
        null}
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
