import React from 'react';
import { useParams } from 'react-router-dom';
import { sportsFacility } from '../data/playGroundData';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

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
      <h2>{facility.name}</h2>
      <p>{facility.desc}</p>
      <img src={facility.mainImage} alt={facility.name} />
      <h3>Facility Information</h3>
      <p>Location: {facility.locationTag}</p>
      <p>Address: {facility.address}</p>
      <p>Price: {facility.price}</p>
      <p>Sub Facilities: {facility.subFacility}</p>
      <h3>Images</h3>
    </div>
  );
};
