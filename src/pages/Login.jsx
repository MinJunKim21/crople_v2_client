import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import React from 'react';

function Login() {
  const google = () => {
    window.open(
      `${process.env.REACT_APP_API_ROOT}/googleauth/google/callback`,
      '_self'
    );
  };

  const kakao = () => {
    window.open(
      `${process.env.REACT_APP_API_ROOT}/kakaoauth/kakao/callback`,
      '_self'
    );
  };

  const naver = () => {
    window.open(`${process.env.REACT_APP_API_ROOT}/naverauth/naver`, '_self');
  };

  return (
    <div>
      <div className="bg-[url('../public/assets/pattern/LoginBgPattern.png')] bg-contain bg-no-repeat bg-center bg-white">
        <BgWhiteBlur>
          <BgWrapper>
            <div className="flex flex-col justify-center items-center min-h-screen">
              <div className="flex justify-center mb-64 mt-24">
                <img src="/assets/croXple.png" className="h-10" alt="" />
              </div>
              <h6 className="flex justify-center text-gray-500 text-xs">
                SNS 계정으로 간편 가입하기
              </h6>
              <div className="flex space-x-4 mt-4">
                <BtnSNS onClick={kakao}>
                  <img src="/assets/BTN/Btn_Kakao.png" alt="" />
                </BtnSNS>
                <BtnSNS onClick={naver}>
                  <img src="/assets/BTN/Btn_Naver.png" alt="" />
                </BtnSNS>
                {/* <BtnSNS>
                  <img src="/assets/BTN/Btn_Apple.png" alt="" />
                </BtnSNS> */}
                <BtnSNS onClick={google}>
                  <img src="/assets/BTN/Btn_Google.png" alt="" />
                </BtnSNS>
              </div>
            </div>
          </BgWrapper>
        </BgWhiteBlur>
      </div>
    </div>
  );
}

export default Login;

const BgWrapper = styled.div`
  background: linear-gradient(
    341.82deg,
    #a8d69b 10.29%,
    rgba(202, 190, 64, 0.28) 47.5%,
    rgba(247, 157, 0, 0) 84.7%
  );
  // mix-blend-mode: multiply;
`;

const BgWhiteBlur = styled.div`
  background: radial-gradient(
    55.16% 29.06% at 49.87% 37.81%,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 100%
  );
  background: white;
`;

const BtnSNS = tw.button`
flex w-14`;
