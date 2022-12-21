import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Rightbar from '../components/Rightbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Infoedit from '../components/Infoedit';

export default function Profile() {
  const userObject = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        'http://localhost:5001/api/users?username=' + username
      );
      setUser(res.data);
      console.log(res.data, 'iii');
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
              <span>locations : </span>
              <span>{user.locations}</span>
            </div>
            <div>
              <span>want gender : </span>
              <span>{user.showGender}</span>
            </div>
          </div>
          <div>
            {username === userObject.username && <Infoedit />}
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
