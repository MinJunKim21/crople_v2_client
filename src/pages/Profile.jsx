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
  const [user, setUser] = useState('');
  const username = useParams().username;
  const [followed, setFollowed] = useState(
    userObject.followings.includes(user?._id)
  );

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        'http://localhost:5001/api/users?username=' + username
      );
      setUser(res.data);
    };
    fetchUser();
    setFollowed(userObject.followings.includes(user?._id));
    console.log(userObject.followings.includes(user?._id));
  }, [user._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          'http://localhost:5001/api/users/' + user._id + '/unfollow',
          {
            userId: userObject._id,
          }
        );
      } else {
        await axios.put(
          'http://localhost:5001/api/users/' + user._id + '/follow',
          {
            userId: userObject._id,
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
    window.location.reload(); // 원인 알게되면 이거 바꾸기...
  };

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
          <div>{username === userObject.username && <Infoedit />}</div>
          <div>
            {username === userObject.username && <Rightbar user={user} />}
          </div>
          <div>
            {user.username !== userObject.username && (
              <button onClick={handleClick}>
                {followed === true ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
          {/* <Rightbar user={user} /> */}
        </div>
      </div>
    </div>
  );
}
