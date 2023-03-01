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
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { LineShadowBtn } from '../components/btn&tab&bar/LineShadowBtn';

function Home() {
  const [recommendUsers, setRecommendUsers] = useState([]);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [logoutCheck, setLogoutCheck] = useState(false);
  const [kakaoCheck, setKakaoCheck] = useState(false);
  const userObject = useContext(AuthContext);

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_ROOT}/googleauth/logout`, '_self');
  };

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
        <div>
          <BgGraWrapperA>
            <div className=" z-50 relative">
              <div className="absolute left-[50%] translate-x-[-50%] z-50 justify-center ">
                <img src="/assets/croXple.png" className="h-6" alt="" />
              </div>
              <i
                onClick={handleShowMenu}
                className="flex justify-end text-[#555555] text-2xl mr-4 cursor-pointer"
              >
                {!showMenu ? <FiMenu /> : <AiOutlineClose />}
              </i>
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
                    <div className="w-[5.375rem] h-[5.375rem] object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286]">
                      <img
                        src={userObject.profilePicture[0]}
                        alt=""
                        className="w-[5.25rem] h-[5.25rem] object-cover rounded-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                      />
                    </div>
                  </Link>

                  <div className="absolute z-50 left-[50%] top-[35%]">
                    {recommendUsers[0]?.followings.includes(userObject._id) && (
                      <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
                        <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(recommendUsers[0])}
                      className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-[1px] rounded-full"
                    >
                      <img
                        src={recommendUsers[0]?.profilePicture[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                  </div>

                  <div className="absolute z-50 left-[65%] top-[53%]">
                    {recommendUsers[1]?.followings.includes(userObject._id) && (
                      <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
                        <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(recommendUsers[1])}
                      className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-[1px] rounded-full"
                    >
                      <img
                        src={recommendUsers[1]?.profilePicture[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                  </div>

                  <div className="absolute z-50 left-[20%] top-[52%]">
                    {recommendUsers[2]?.followings.includes(userObject._id) && (
                      <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
                        <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(recommendUsers[2])}
                      className="w-[4.375rem] h-[4.375rem] border-[#A5A5A5] border-[1px] rounded-full"
                    >
                      <img
                        src={recommendUsers[2]?.profilePicture[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                  </div>

                  <div className="absolute z-50 left-[37%] top-[64%]">
                    {recommendUsers[3]?.followings.includes(userObject._id) && (
                      <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
                        <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(recommendUsers[3])}
                      className="w-[3.75rem] h-[3.75rem] border-[#A5A5A5] border-[1px] rounded-full"
                    >
                      <img
                        src={recommendUsers[3]?.profilePicture[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                  </div>

                  <div className="absolute z-50 left-[75%] top-[35%]">
                    {recommendUsers[4]?.followings.includes(userObject._id) && (
                      <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
                        <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(recommendUsers[4])}
                      className="w-[3.75rem] h-[3.75rem] border-[#A5A5A5] border-[1px] rounded-full"
                    >
                      <img
                        src={recommendUsers[4]?.profilePicture[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                  </div>

                  <div className="absolute z-50 left-[18%] top-[29%]">
                    {recommendUsers[5]?.followings.includes(userObject._id) && (
                      <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
                        <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(recommendUsers[5])}
                      className="w-[3.75rem] h-[3.75rem] border-[#A5A5A5] border-[1px] rounded-full"
                    >
                      <img
                        src={recommendUsers[5]?.profilePicture[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                  </div>

                  <div className="absolute z-50 left-[45%] top-[15%]">
                    {recommendUsers[6]?.followings.includes(userObject._id) && (
                      <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
                        <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(recommendUsers[6])}
                      className="w-[3.125rem] h-[3.125rem] border-[#A5A5A5] border-[1px] rounded-full"
                    >
                      <img
                        src={recommendUsers[6]?.profilePicture[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                  </div>

                  <div className="absolute z-50 left-[15%] top-[76%]">
                    {recommendUsers[7]?.followings.includes(userObject._id) && (
                      <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
                        <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(recommendUsers[7])}
                      className="w-[3.125rem] h-[3.125rem] border-[#A5A5A5] border-[1px] rounded-full"
                    >
                      <img
                        src={recommendUsers[7]?.profilePicture[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                  </div>

                  <div className="absolute z-50 left-[74%] top-[74%]">
                    {recommendUsers[8]?.followings.includes(userObject._id) && (
                      <span className="absolute left-[55%] top-[-35%] w-[3.25rem] ">
                        <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(recommendUsers[8])}
                      className="w-[3.125rem] h-[3.125rem] border-[#A5A5A5] border-[1px] rounded-full"
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
          {showMenu ? (
            <div className="bg-white h-screen w-full absolute top-0 left-[50%] translate-x-[-50%] pt-20 max-w-md">
              <div className="border-t-8 border-[#F5F5F5] px-4 ">
                <div className="border-b-[1px] py-6 w-full">
                  <div className="flex items-center space-x-3">
                    <PicGraBorder>
                      <PicGraBg>
                        <img
                          className="w-full h-full object-cover rounded-full"
                          src={userObject.profilePicture[0]}
                          alt=""
                        />
                      </PicGraBg>
                    </PicGraBorder>
                    <div>
                      <h5>{userObject.nickName}</h5>
                      <div className="flex space-x-1">
                        <h4 className="text-[#A5A5A5] text-xs ">서울</h4>
                        {userObject.locations.map((location) => {
                          return (
                            <h4
                              key={location}
                              className="text-[#A5A5A5] text-xs "
                            >
                              {location}
                            </h4>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h6 className="text-[#A5A5A5] text-sm">고객센터</h6>
                  <div className="flex space-x-2 cursor-pointer items-center">
                    <h4
                      onClick={() => {
                        setKakaoCheck(true);
                      }}
                      className="text-xl"
                    >
                      1:1 문의
                    </h4>
                    <img
                      src="/assets/BTN/Btn_Kakao.png"
                      alt=""
                      className="w-6 h-6"
                    />
                  </div>
                  <h4
                    onClick={() => {
                      setLogoutCheck(true);
                    }}
                    className="text-xl cursor-pointer"
                  >
                    로그아웃
                  </h4>
                  {kakaoCheck && (
                    <div className="bg-black bg-opacity-20 w-screen h-screen absolute left-0 top-0 z-50 max-w-md  ">
                      <div className="absolute max-w-[21.5rem] w-full top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[2.5rem] p-4">
                        <MainQuestion>1:1 문의로 연결 하시겠어요?</MainQuestion>
                        <SubInstruction>
                          카카오톡 채널로 연결됩니다
                        </SubInstruction>

                        <div className="w-full h-full flex justify-center space-x-2 pt-8">
                          <button
                            onClick={() => {
                              setKakaoCheck(false);
                            }}
                            className="bg-[#DFDFDF] w-28 h-12 rounded-xl"
                          >
                            취소
                          </button>

                          <a
                            href="https://open.kakao.com/me/crople79"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#F79D00] text-white w-28 h-12 rounded-xl flex justify-center items-center"
                          >
                            연결
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  {logoutCheck && (
                    <div className="bg-black bg-opacity-20 w-screen h-screen absolute left-0 top-0 z-50 max-w-md ">
                      <div className="absolute max-w-[21.5rem] w-full top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[2.5rem] p-4">
                        <MainQuestion>로그아웃 하시겠어요?</MainQuestion>
                        <SubInstruction>
                          로그아웃 시 초기화면으로 이동합니다
                        </SubInstruction>

                        <div className="w-full h-full flex justify-center space-x-2 pt-8">
                          <button
                            onClick={() => {
                              setLogoutCheck(false);
                            }}
                            className="bg-[#DFDFDF] w-28 h-12 rounded-xl"
                          >
                            취소
                          </button>

                          <button
                            onClick={logout}
                            className="bg-[#F79D00] text-white w-28 h-12 rounded-xl"
                          >
                            로그아웃
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleShowMenu}
                className="fixed bottom-0 left-[50%] translate-x-[-50%]  w-full pb-8 px-4 max-w-sm mx-auto justify-center"
              >
                <LineShadowBtn text={'돌아가기'} className=" cursor-pointer" />
              </button>
            </div>
          ) : null}
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

const BgGraWrapperA = tw(BgGraWrapper)`
w-full h-screen flex flex-col mx-auto max-w-md pt-11`;

const PicGraBorder = tw.div`rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const PicGraBg = tw.div` w-12 h-12 rounded-full border-[2px] border-transparent [background-clip: padding-box] flex justify-center items-center`;

const MainQuestion = tw.h3`
flex justify-center text-[#242424] font-semibold text-xl`;

const SubInstruction = tw.h6`flex justify-center text-[#555555] mt-2 font-medium text-sm `;
