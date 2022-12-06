import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5001/api/users?username=john`
      );
      setUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-purple-200">
      <Topbar />
      <div>
        <Sidebar />
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
          </div>
          <div>
            <Feed username="john" />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
