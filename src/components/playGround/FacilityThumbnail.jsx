import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export const FacilityThumbnail = ({ facility }) => {
  return (
    <SportFacilityA bgImage={facility.mainImage}>
      <div className="flex flex-col space-y-2 justify-end p-4">
        <TagBg>
          <TagGraText>{facility.sportsTag}</TagGraText>
        </TagBg>
        <TagBg>
          <TagGraText>{facility.locationTag}</TagGraText>
        </TagBg>
      </div>
    </SportFacilityA>
  );
};

const SportFacility = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
`;

const SportFacilityA = tw(SportFacility)`
flex w-[10.25rem] h-[14rem] rounded-3xl break-inside-avoid`;

const TagGraText = tw.div`bg-gradient-to-t from-[#F79D00] via-[#CABE40] to-[#9AE286] [background-clip: text] text-transparent text-center `;
const TagBg = tw.div`bg-black flex justify-center px-4 py-2 rounded-3xl`;
