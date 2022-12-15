import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SPORTS_LIST = [
  { id: 0, data: '헬스' },
  { id: 1, data: '런닝' },
  { id: 2, data: '자전거' },
  { id: 3, data: '수영' },
  { id: 4, data: '테니스' },
  { id: 5, data: '펜싱' },
  { id: 6, data: '클라이밍' },
  { id: 7, data: '등산' },
];
const LOCATION_LIST = [
  { id: 0, data: '마포구' },
  { id: 1, data: '종로구' },
  { id: 2, data: '강남구' },
  { id: 3, data: '서초구' },
  { id: 4, data: '성동구' },
];

export default function Infoedit() {
  const user = useContext(AuthContext);
  const [sportsCheckedList, setSportsCheckedList] = useState([]);
  const [locationsCheckedList, setLocationsCheckedList] = useState([]);
  const [showGenderChecked, setShowGenderChecked] = useState([]);

  const nickName = useRef();
  const likeSports = useRef();
  const locations = useRef();

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

  const updateData = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/users/${user._id}`, {
      nickName: nickName.current.value,
      likeSports: sportsCheckedList,
      locations: locationsCheckedList,
      showGender: showGenderChecked,
      userId: user._id,
    });
  };
  return (
    <div>
      <form onSubmit={updateData}>
        <span>캐릭터 이름을 입력하세요</span>
        <input ref={nickName} type="text" placeholder="handsomeJ" required />
        <div>
          {SPORTS_LIST.map((item) => {
            return (
              <label key={item.id}>
                <input
                  type="checkbox"
                  value={item.data}
                  ref={likeSports}
                  onChange={(e) => {
                    onCheckedSportsElement(e.target.checked, e.target.value);
                  }}
                  checked={sportsCheckedList.includes(item.data) ? true : false}
                />
                <div>{item.data}</div>
              </label>
            );
          })}
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
                    onCheckedLocationsElement(e.target.checked, e.target.value);
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
        <div>
          <input
            type="radio"
            name="1"
            id="man"
            value="man"
            onChange={(e) => {
              setShowGenderChecked(e.target.value);
            }}
          />
          <label htmlFor="man">man</label>
          <input
            type="radio"
            name="1"
            id="woman"
            value="woman"
            onChange={(e) => {
              setShowGenderChecked(e.target.value);
            }}
          />
          <label htmlFor="woman">woman</label>
          <input
            type="radio"
            name="1"
            id="both"
            value="both"
            onChange={(e) => {
              setShowGenderChecked(e.target.value);
            }}
          />
          <label htmlFor="both">both</label>
        </div>
        <button type="submit">입력</button>
      </form>
    </div>
  );
}
