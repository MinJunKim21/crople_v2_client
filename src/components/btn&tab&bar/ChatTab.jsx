import React from 'react';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export const ChatTab = ({ reload }) => {
  return (
    <div className="relative">
      <div className="absolute z-[-10] top-0 left-0 backdrop-blur-[8px] shadow-xl border border-[#9AE286] w-full  h-[5.25rem] rounded-full space-x-8"></div>
      <div className="flex max-w-sm p-2  justify-between space-x-8">
        <Link to="/playground">
          <NextBtnGraBorder>
            <NextBtnGraBg>
              <img
                src="assets/BTN/Btn_PlayGround.png"
                className="h-8 mb-[2px]"
                alt=""
              />
              <NextBtnGraText>운동장</NextBtnGraText>
            </NextBtnGraBg>
          </NextBtnGraBorder>
        </Link>

        <Link to="/">
          <div className="h-[4.25rem] text-center justify-center items-center flex flex-col">
            <i
              onClick={
                reload === 'true'
                  ? () => {
                      window.location.reload();
                    }
                  : null
              }
            >
              <img src="assets/BTN/Btn_Home.png" className="h-9 " alt="" />
            </i>
            <NextBtnGraText>홈</NextBtnGraText>
          </div>
        </Link>
        <Link to="/messenger">
          <NextBtnGraBorder>
            <NextBtnGraBg>
              <img
                src="assets/BTN/Btn_Chat.png"
                className="h-8 w-8 mb-[2px]"
                alt=""
              />
              <NextBtnGraText>채팅</NextBtnGraText>
            </NextBtnGraBg>
          </NextBtnGraBorder>
        </Link>
      </div>
    </div>
  );
};

const NextBtnGraBorder = tw.div`w-[5.75rem] h-[4.25rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const NextBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex flex-col justify-center items-center`;
const NextBtnGraText = tw.div`text-sm font-bold bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;
// const BgWhiteShadow = tw.div`shadow-2xl rounded-full drop-shadow-xl border-[1px] border-[#9AE286] relative	`;

// const BgWhiteBlur = styled.div`
//   background: rgba(255, 255, 255, 0.3);

//   box-shadow: inset 0px -4.43439px 17.7376px rgba(255, 255, 255, 0.15);
//   backdrop-filter: blur(8px);

//   border-radius: 48px;
// `;
