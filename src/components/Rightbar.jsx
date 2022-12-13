import { useState } from 'react';
import { useEffect } from 'react';
import { Users } from '../dummyData';
import Online from './Online';
import axios from 'axios';
import { useContext } from 'react';
import { myContext } from '../context/Context';
import { Link } from 'react-router-dom';

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const userObject = useContext(myContext);
  const [followed, setFollowed] = useState(
    userObject.followings.includes(user?._id)
  );
  console.log(user, 'user');
  console.log(userObject.followings, 'userObject.followings');
  console.log(followed, '1');
  console.log(userObject.followings.includes(user?._id), '2');

  useEffect(() => {
    setFollowed(userObject.followings.includes(user?._id));
  }, [userObject, user.id]);

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
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          'http://localhost:5001/api/users/friends/' + userObject._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [userObject._id]);

  const HomeRightbar = () => {
    return (
      <div className="bg-red-200">
        <div>
          <img src="assets/gift.png" alt="" className="w-6" />
          <span>happy bday my friends</span>
        </div>
        <img src="assets/ad.png" alt="" className="w-6" />
        <h4>online friends</h4>
        <ul>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div className="bg-orange-200">
        {user.username !== userObject.username && (
          <button onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
          </button>
        )}
        <h4>user information</h4>
        <h4>user friends</h4>
        <div>
          {friends.map((friend) => (
            <Link to={'/profile/' + friend.username} key={userObject._id}>
              <div key={userObject._id}>
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + 'person/noAvatar.png'
                  }
                  alt=""
                />
                <span>{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div>{/* <HomeRightbar /> */}</div>
      <div>
        <ProfileRightbar />
      </div>
      {/* <HomeRightbar />
      <ProfileRightbar /> */}
    </div>
  );
}

export default Rightbar;
