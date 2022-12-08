import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useRef } from 'react';

const CATEGORY_LIST = [
  { id: 0, data: '헬스' },
  { id: 1, data: '런닝' },
  { id: 2, data: '자전거' },
  { id: 3, data: '수영' },
  { id: 4, data: '테니스' },
  { id: 5, data: '펜싱' },
  { id: 6, data: '클라이밍' },
  { id: 7, data: '등산' },
];

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [checkedList, setCheckedList] = useState([]);

  const username = useParams().username;
  const nickName = useRef();
  const likeSports = useRef();

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };

  const updateData = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/users/${user._id}`, {
      nickName: nickName.current.value,
      likeSports: checkedList,
      userId: user._id,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5001/api/users?username=${username}`
      );
      setUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <div className="bg-purple-200">
      <Topbar />
      <div>
        {/* <Sidebar /> */}
        <div>
          <div>
            <div>
              <img
                src={user.coverPicture || PF + 'person/noCover.png'}
                alt=""
                className="w-20"
              />
              <img
                src={user.profilePicture || PF + 'person/noAvatar.png'}
                alt=""
                className="w-6"
              />
            </div>
            <div>
              <h4>{user.username}</h4>
              <span>{user.desc}</span>
            </div>
            <div>
              <span>nickName : </span>
              <span>{user.nickName}</span>
            </div>
            <div>
              <span>likeSports : </span>
              <span>{user.likeSports}</span>
            </div>
            <div>
              <span>Relationship : </span>
              <span>
                {user.relationship === 1
                  ? 'Single'
                  : user.relationship === 2
                  ? 'Married'
                  : '-'}
              </span>
            </div>
            <form onSubmit={updateData}>
              <span>캐릭터 이름을 입력하세요</span>
              <input
                ref={nickName}
                type="text"
                placeholder="handsomeJ"
                required
              />
              <div>
                {CATEGORY_LIST.map((item) => {
                  return (
                    <label key={item.id}>
                      <input
                        type="checkbox"
                        value={item.data}
                        ref={likeSports}
                        onChange={(e) => {
                          onCheckedElement(e.target.checked, e.target.value);
                        }}
                        checked={checkedList.includes(item.data) ? true : false}
                      />
                      <type>{item.data}</type>
                    </label>
                  );
                })}
              </div>
              <button type="submit">입력</button>
            </form>
          </div>
          <div>
            {/* <Feed username={username} /> */}
            {/* <Rightbar user={user} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
