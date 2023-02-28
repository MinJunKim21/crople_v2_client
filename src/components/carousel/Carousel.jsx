import React from 'react';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';
import tw from 'twin.macro';
import styled from 'styled-components';

export const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'ease',
  };
  return (
    <CircleImageShadowA className="w-[9.5rem] h-[9.5rem] justify-center mx-auto mb-14  ">
      <Slider {...settings}>
        {images.map((s, index) => {
          return (
            <div
              key={index}
              className="w-[9.5rem] h-[9.5rem] bg-gradient-to-b to-[#F79D00] via-[#CABE40] from-[#9AE286] p-[2px] justify-center mx-auto mt-6 rounded-full 	"
            >
              <div className="justify-center flex items-center h-full w-full ">
                <img
                  src={s}
                  alt=""
                  className="w-full h-full object-cover rounded-full "
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </CircleImageShadowA>
  );
};

const CircleImageShadow = styled.div`
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.16))
    drop-shadow(4px 8px 28px rgba(0, 0, 0, 0.08));
`;

const CircleImageShadowA = tw(CircleImageShadow)`rounded-full`;
