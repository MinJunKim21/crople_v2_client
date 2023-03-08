import styled from 'styled-components';
import tw from 'twin.macro';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { BsChevronLeft } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import { LineBtn } from '../btn&tab&bar/LineBtn';

export const UsersProfileCard = () => {
  const userObject = useContext(AuthContext);
  const [user, setUser] = useState(userObject);
  const _id = useParams()._id;
  const [followed, setFollowed] = useState(
    userObject.followings.includes(user?._id)
  );

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
    // window.location.reload(); // 원인 알게되면 이거 바꾸기...
  };

  return (
    <div>
      <div>
        <BgGraWrapperA>
          <div>
            <button className="px-4 pb-2">
              <Link to={'/'}>
                <BsChevronLeft />
              </Link>
            </button>
          </div>
          <div className="h-full">
            <CardWhiteBg className="bg-white w-full h-full backdrop-blur-[2px]	 opacity-95 flex-col">
              <div className="flex py-4 w-full">
                <h4 className="w-full text-center text-[#8B8B8B]">프로필</h4>
              </div>
              <div className="px-4">
                <hr className="w-full bg-gradient-to-r to-[#F79D00] via-[#CABE40] from-[#9AE286] h-[2px] px-4" />
              </div>
              <div className="w-[9.5rem] h-[9.5rem] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286] p-[2px] rounded-full justify-center mx-auto mt-6 ">
                <div className="justify-center flex items-center h-full w-full">
                  <img
                    src={user.profilePicture[0]}
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
                    <h4 className="text-[#8B8B8B] text-2xl">{user.nickName}</h4>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg text-[#DFDFDF]">
                      <HiLocationMarker />
                    </span>
                    {user.locations.map((location) => {
                      return (
                        <h4 key={location} className="text-[#A5A5A5] text-lg ">
                          {location}
                        </h4>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-wrap w-[75%]  ">
                  {user.likeSports.map((likeSports, index) => {
                    return (
                      <h4
                        key={index}
                        className="border px-4 py-2 border-[#A5A5A5] text-center rounded-full text-[#A5A5A5] text-sm mb-2 mr-2"
                      >
                        {likeSports}
                      </h4>
                    );
                  })}
                </div>
              </div>

              <div className="border-1 border-[#DFDFDF] w-full border-t mt-4"></div>
              <div className="mt-4">
                <div className="w-full h-40 px-6 text-[#6F6F6F] whitespace-pre-wrap">
                  <span>{user.desc}</span>
                </div>
              </div>
            </CardWhiteBg>
          </div>
        </BgGraWrapperA>
      </div>
      <div>
        <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
          <button className="w-full">
            <LineBtn text={'바'} />
          </button>
          <div>
            {user.username !== userObject.username && (
              <button onClick={handleClick}>
                {followed ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
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
w-full h-screen pt-12 flex flex-col `;

const CardWhiteBg = styled.div`
  background: #ffffff;

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16), 4px 8px 28px rgba(0, 0, 0, 0.08);
  border-radius: 2rem 2rem 0px 0px;
`;
