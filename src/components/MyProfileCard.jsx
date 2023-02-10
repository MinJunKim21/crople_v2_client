import styled from 'styled-components';

// import Topbar from '../components/Topbar';
// import Sidebar from '../components/Sidebar';
// import Rightbar from '../components/Rightbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
// import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Infoedit from '../components/Infoedit';

import { BsChevronLeft } from 'react-icons/bs';
import { LineBtn } from './LineBtn';

export const MyProfileCard = () => {
  const userObject = useContext(AuthContext);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState('');
  const _id = useParams()._id;
  const [followed, setFollowed] = useState(
    userObject.followings.includes(user?._id)
  );
  console.log(followed);
  const [openInfoEdit, setOpenInfoEdit] = useState(false);
  // const [profileChange, setProfileChange] = useState(false);
  // console.log(nickName, 'nickName');
  // console.log(user, 'user');
  // console.log(useParams(), 'useParams()');
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

  // const handleClick = async () => {
  //   try {
  //     if (followed) {
  //       await axios.put(
  //         `${process.env.REACT_APP_API_ROOT}/api/users/` +
  //           user._id +
  //           '/unfollow',
  //         {
  //           userId: userObject._id,
  //         }
  //       );
  //     } else {
  //       await axios.put(
  //         `${process.env.REACT_APP_API_ROOT}/api/users/` + user._id + '/follow',
  //         {
  //           userId: userObject._id,
  //         }
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setFollowed(!followed);
  //   window.location.reload(); // 원인 알게되면 이거 바꾸기...
  // };
  return (
    <div>
      <BgWrapper>
        {/* <Sidebar /> */}
        <div>
          <div className="min-w-screen min-h-screen relative ">
            <div className="flex items-center px-4 pt-11">
              <Link to="/">
                <BsChevronLeft className="text-2xl h-11 " />
              </Link>
            </div>

            <div className="bg-white w-full  backdrop-blur-[2px]	rounded-t-3xl opacity-95 absolute left-0 bottom-0">
              <div className="flex py-4 text-lg text-[#A5A5A5] text-center w-full">
                <h3 className="w-full">내 프로필</h3>
              </div>
              <div className="flex w-full h-[2px]bg-gradient-to-r from-[#F79D00] via-[#CABE40] to-[#9AE286] border" />
              <div className="w-[10.5rem] h-[10.5rem] bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] rounded-full  justify-center mx-auto mt-6 mb-14">
                <div className="justify-center flex items-center h-full w-full">
                  <img
                    src={userObject.profilePicture[0]}
                    className="object-cover w-full h-full p-0.5 rounded-full"
                    alt=""
                  />
                </div>
              </div>

              <div className="px-4 flex w-full">
                <div className="flex flex-col w-full">
                  <div>
                    <h4 className="text-[#8B8B8B] text-2xl">{user.nickName}</h4>
                  </div>
                  <div>
                    <h4 className="text-[#A5A5A5] ">{user.locations}</h4>
                  </div>
                </div>

                <div className="flex w-full">
                  <h4 className="border-2 border-[#C1C1C1] w-20 h-[1.875rem] text-center items-center rounded-full text-[#C1C1C1]">
                    {user.likeSports}
                  </h4>
                </div>
              </div>
              <div className="border-2 border-[#DFDFDF] w-full border-t mt-[3.75rem]"></div>
              <div className=" px-6 mt-4">
                <div className="w-full h-40 text-[#6F6F6F] mb-40">
                  <span>{user.desc}</span>
                </div>
              </div>
              <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
                <button
                  onClick={() => {
                    setOpenInfoEdit(true);
                  }}
                  className="w-full"
                >
                  <LineBtn text={'수정하기'} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {openInfoEdit === true && <Infoedit />}
        {/* {user.nickName === userObject.nickName && (
        <button onClick={() => setProfileChange(true)}>수정하기</button>
      )}
      <div>{profileChange && <Infoedit />}</div>
      <div>
        {nickName === userObject.nickName && <Rightbar user={user} />}
      </div>
      <div>
        {user.username !== userObject.username && (
          <button onClick={handleClick}>
            {followed === true ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div> */}
        {/* <Rightbar user={user} /> */}
      </BgWrapper>
    </div>
  );
};

const BgWrapper = styled.div`
  background: linear-gradient(
    166.9deg,
    rgba(247, 157, 0, 0.05) -17.3%,
    rgba(202, 190, 64, 0.28) 36.08%,
    #a8d69b 89.46%
  );
  width: screen;
  hight: screen;
`;
