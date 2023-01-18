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
  };

  const onCheckedLocationsElement = (checked, item) => {
    if (checked) {
      setLocationsCheckedList([...locationsCheckedList, item]);
    } else if (!checked) {
      setLocationsCheckedList(locationsCheckedList.filter((el) => el !== item));
    }
  };

  return (
    <div>
      {/* <Topbar /> */}
      {question === 'one' ? (
        <div className="bg-gray-600 w-screen h-screen">
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
              setQuestion('two');
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
              setQuestion('three');
            }}
          >
            다음
          </button>
        </div>
      ) : null}
      {question === 'three' ? (
        <div>
          <div>
            <span>자기소개를 부탁드려요</span>
            <span>메이트를 만날 준비가 다 됐어요</span>
          </div>
          <label>프로필 사진</label>
          <div>
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <span>profile pic upload</span>
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <div>
            <span>닉네임</span>
            <input
              ref={nickName}
              type="text"
              placeholder="최대 8글자까지 가능"
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
          <button
            onClick={() => {
              setQuestion('three');
            }}
          >
            다음
          </button>
        </div>
      ) : null}
    </div>
  );
}
