import React from 'react';
import tw from 'twin.macro';
import { playGroundBanner, sportsFacility } from '../data/playGroundData';
import { Pagination } from 'swiper';
import { shuffle } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BannerEach } from '../components/playGround/BannerEach';
import 'swiper/css';
import 'swiper/css/pagination';
import { FacilityThumbnail } from '../components/playGround/FacilityThumbnail';
import { Link } from 'react-router-dom';
import { ReqCheck } from '../components/playGround/ReqCheck';
import { PlayGroundBar } from '../components/btn&tab&bar/PlayGroundBar';
import { useState, useEffect } from 'react';

export const PlayGround = () => {
  const [reqCheck, setReqCheck] = useState(false);
  const [shuffledData, setShuffledData] = useState([]);
  const [shuffledFacilities, setShuffledFacilities] = useState([]);

  useEffect(() => {
    const shuffledBanner = shuffle(playGroundBanner);
    setShuffledData(shuffledBanner);
    const shuffledFacility = shuffle(sportsFacility);
    setShuffledFacilities(shuffledFacility);
  }, []);

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
        {shuffledData.map((banner, index) => (
          <SwiperSlide key={index}>
            <BannerEach banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-4 columns-2 justify-center pt-4">
        <div className="flex flex-col gap-4">
          {shuffledFacilities.slice(0, 10).map((facility, index) => (
            <Link key={index} to={`/sportsfacility/${facility.id}`}>
              <FacilityThumbnail facility={facility} />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div
            onClick={() => {
              setReqCheck(true);
            }}
            className="cursor-pointer"
          >
            <ReqBtnGraBorder>
              <ReqBtnGraBg>
                <ReqBtnGraText>여기도 궁금해요!</ReqBtnGraText>
              </ReqBtnGraBg>
            </ReqBtnGraBorder>
          </div>
          {reqCheck && <ReqCheck setReqCheck={setReqCheck} />}

          {shuffledFacilities.slice(10).map((facility, index) => (
            <Link key={index} to={`/sportsfacility/${facility.id}`}>
              <FacilityThumbnail facility={facility} />
            </Link>
          ))}
        </div>
      </div>

      <div className="text-[#8B8B8B] text-center border-t-[1px] border-[#DDD9D9] mx-4 mt-4 py-4">
        운동장의 지속적인 업데이트를 기대해주세요!
      </div>
      <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
        <PlayGroundBar />
      </div>
    </div>
  );
};

const ReqBtnGraBorder = tw.div`w-[10.25rem] h-[3.75rem] rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const ReqBtnGraBg = tw.div`w-full h-full rounded-full bg-white  border-2 border-transparent [background-clip: padding-box]  text-center flex justify-center items-center`;
const ReqBtnGraText = tw.div`bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;
