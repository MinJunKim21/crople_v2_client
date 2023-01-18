import { useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

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
          <div class="bg-gray-600 w-screen h-screen">
            <span>어떤 운동을 좋아하세요?</span>
            <span>다섯 개까지 선택할 수 있어요</span>
            <div>
              <div>
                {SPORTS_LIST.map((item) => {
                  return (
                    <label key={item.id}>
                      <input
                        type="checkbox"
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
                      <div>{item.data}</div>
                    </label>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => {
                if (sportsCheckedList.length === 0) {
                  alert('최소 하나의 운동을 선택해야합니다');
                } else if (sportsCheckedList.length > 0) {
                  setQuestion('two');
                }
              }}
            >
              다음
            </button>
          </div>
        ) : null}
        {question === 'two' ? (
          <div>
            <div>
              <span>운동할 지역을 설정해주세요</span>
              <span>중복으로 선택할 수 있어요</span>
            </div>
            <div>
              {LOCATION_LIST.map((item) => {
                return (
                  <label key={item.id}>
                    <input
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
                    />
                    <div>{item.data}</div>
                  </label>
                );
              })}
            </div>
            <button
              onClick={() => {
                if (locationsCheckedList.length === 0) {
                  alert('최소 하나의 지역을 선택해야합니다');
                } else if (locationsCheckedList.length > 0) {
                  setQuestion('three');
                }
              }}
            >
              다음
            </button>
          </div>
        ) : null}
        {question === 'three' ? (
          <div>
            <div>
              <h3>자기소개를 부탁드려요</h3>
              <span>메이트를 만날 준비가 다 됐어요</span>
            </div>
            {/* <label>프로필 사진</label> */}
            <div class="border border-2 border-orange-400 p-5 w-24 ">
              <img src={file ? URL.createObjectURL(file) : null} alt="" />
              <label htmlFor="fileInput">프로필 사진</label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                required
                class="opacity-0 w-0"
              />
            </div>
            <span>필수</span>
            <div>
              <span>닉네임</span>
              <span class="text-blue-300 invalid:border-red-700">
                오류메세지
              </span>
              <input
                ref={nickName}
                type="text"
                placeholder="최대 8글자까지 가능"
                maxLength={8}
                required
              />
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
          </div>
        ) : null}
      </form>
    </div>
  );
}
