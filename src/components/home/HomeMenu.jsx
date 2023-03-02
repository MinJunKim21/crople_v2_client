import tw from 'twin.macro';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { KakaoCheck } from './KakaoCheck';
import { LogoutCheck } from './LogoutCheck';
import { LineShadowBtn } from '../../components/btn&tab&bar/LineShadowBtn';

const HomeMenu = ({
  showMenu,
  setKakaoCheck,
  setLogoutCheck,
  handleShowMenu,
  kakaoCheck,
  logoutCheck,
}) => {
  const userObject = useContext(AuthContext);

  return (
    <>
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
                        <h4 key={location} className="text-[#A5A5A5] text-xs ">
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
                <h4 onClick={() => setKakaoCheck(true)} className="text-xl">
                  1:1 문의
                </h4>
                <img
                  src="/assets/BTN/Btn_Kakao.png"
                  alt=""
                  className="w-6 h-6"
                />
              </div>
              <h4
                onClick={() => setLogoutCheck(true)}
                className="text-xl cursor-pointer"
              >
                로그아웃
              </h4>
              {kakaoCheck && <KakaoCheck setKakaoCheck={setKakaoCheck} />}
              {logoutCheck && <LogoutCheck setLogoutCheck={setLogoutCheck} />}
            </div>
          </div>
          <button
            onClick={handleShowMenu}
            className="fixed bottom-0 left-[50%] translate-x-[-50%]  w-full pb-8 px-4 max-w-sm mx-auto justify-center cursor-pointer"
          >
            <LineShadowBtn text={'돌아가기'} />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default HomeMenu;

const PicGraBorder = tw.div`rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const PicGraBg = tw.div` w-12 h-12 rounded-full border-[2px] border-transparent [background-clip: padding-box] flex justify-center items-center`;
