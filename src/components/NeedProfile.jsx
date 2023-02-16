import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { QuestionOne } from './onboarding/QuestionOne';
import { QuestionTwo } from './onboarding/QuestionTwo';
import { QuestionThree } from './onboarding/QuestionThree';
import { PreviewCard } from './onboarding/PreviewCard';
import { TutorialSplash } from './onboarding/TutorialSplash';

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

  const [isLoading, setIsLoading] = useState(false);

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

    try {
      setQuestion('five');
      await axios.put(
        `${process.env.REACT_APP_API_ROOT}/api/users/${user._id}`,
        updatedUser
      );
      setTimeout(() => {
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
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            profilePictureDB={profilePictureDB}
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
        {question === 'five' ? <TutorialSplash file={file} /> : null}
      </form>
    </div>
  );
}
