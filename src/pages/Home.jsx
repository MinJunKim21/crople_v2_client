import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Rightbar from '../components/Rightbar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NeedProfile from '../components/NeedProfile';

function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [nickName, setNickName] = useState(undefined);
  const userObject = useContext(AuthContext);
  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users/all`
      );
      setAllUsers(res.data);
      // console.log(allUsers);
    };
    fetchAll();
  }, []);

  return (
    <div>
      {userObject.nickName === undefined ? (
        <NeedProfile />
      ) : (
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
      )}
    </div>
  );
}

export default Home;
