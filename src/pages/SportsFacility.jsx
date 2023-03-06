import React from 'react';
import { useParams } from 'react-router-dom';
import { sportsFacility } from '../data/playGroundData';

export const SportsFacility = () => {
  const { id } = useParams();

  // Find the facility with the matching ID
  const facility = sportsFacility.find((f) => f.id === parseInt(id));

  if (!facility) {
    return <div>Facility not found</div>;
  }

  return (
    <div>
      <h2>{facility.name}</h2>
      <p>{facility.desc}</p>
      <img src={facility.mainImage} alt={facility.name} />
      <h3>Facility Information</h3>
      <p>Location: {facility.locationTag}</p>
      <p>Address: {facility.address}</p>
      <p>Price: {facility.price}</p>
      <p>Sub Facilities: {facility.subFacility}</p>
      <h3>Images</h3>
      <div>
        {facility.image.map((img, index) => (
          <img key={index} src={img} alt="" />
        ))}
      </div>
    </div>
  );
};
