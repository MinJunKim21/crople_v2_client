import tw from 'twin.macro';
import styled from 'styled-components';
import { TutorialProfileEdit } from './TutorialProfileEdit';

export const TutorialSplash = ({ file }) => {
  return (
    <div>
      <TutorialProfileEdit file={file} />
    </div>
  );
};

const BgGraWrapper = styled.div`
  background: linear-gradient(
    341.82deg,
    #a8d69b 10.29%,
    rgba(202, 190, 64, 0.28) 47.5%,
    rgba(247, 157, 0, 0) 84.7%
  );
`;

const BgGraWrapperA = tw(BgGraWrapper)`
w-full h-screen  flex flex-col mx-auto max-w-md`;

const WhiteNote = styled.div`
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.16))
    drop-shadow(4px 8px 28px rgba(0, 0, 0, 0.08));
`;

const WhiteNoteA = tw(WhiteNote)`
absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] text-xs text-center bg-white py-3 px-3 rounded-full text-[#555555]`;
