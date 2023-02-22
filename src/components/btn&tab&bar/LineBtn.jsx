import React from 'react';
import tw from 'twin.macro';

export const LineBtn = ({ text }) => {
  return (
    <NextBtnGraBorder>
      <NextBtnGraBg>
        <NextBtnGraText>{text}</NextBtnGraText>
      </NextBtnGraBg>
    </NextBtnGraBorder>
  );
};

const NextBtnGraBorder = tw.div`w-full h-[5.25rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const NextBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex justify-center items-center`;
const NextBtnGraText = tw.div`text-xl font-bold bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;
