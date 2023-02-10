import tw from 'twin.macro';
import styled from 'styled-components';

// import Topbar from '../components/Topbar';
// import Sidebar from '../components/Sidebar';
// import Rightbar from '../components/Rightbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
// import { useRef } from 'react';
import { useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';

import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineRight } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { LineBtn } from '../components/LineBtn';

export const ProfileEdit = () => {
  const userObject = useContext(AuthContext);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState('');
  const _id = useParams()._id;
  const [followed, setFollowed] = useState(
    userObject.followings.includes(user?._id)
  );
  console.log(followed);
  const selfIntroduction = useRef();
  const [descDB, setDescDB] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users?userId=` + _id
      );
      setUser(res.data);
    };
    fetchUser();
    setFollowed(userObject.followings.includes(user?._id));
  }, [_id, user?._id, userObject.followings]);

  const byteCounter = (s, b, i, c) => {
    for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 2 : c >> 7 ? 2 : 1);
    return b;
  };

  const updateData = async (e) => {
    // const updatedUser = {
    //   nickName: nickNameDB,
    //   likeSports: sportsCheckedList,
    //   locations: locationsCheckedList,
    //   userId: user._id,
    //   desc: descDB,
    //   profilePicture: profilePictureDB,
    // };
    // e.preventDefault();
    // console.log(profilePictureDB, 'expecting url');
    // try {
    //   setQuestion('five');
    //   await axios.put(
    //     `${process.env.REACT_APP_API_ROOT}/api/users/${user._id}`,
    //     updatedUser
    //   );
    //   await setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // } catch (err) {
    //   console.log(err);
    //   setProfilePictureDB([]);
    // }
  };

  return (
    <form onSubmit={updateData}>
      <div>
        <BgGraWrapperA>
          <div>
            <button className="px-4 pb-2">
              <Link to={`/profile/${userObject._id}`}>
                <BsChevronLeft />
              </Link>
            </button>
          </div>
          <div className="h-full">
            <CardWhiteBg className="bg-white w-full h-full backdrop-blur-[2px]	 opacity-95 flex-col">
              <div className="flex py-4 w-full">
                <h4 className="w-full text-center text-[#8B8B8B]">
                  프로필 수정
                </h4>
              </div>
              <div className="px-4">
                <hr className="w-full bg-gradient-to-r to-[#F79D00] via-[#CABE40] from-[#9AE286] h-[2px] px-4" />
              </div>
              <div className="w-[9.5rem] h-[9.5rem] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286] p-[2px] rounded-full justify-center mx-auto mt-6 ">
                <div className="justify-center flex items-center h-full w-full">
                  <img
                    src={userObject.profilePicture[0]}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="mt-4 mb-[1.125rem] w-full flex justify-center ">
                <div className="bg-[#C1C1C1] w-1.5 h-1.5 rounded-full" />
              </div>

              <div className="px-6 flex flex-col  w-full">
                <div className="flex w-full items-center justify-between mb-8 ">
                  <div>
                    <h4 className="text-[#8B8B8B] text-2xl">
                      {userObject.nickName}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg text-[#DFDFDF]">
                      <HiLocationMarker />
                    </span>
                    {userObject.locations.map((location) => {
                      return (
                        <h4 key={location} className="text-[#A5A5A5] text-lg ">
                          {location}
                        </h4>
                      );
                    })}
                    <span className="text-2xl text-[#DFDFDF]">
                      <AiOutlineRight />
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap w-[75%] mb-2 ">
                    {userObject.likeSports.map((likeSports) => {
                      return (
                        <h4 className="border px-4 py-2 border-[#A5A5A5] text-center rounded-full text-[#A5A5A5] text-sm mr-2">
                          {likeSports}
                        </h4>
                      );
                    })}
                  </div>
                  <span className="text-2xl mb-2 text-[#DFDFDF]">
                    <AiOutlineRight />
                  </span>
                </div>
              </div>

              <div className="px-4">
                <textarea
                  ref={selfIntroduction}
                  type="text"
                  value={descDB}
                  placeholder={userObject.desc}
                  className="w-full border-2 rounded-lg h-[11.75rem] px-2 py-3"
                  onChange={() => {
                    if (byteCounter(selfIntroduction.current.value) > 240) {
                      selfIntroduction.current.value =
                        selfIntroduction.current.value.slice(0, -1);
                    }
                    setDescDB(selfIntroduction.current.value);
                  }}
                />
                <div className="text-[#A5A5A5] text-xs text-right">
                  {byteCounter(descDB)}/240 byte
                </div>
              </div>
            </CardWhiteBg>
          </div>
        </BgGraWrapperA>
      </div>
      <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
        <button type="submit" className="w-full">
          <LineBtn text={'수정완료'} />
        </button>
      </div>
    </form>
  );
};

const BgGraWrapper = styled.div`
  background: linear-gradient(
    166.9deg,
    rgba(247, 157, 0, 0.05) -17.3%,
    rgba(202, 190, 64, 0.28) 36.08%,
    #a8d69b 89.46%
  );
`;

const BgGraWrapperA = tw(BgGraWrapper)`
w-full h-screen pt-12 max-w-sm flex flex-col `;

const CardWhiteBg = styled.div`
  background: #ffffff;

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16), 4px 8px 28px rgba(0, 0, 0, 0.08);
  border-radius: 2rem 2rem 0px 0px;
`;
