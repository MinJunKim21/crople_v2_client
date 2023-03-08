import tw from 'twin.macro';
import styled from 'styled-components';

import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { LineBtn } from '../components/btn&tab&bar/LineBtn';
import { LoadingBtn } from '../components/btn&tab&bar/LoadingBtn';
import { ProfileEditHeader } from '../components/profileEdit/ProfileEditHeader';
import { ProfilePicOne } from '../components/profileEdit/ProfilePicOne';
import { ProfilePicTwo } from '../components/profileEdit/ProfilePicTwo';
import { ProfilePicThree } from '../components/profileEdit/ProfilePicThree';
import { EditCancelCheck } from '../components/profileEdit/EditCancelCheck';
import { SportsCheck } from '../components/profileEdit/SportsCheck';
import { LocationsCheck } from '../components/profileEdit/LocationsCheck';
import { LocationSelect } from '../components/profileEdit/LocationSelect';
import { SportsSelect } from '../components/profileEdit/SportsSelect';
import { TextareaEdit } from '../components/profileEdit/TextareaEdit';

const LOCATION_LIST = [
  { id: 0, data: '마포구' },
  { id: 1, data: '서대문구' },
];

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

export const ProfileEdit = () => {
  const userObject = useContext(AuthContext);
  const [user, setUser] = useState('');
  const _id = useParams()._id;

  const selfIntroduction = useRef();
  const [descDB, setDescDB] = useState(userObject.desc);
  const [profilePictureDB, setProfilePictureDB] = useState([
    userObject.profilePicture[0],
    userObject.profilePicture[1],
    userObject.profilePicture[2],
  ]);
  const [file, setFile] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [fileC, setFileC] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [cancelEdit, setCancelEdit] = useState(false);
  const [locationQuestion, setLocationQuestion] = useState(false);
  const [sportsQuestion, setSportsQuestion] = useState(false);
  const [locationsCheckedList, setLocationsCheckedList] = useState(
    userObject.locations
  );
  const [sportsCheckedList, setSportsCheckedList] = useState(
    userObject.likeSports
  );

  const locations = useRef();
  const likeSports = useRef();

  const [initialLocationsCheckedList] = useState(userObject.locations);
  const [initialSportsCheckedList] = useState(userObject.likeSports);

  const [tempLocation, setTempLocation] = useState(false);
  const [tempSports, setTempSports] = useState(false);

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

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users?userId=` + _id
      );
      setUser(res.data);
    };
    fetchUser();
  }, [_id, user?._id, userObject.followings]);

  const byteCounter = (s, b, i, c) => {
    for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 2 : c >> 7 ? 2 : 1);
    return b;
  };

  const updateData = async (e) => {
    const updatedUser = {
      userId: user._id,
      desc: descDB,
      profilePicture: profilePictureDB,
      likeSports: sportsCheckedList,
      locations: locationsCheckedList,
    };
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_ROOT}/api/users/${user._id}`,
        updatedUser
      );
      window.location.href = `${process.env.REACT_APP_HOME_URL}/profile/${user._id}`;
    } catch (err) {
      console.log(err);
      setProfilePictureDB([]);
    }
  };

  const uploadImage = async (file) => {
    setIsLoading(true);
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
    setIsLoading(false);
    return res;
  };

  const fileChange = async (e, index) => {
    const uploaded = await uploadImage(e.target.files[0]);
    profilePictureDB[index] = uploaded.data.secure_url;
  };

  return (
    <form onSubmit={updateData}>
      <div className="mx-auto max-w-md">
        <BgGraWrapperA>
          <ProfileEditHeader setCancelEdit={setCancelEdit} />
          <div className="h-full mt-2">
            <CardWhiteBgA>
              <div className="flex py-4 w-full">
                <h4 className="w-full text-center text-[#8B8B8B]">
                  프로필 수정
                </h4>
              </div>
              <div className="px-4">
                <hr className="w-full bg-gradient-to-r to-[#F79D00] via-[#CABE40] from-[#9AE286] h-[2px] px-4 mb-8" />
              </div>

              <div className="flex justify-center space-x-4">
                <ProfilePicOne
                  file={file}
                  userObject={userObject}
                  setFile={setFile}
                  fileChange={fileChange}
                />
                <ProfilePicTwo
                  fileB={fileB}
                  userObject={userObject}
                  setFileB={setFileB}
                  fileChange={fileChange}
                />
                <ProfilePicThree
                  fileC={fileC}
                  userObject={userObject}
                  setFileC={setFileC}
                  fileChange={fileChange}
                />
              </div>

              <div className="px-6 flex flex-col  w-full">
                <div className="flex w-full items-center justify-between mb-8 ">
                  <div>
                    <h4 className="text-[#8B8B8B] text-2xl">
                      {userObject.nickName}
                    </h4>
                  </div>
                  <LocationSelect
                    tempLocation={tempLocation}
                    locationsCheckedList={locationsCheckedList}
                    userObject={userObject}
                    setLocationQuestion={setLocationQuestion}
                  />
                </div>
                <SportsSelect
                  tempSports={tempSports}
                  sportsCheckedList={sportsCheckedList}
                  userObject={userObject}
                  setSportsQuestion={setSportsQuestion}
                />
              </div>
              <TextareaEdit
                selfIntroduction={selfIntroduction}
                descDB={descDB}
                userObject={userObject}
                byteCounter={byteCounter}
                setDescDB={setDescDB}
              />
            </CardWhiteBgA>
          </div>
        </BgGraWrapperA>
      </div>
      {isLoading ? (
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <LoadingBtn text={'이미지 업로드 중...'} />
        </div>
      ) : (
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <button type="submit" className="w-full">
            <LineBtn text={'수정완료'} />
          </button>
        </div>
      )}
      {locationQuestion && (
        <LocationsCheck
          LOCATION_LIST={LOCATION_LIST}
          onCheckedLocationsElement={onCheckedLocationsElement}
          locations={locations}
          setLocationsCheckedList={setLocationsCheckedList}
          initialLocationsCheckedList={initialLocationsCheckedList}
          setLocationQuestion={setLocationQuestion}
          setTempLocation={setTempLocation}
          locationsCheckedList={locationsCheckedList}
        />
      )}
      {sportsQuestion && (
        <SportsCheck
          SPORTS_LIST={SPORTS_LIST}
          likeSports={likeSports}
          onCheckedSportsElement={onCheckedSportsElement}
          sportsCheckedList={sportsCheckedList}
          setSportsQuestion={setSportsQuestion}
          setSportsCheckedList={setSportsCheckedList}
          initialSportsCheckedList={initialSportsCheckedList}
          setTempSports={setTempSports}
        />
      )}
      {cancelEdit && (
        <EditCancelCheck
          setCancelEdit={setCancelEdit}
          setSportsQuestion={setSportsQuestion}
          setTempSports={setTempSports}
          userObject={userObject}
        />
      )}
    </form>
  );
};

const BgGraWrapper = styled.div`
  background: linear-gradient(
    166.9deg,
    rgba(247, 157, 0, 0.05) -17.3%,
    rgba(202, 190, 64, 0.28) 36.08%,
    #a8d69b 89.46%
  );
`;

const BgGraWrapperA = tw(BgGraWrapper)`
w-full h-screen pt-12 flex flex-col `;

const CardWhiteBg = styled.div`
  background: #ffffff;

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16), 4px 8px 28px rgba(0, 0, 0, 0.08);
  border-radius: 2rem 2rem 0px 0px;
`;

const CardWhiteBgA = tw(CardWhiteBg)`
bg-white w-full h-full backdrop-blur-[2px] opacity-95 flex-col `;
