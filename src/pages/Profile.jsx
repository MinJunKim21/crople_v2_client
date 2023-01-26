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
// import Infoedit from '../components/Infoedit';

import { BsChevronLeft } from 'react-icons/bs';

export default function Profile() {
  const userObject = useContext(AuthContext);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState('');
  const nickName = useParams().nickName;
  const [followed, setFollowed] = useState(
    userObject.followings.includes(user?._id)
  );
  console.log(followed);
  // const [profileChange, setProfileChange] = useState(false);
  // console.log(nickName, 'nickName');
  // console.log(user, 'user');
  // console.log(useParams(), 'useParams()');
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users?nickName=` + nickName
      );
      setUser(res.data);
    };
    fetchUser();
    setFollowed(userObject.followings.includes(user?._id));
  }, [user?._id, userObject.followings, nickName]);

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
      {/* <Topbar /> */}
      <BgWrapper>
        {/* <Sidebar /> */}
        <div>
          <div className="min-w-screen min-h-screen relative">
            <div className="flex items-center px-4 pt-11">
              <Link to="/">
                <BsChevronLeft className="text-2xl h-11 " />
              </Link>
            </div>

            {/* <div>
              <img
                src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${userObject.profilePicture}`}
                alt=""
                className="w-6"
              />
            </div> */}
            <div className="bg-white w-full backdrop-blur-[2px]	rounded-t-3xl opacity-95 absolute left-0 bottom-0">
              <div className="flex py-4 text-center w-full">
                <h3 className="w-full">프로필수정</h3>
                <h3 className="w-full">미리보기</h3>
              </div>
              <div className="w-[10.5rem] h-[10.5rem] border-red-500 rounded-full border-2 justify-center mx-auto mt-6 mb-14">
                <div className="justify-center flex items-center h-full w-full">
                  프사위치
                </div>
              </div>

              <div className="mx-4">
                <div>
                  <h4 className="text-[#8B8B8B] text-2xl">{user.nickName}</h4>
                </div>
                <div>
                  <span>desc : </span>
                  <span>{user.desc}</span>
                </div>

                <div>
                  <span>likeSports : </span>
                  <span>{user.likeSports}</span>
                </div>
                <div>
                  <span>locations : </span>
                  <span>{user.locations}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
}

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
