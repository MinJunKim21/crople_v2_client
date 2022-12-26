import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Rightbar from '../components/Rightbar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [nickName, setNickName] = useState(undefined);
  const userObject = useContext(AuthContext);
  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get(`http://localhost:5001/api/users/all`);
      setAllUsers(res.data);
      // console.log(allUsers);
    };
    fetchAll();
    if (userObject.nickName === undefined) {
      setNickName('기본설정부터 하셔야합니당');
    }
  }, []);
  console.log(userObject.nickName);
  return (
    <div>
      <Topbar />
      <div className="flex flex-col">
        <span>{nickName}</span>
        <span>매칭될 수 있는 사람들 리스트</span>
        <div className="bg-blue-200">
          {allUsers.map((user) => (
            <Link to={`/profile/${user.username}`} key={user._id}>
              <div>{user.username || user.email}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
