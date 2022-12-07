import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

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
              <span>city : </span>
              <span>{user.city}</span>
            </div>
            <div>
              <span>From : </span>
              <span>{user.from}</span>
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
