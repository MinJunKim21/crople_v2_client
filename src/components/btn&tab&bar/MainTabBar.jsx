import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

function MainTabBar({ reload }) {
  return (
    <BgWhiteShadow>
      <BgWhiteBlur className="flex max-w-sm p-2 justify-between space-x-8">
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
      </BgWhiteBlur>
    </BgWhiteShadow>
  );
}

export default MainTabBar;

const NextBtnGraBorder = tw.div`w-[5.75rem] h-[4.25rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const NextBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex flex-col justify-center items-center`;
const NextBtnGraText = tw.div`text-sm font-bold bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;
const BgWhiteShadow = tw.div`shadow-2xl rounded-full drop-shadow-xl border-[1px] border-[#9AE286]	`;

const BgWhiteBlur = styled.div`
  background: rgba(255, 255, 255, 0.3);

  box-shadow: inset 0px -4.43439px 17.7376px rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(7.39065px);

  border-radius: 48px;
`;
