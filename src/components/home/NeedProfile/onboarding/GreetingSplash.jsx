import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const GreetingSplash = ({ setQuestion }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuestion('one');
    }, 1500);

    return () => clearTimeout(timer);
  }, [setQuestion]);

  return (
    <div className="max-w-md mx-auto bg-white">
      <div className="absolute left-[50%] translate-x-[-50%] z-50 justify-center pt-11">
        <img src="/assets/croXple.png" className="h-6 " alt="" />
      </div>
      <div className="absolute left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] w-full">
        <h4 className="text-[#555555] text-xl text-center relative pb-2">
          나와 운동하자,
          <span className="absolute top-0 translate-y-[-50%] w-14 h-14  ">
            <img src="/assets/BTN/Btn_GotLiked.png" alt="" />
          </span>
        </h4>
        <h2 className="text-[#3D3D3D] font-bold text-2xl text-center">
          편하게 만나는 운동친구
          <br />
          크로플
        </h2>
      </div>
      <BgGraWrapperA></BgGraWrapperA>
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
  mix-blend-mode: multiply;
  opacity: 0.5;
`;

const BgGraWrapperA = tw(BgGraWrapper)`
w-full h-screen flex flex-col mx-auto max-w-md bg-white`;
