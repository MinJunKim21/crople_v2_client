import { useState } from 'react';
import { useEffect } from 'react';
import { Users } from '../dummyData';
import Online from './Online';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const userObject = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    userObject.followings.includes(user?._id)
  );

  console.log(userObject.followings, 'userObject.followings');
  console.log(
    userObject.followings.includes(user?._id),
    'userObject.followings.includes(user?._id)'
  );
  // console.log(userObject.followers, 'followed');
  useEffect(() => {
    setFollowed(userObject.followings.includes(user?._id));
  }, [userObject.followings.includes(user?._id)]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          `${process.env.REACT_APP_API_ROOT}/api/users/` +
            user._id +
            '/unfollow',
          {
            userId: userObject._id,
          }
        );
      } else {
        await axios.put(
          `${process.env.REACT_APP_API_ROOT}/api/users/` + user._id + '/follow',
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
          `${process.env.REACT_APP_API_ROOT}/api/users/friends/` +
            userObject._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [userObject._id]);

  return (
    <div>
      <div>
        <div className="bg-orange-200">
          {user.username !== userObject.username && (
            <button onClick={handleClick}>
              {followed ? 'Unfollow' : 'Follow'}
            </button>
          )}
          <h4>???????????? ???????????? ??????????????? friends</h4>
          <div>
            {friends.map((friend) => (
              <Link to={'/profile/' + friend.username} key={friend.username}>
                <div>
                  <img
                    src={
                      friend.profilePicture
                        ? friend.profilePicture
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
      </div>
    </div>
  );
}

export default Rightbar;
