import React from 'react';
import { playGroundBanner } from '../data/playGroundData';
import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export const PlayGround = () => {
  return (
    <div className="max-w-md mx-auto">
      <Swiper
        style={{
          '--swiper-pagination-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-opacity': '0.5',
          '--swiper-pagination-bullet-size': '6px',
          '--swiper-pagination-bullet-horizontal-gap': '6px',
        }}
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
      >
        <SwiperSlide>
          <img
            src={playGroundBanner[0].image}
            className="h-[300px] object-cover w-full"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={playGroundBanner[1].image}
            className="h-[300px] object-cover w-full"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={playGroundBanner[2].image}
            className="h-[300px] object-cover w-full"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={playGroundBanner[3].image}
            className="h-[300px] object-cover w-full"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={playGroundBanner[4].image}
            className="h-[300px] object-cover w-full"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
