import styled from 'styled-components';
import tw from 'twin.macro';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import NeedProfile from '../components/NeedProfile';
import TabBar from '../components/btn&tab&bar/MainTabBar';
import { ProfileCard } from '../components/ProfileCard';
import { Link } from 'react-router-dom';

function Home() {
  const [recommendUsers, setRecommendUsers] = useState([]);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const userObject = useContext(AuthContext);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowProfileCard(true);
  };

  const handleCloseProfileCard = () => {
    setShowProfileCard(false);
  };

  useEffect(() => {
    const fetchRecommend = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users/recommend`
      );
      setRecommendUsers(res.data);
    };
    fetchRecommend();
  }, []);

  return (
    <div>
      {userObject.nickName === undefined || userObject.profilePicture === '' ? (
        <NeedProfile />
      ) : showProfileCard ? (
        <ProfileCard user={selectedUser} onClose={handleCloseProfileCard} />
      ) : (
        <BgGraWrapperA>
          <h3 className="text-center pt-12  text-[#555555]">
            나와 꼭 맞는 메이트를 만나보세요!
          </h3>
          <div className="absolute bottom-10">
            <img
              src="assets/pattern/WhiteCenterBlur.png"
              className="h-full w-full absolute"
              alt=""
            />
            <img
              src="assets/pattern/LineCenterCircle.png"
              className="h-full w-full object-contain absolute"
              alt=""
            />

            <div className="relative h-screen w-screen">
              <Link to={`/profile/${userObject._id}`}>
                <img
                  src={userObject.profilePicture[0]}
                  alt=""
                  className="w-20 h-20 object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                />
              </Link>
            </div>
          </div>
          <div className="z-50">
            {recommendUsers.map((user) => (
              // <Link to={`/profile/${user._id}`} key={user._id}>
              <button key={user._id} onClick={() => handleUserClick(user)}>
                <div className="w-10 h-10">
                  <img
                    src={user.profilePicture[0]}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </button>
              // </Link>
            ))}
          </div>
          <div className="fixed bottom-0 left-0  w-full pb-8 px-4 max-w-sm mx-auto justify-center">
            <TabBar />
          </div>
        </BgGraWrapperA>
      )}
    </div>
  );
}

export default Home;

const BgGraWrapper = styled.div`
  background: linear-gradient(
    341.82deg,
    #a8d69b 10.29%,
    rgba(202, 190, 64, 0.28) 47.5%,
    rgba(247, 157, 0, 0) 84.7%
  );
`;

const BgGraWrapperA = tw(BgGraWrapper)`
w-full h-screen  flex flex-col mx-auto`;
