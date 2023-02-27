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
          <div className="absolute left-[50%] translate-x-[-50%] z-50 justify-center mt-11">
            <img src="/assets/croXple.png" className="h-6" alt="" />
          </div>
          <div className="absolute left-[50%] translate-x-[-50%] bottom-10">
            <div className="max-w-md mx-auto flex justify-center">
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
                  <div className="w-[5.375rem] h-[5.375rem] object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286] p-[2px]">
                    <img
                      src={userObject.profilePicture[0]}
                      alt=""
                      className="w-20 h-20 object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                    />
                  </div>
                </Link>

                <div className="absolute z-50 left-[50%] top-[35%]">
                  <button
                    onClick={() => handleUserClick(recommendUsers[0])}
                    className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-2 rounded-full"
                  >
                    <img
                      src={recommendUsers[0]?.profilePicture[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                </div>

                <div className="absolute z-50 left-[65%] top-[53%]">
                  <button
                    onClick={() => handleUserClick(recommendUsers[1])}
                    className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-2 rounded-full"
                  >
                    <img
                      src={recommendUsers[1]?.profilePicture[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                </div>

                <div className="absolute z-50 left-[20%] top-[52%]">
                  <button
                    onClick={() => handleUserClick(recommendUsers[2])}
                    className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-2 rounded-full"
                  >
                    <img
                      src={recommendUsers[2]?.profilePicture[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                </div>

                <div className="absolute z-50 left-[37%] top-[64%]">
                  <button
                    onClick={() => handleUserClick(recommendUsers[3])}
                    className="w-[3.75rem] h-[3.75rem] border-[#A5A5A5] border-2 rounded-full"
                  >
                    <img
                      src={recommendUsers[3]?.profilePicture[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                </div>

                <div className="absolute z-50 left-[81%] top-[35%]">
                  <button
                    onClick={() => handleUserClick(recommendUsers[4])}
                    className="w-[3.75rem] h-[3.75rem] border-[#A5A5A5] border-2 rounded-full"
                  >
                    <img
                      src={recommendUsers[4]?.profilePicture[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                </div>

                <div className="absolute z-50 left-[18%] top-[29%]">
                  <button
                    onClick={() => handleUserClick(recommendUsers[5])}
                    className="w-[3.75rem] h-[3.75rem] border-[#A5A5A5] border-2 rounded-full"
                  >
                    <img
                      src={recommendUsers[5]?.profilePicture[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                </div>

                <div className="absolute z-50 left-[45%] top-[15%]">
                  <button
                    onClick={() => handleUserClick(recommendUsers[6])}
                    className="w-[3.125rem] h-[3.125rem] border-[#A5A5A5] border-2 rounded-full"
                  >
                    <img
                      src={recommendUsers[6]?.profilePicture[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                </div>

                <div className="absolute z-50 left-[15%] top-[76%]">
                  <button
                    onClick={() => handleUserClick(recommendUsers[7])}
                    className="w-[3.125rem] h-[3.125rem] border-[#A5A5A5] border-2 rounded-full"
                  >
                    <img
                      src={recommendUsers[7]?.profilePicture[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                </div>

                <div className="absolute z-50 left-[77%] top-[74%]">
                  <button
                    onClick={() => handleUserClick(recommendUsers[8])}
                    className="w-[3.125rem] h-[3.125rem] border-[#A5A5A5] border-2 rounded-full"
                  >
                    <img
                      src={recommendUsers[8]?.profilePicture[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-[50%] translate-x-[-50%]  w-full pb-8 px-4 max-w-sm mx-auto justify-center">
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
w-full h-screen flex flex-col mx-auto max-w-md`;
