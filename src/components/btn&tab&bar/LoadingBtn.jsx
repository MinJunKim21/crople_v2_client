import React from 'react';
import tw from 'twin.macro';
export const LoadingBtn = ({ text }) => {
  return (
    <NextBtnGrayBg>
      <NextBtnGrayText>{text}</NextBtnGrayText>
    </NextBtnGrayBg>
  );
};
const NextBtnGrayBg = tw.div`w-full h-[5.25rem]  rounded-full bg-[#F5F5F5]   text-center flex justify-center items-center`;
const NextBtnGrayText = tw.div`text-xl font-bold text-[#C1C1C1]`;
