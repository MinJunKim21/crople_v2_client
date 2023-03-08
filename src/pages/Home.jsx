import styled from 'styled-components';
import tw from 'twin.macro';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import NeedProfile from '../components/home/NeedProfile/NeedProfile';
import TabBar from '../components/btn&tab&bar/MainTabBar';
import { ProfileCard } from '../components/home/ProfileCard';
import { Link } from 'react-router-dom';
import { RecommendPic } from '../components/home/RecommendPic';
import HomeMenu from '../components/home/HomeMenu/HomeMenu';
import { Header } from '../components/home/Header';

function Home() {
  const [recommendUsers, setRecommendUsers] = useState([]);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [logoutCheck, setLogoutCheck] = useState(false);
  const [kakaoCheck, setKakaoCheck] = useState(false);
  const userObject = useContext(AuthContext);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowProfileCard(true);
  };

  const handleCloseProfileCard = () => {
    setShowProfileCard(false);
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetchRecommend = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users/recommend?userId=${userObject._id}`
      );
      setRecommendUsers(res.data);
    };
    fetchRecommend();
  }, [userObject._id]);

  return (
    <div>
      {userObject.nickName === undefined || userObject.profilePicture === '' ? (
        <NeedProfile />
      ) : showProfileCard ? (
        <ProfileCard user={selectedUser} onClose={handleCloseProfileCard} />
      ) : (
        <div>
          <BgGraWrapperA>
            <BgWhiteBlurA>
              <Header showMenu={showMenu} handleShowMenu={handleShowMenu} />
              <div className="absolute left-[50%] translate-x-[-50%] bottom-5">
                <img
                  src="assets/pattern/LineCenterCircle.png"
                  className="h-full w-full object-contain absolute"
                  alt=""
                />
                <div className="relative h-screen w-screen max-w-md">
                  <Link to={`/profile/${userObject._id}`}>
                    <div className="w-[5.375rem] h-[5.375rem] object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286]">
                      <img
                        src={userObject.profilePicture[0]}
                        alt=""
                        className="w-[5.25rem] h-[5.25rem] object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                      />
                    </div>
                  </Link>
                  <RecommendPic
                    recommendUsers={recommendUsers}
                    handleUserClick={handleUserClick}
                  />
                </div>
              </div>
              <div className="fixed bottom-0 left-[50%] translate-x-[-50%]  w-full pb-8 px-4 max-w-sm mx-auto justify-center">
                <TabBar />
              </div>
            </BgWhiteBlurA>
          </BgGraWrapperA>
          {showMenu && (
            <HomeMenu
              showMenu={showMenu}
              setKakaoCheck={setKakaoCheck}
              setLogoutCheck={setLogoutCheck}
              kakaoCheck={kakaoCheck}
              logoutCheck={logoutCheck}
              handleShowMenu={handleShowMenu}
            />
          )}
        </div>
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

const BgWhiteBlur = styled.div`
  background-image: url('/assets/pattern/WhiteCenterBlur.png');
  background-size: cover;
  background-position: center;
`;

const BgGraWrapperA = tw(BgGraWrapper)`
w-full h-screen flex flex-col mx-auto max-w-md`;

const BgWhiteBlurA = tw(BgWhiteBlur)`
w-full h-screen absolute max-w-md`;
