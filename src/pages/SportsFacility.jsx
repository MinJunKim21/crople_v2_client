import React from 'react';
import { useParams } from 'react-router-dom';
import { sportsFacility } from '../data/playGroundData';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import tw from 'twin.macro';
import { RiMapPin2Fill } from 'react-icons/ri';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { FaTag } from 'react-icons/fa';
import { PlayGroundBar } from '../components/btn&tab&bar/PlayGroundBar';

export const SportsFacility = () => {
  const { id } = useParams();

  // Find the facility with the matching ID
  const facility = sportsFacility.find((f) => f.id === parseInt(id));

  if (!facility) {
    return <div>Facility not found</div>;
  }

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
        {facility.image.map((img, index) => (
          <SwiperSlide key={index}>
            <div>
              <img
                key={index}
                src={img}
                alt=""
                className="h-[300px] object-cover w-full"
              />
              <img
                src="/assets/pattern/BlackDownGra.png"
                className="absolute bottom-0 w-full object-contain flex"
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="px-6">
        <div className="flex space-x-2 py-3">
          <TagGraBorder>
            <TagGraBg>
              <TagGraText>{facility.sportsTag}</TagGraText>
            </TagGraBg>
          </TagGraBorder>
          <TagGraBorder>
            <TagGraBg>
              <TagGraText>{facility.locationTag}</TagGraText>
            </TagGraBg>
          </TagGraBorder>
        </div>
        <h1 className="text-[1.75rem] font-bold">{facility.name}</h1>
        <p className="text-lg text-[#8B8B8B] pb-6">{facility.desc}</p>
      </div>
      <div className="border-b-4 border-[#F5F5F5]"></div>
      <div className="px-6 pt-6 space-y-6">
        <div className="flex items-center space-x-4">
          <RiMapPin2Fill className="text-[#DFDFDF] text-lg" />
          <p className="text-[#3D3D3D] text-lg">{facility.address}</p>
        </div>
        <div className="flex items-center space-x-4">
          <BsFillCreditCardFill className="text-[#DFDFDF] text-lg" />
          <p className="text-[#3D3D3D] text-lg">{facility.price}</p>
        </div>
        <div className="flex items-center space-x-4 pb-[20rem]">
          <FaTag className="text-[#DFDFDF] text-lg" />
          <p className="text-[#3D3D3D] text-lg">{facility.subFacility}</p>
        </div>
      </div>
      <div className="fixed bottom-0 left-[50%] w-full pb-8 px-4 max-w-sm mx-auto justify-center translate-x-[-50%]">
        <PlayGroundBar />
      </div>
    </div>
  );
};

const TagGraBorder = tw.div`flex rounded-full bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] `;
const TagGraBg = tw.div`px-2 py-1 rounded-full bg-white  border-[1px] border-transparent [background-clip: padding-box]  text-center flex justify-center items-center`;
const TagGraText = tw.div`text-xs bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent`;
