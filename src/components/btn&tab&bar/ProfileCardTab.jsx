import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export const ProfileCardTab = ({
  reload,
  handleClick,
  user,
  onClose,
  followed,
  setFollowed,
}) => {
  return (
    <BgWhiteShadow>
      <BgWhiteBlur>
        <div className="flex max-w-sm p-2  justify-between space-x-8">
          <NextBtnGraBorder>
            <NextBtnGraBg>
              <img
                src="assets/BTN/Btn_PlayGround.png"
                className="h-8 w-8 mb-[2px]"
                alt=""
              />
              <NextBtnGraText>운동장</NextBtnGraText>
            </NextBtnGraBg>
          </NextBtnGraBorder>
          <Link to="/">
            <div className="h-[4.25rem]  text-center justify-center items-center flex flex-col">
              <i onClick={onClose}>
                <img
                  src="assets/BTN/Btn_Home.png"
                  className="h-9 w-8 "
                  alt=""
                />
              </i>
              <NextBtnGraText>홈</NextBtnGraText>
            </div>
          </Link>
          <div>
            {followed ? (
              <div>
                <NextBtnGraBorder>
                  <div className="flex flex-col justify-center items-center w-full h-full">
                    <img
                      src="assets/BTN/Btn_MatchLiked.png"
                      className="h-8 w-8 mb-[2px]"
                      alt=""
                    />
                    <div className="text-white text-sm font-semibold">
                      신청완료
                    </div>
                  </div>
                </NextBtnGraBorder>
              </div>
            ) : (
              <button onClick={handleClick}>
                <NextBtnGraBorder>
                  <NextBtnGraBg>
                    <img
                      src="assets/BTN/Btn_MatchLike.png"
                      className="h-8 w-8 mb-[2px]"
                      alt=""
                    />
                    <NextBtnGraText>매칭신청</NextBtnGraText>
                  </NextBtnGraBg>
                </NextBtnGraBorder>
              </button>
            )}
          </div>
        </div>
      </BgWhiteBlur>
    </BgWhiteShadow>
  );
};

const NextBtnGraBorder = tw.div`w-[5.75rem] h-[4.25rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const NextBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex flex-col justify-center items-center`;
const NextBtnGraText = tw.div`text-sm font-semibold bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;
const BgWhiteShadow = tw.div`shadow-2xl rounded-full drop-shadow-xl border-[1px] border-[#9AE286] relative	`;

const BgWhiteBlur = styled.div`
  background: rgba(255, 255, 255, 0.3);

  box-shadow: inset 0px -4.43439px 17.7376px rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);

  border-radius: 48px;
`;
