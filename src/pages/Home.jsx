import styled from 'styled-components';
// import Topbar from '../components/Topbar';
// import Sidebar from '../components/Sidebar';
// import Rightbar from '../components/Rightbar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import NeedProfile from '../components/NeedProfile';
import TabBar from '../components/TabBar';

function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [recommendUsers, setRecommendUsers] = useState([]);
  // const [nickName, setNickName] = useState(undefined);
  const userObject = useContext(AuthContext);
  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users/all`
      );
      setAllUsers(res.data);
      // console.log(allUsers);
    };
    fetchAll();
  }, []);
  useEffect(() => {
    const fetchRecommend = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/users/recommend`
      );
      setRecommendUsers(res.data);
      // console.log(allUsers);
    };
    fetchRecommend();
  }, []);

  return (
    <div>
      {userObject.nickName === undefined || userObject.profilePicture === '' ? (
        <div>
          <NeedProfile />
        </div>
      ) : (
        <div className="relative">
          <img
            src="assets/pattern/Circular.png"
            alt=""
            className="object-cover absolute left-0 top-0 mt-24"
          />
          <BgWrapper>
            {/* <Topbar /> */}
            <div className="flex flex-col h-screen relative">
              <h3 className="text-center mt-11 text-[#8B8B8B] ">
                프로필카드로 메이트를 알아보아요
              </h3>
              <Link to={`/profile/${userObject._id}`} key={userObject._id}>
                <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] border-red-400 border-2 w-[5.375rem] h-[5.375rem] rounded-full ">
                  <div className="flex text-center items-center w-full h-full">
                    <img
                      src={userObject.profilePicture[0]}
                      className="object-cover w-full h-full rounded-full"
                      alt=""
                    />
                  </div>
                </div>
              </Link>

              <div className="bg-blue-200">
                {allUsers.map((user) => (
                  <Link to={`/profile/${user._id}`} key={user._id}>
                    <div>{user.nickName || user.email}</div>
                  </Link>
                ))}
              </div>
              <div>-----------------------------------</div>
              <div className="bg-blue-200">
                {recommendUsers.map((user) => (
                  <Link to={`/profile/${user._id}`} key={user._id}>
                    <div>{user.nickName || user.email}</div>
                  </Link>
                ))}
              </div>
            </div>
          </BgWrapper>
        </div>
      )}
      <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
        <TabBar reload="true" />
      </div>
    </div>
  );
}

export default Home;

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
