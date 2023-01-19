import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import React from 'react';
import { useEffect, useState } from 'react';
import OauthPopup from 'react-oauth-popup';

// import { useContext } from 'react';
// import { useRef } from 'react';
// import { loginCall } from '../apiCalls';

function Login() {
  // const email = useRef();
  // const password = useRef();

  const google = () => {
    window.open(
      'https://real-gold-vulture-fez.cyclic.app/googleauth/google/callback',
      '_self'
    );
    // loginCall();
  };

  const kakao = () => {
    window.open(`${process.env.REACT_APP_API_ROOT}/kakaoauth/kakao`, '_self');
  };

  const naver = () => {
    window.open(
      'https://real-gold-vulture-fez.cyclic.app/naverauth/naver',
      '_self'
    );
  };

  // const [popup, setPopup] = useState();

  // const handleOpenPopup = () => {
  //   const width = 500;
  //   const height = 400;
  //   const left = window.screenX + (window.outerWidth - width) / 2;
  //   const top = window.screenY + (window.outerHeight - height) / 2;
  //   const popup = window.open(
  //     'https://real-gold-vulture-fez.cyclic.app/googleauth/google/callback',
  //     '로그인 중...',
  //     `width=${width},height=${height},left=${left},top=${top}`
  //   );
  //   setPopup(popup);
  // };

  // useEffect(() => {
  //   const currentUrl = window.location.href;
  //   const searchParams = new URL(currentUrl).searchParams;
  //   const code = searchParams.get('code');
  //   if (code) {
  //     window.opener.postMessage({ code }, window.location.origin);
  //   }
  // }, []);

  // // 로그인 팝입이 열리면 로그인 로직을 처리합니다.
  // useEffect(() => {
  //   if (!popup) {
  //     return;
  //   }

  //   const githubOAuthCodeListener = (e) => {
  //     // 동일한 Origin 의 이벤트만 처리하도록 제한
  //     if (e.origin !== window.location.origin) {
  //       return;
  //     }
  //     const { code } = e.data;
  //     if (code) {
  //       console.log(`The popup URL has URL code param = ${code}`);
  //     }
  //     popup?.close();
  //     setPopup(null);
  //   };

  //   window.addEventListener('message', githubOAuthCodeListener, false);

  //   return () => {
  //     window.removeEventListener('message', githubOAuthCodeListener);
  //     popup?.close();
  //     setPopup(null);
  //   };
  // }, [popup]);

  // useEffect(() => {
  //   if (!popup) {
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     if (!popup) {
  //       timer && clearInterval(timer);
  //       return;
  //     }
  //     const currentUrl = popup.location.href;
  //     if (!currentUrl) {
  //       return;
  //     }
  //     const searchParams = new URL(currentUrl).searchParams;
  //     const code = searchParams.get('code');
  //     if (code) {
  //       popup.close();
  //       console.log(`The popup URL has URL code param = ${code}`);
  //       // 가져온 code 로 다른 정보를 가져오는 API 호출
  //     }
  //   }, 500);
  // }, [popup]);

  // const onCode = (code, params) => {
  //   console.log('wooooo a code', code);
  //   console.log(
  //     'alright! the URLSearchParams interface from the popup url',
  //     params
  //   );
  // };
  // const onClose = () => console.log('closed!');

  return (
    <div className="flex flex-col justify-center items-center min-h min-h-screen">
      <div className="flex justify-center mb-64 mt-24">
        <img src="/assets/croXple.png" className="h-10" />
      </div>
      <h6 className="flex justify-center text-gray-500 text-xs">
        SNS 계정으로 간편 가입하기
      </h6>
      <div className="flex space-x-4 mt-4">
        <Btn_sns onClick={kakao}>
          <img src="/assets/BTN/Btn_Kakao.png" />
        </Btn_sns>
        <Btn_sns onClick={naver}>
          <img src="/assets/BTN/Btn_Naver.png" />
        </Btn_sns>
        <Btn_sns>
          <img src="/assets/BTN/Btn_Apple.png" />
        </Btn_sns>
        <Btn_sns onClick={google}>
          <img src="/assets/BTN/Btn_Google.png" />
        </Btn_sns>
      </div>
      {/* <BgWrapperA></BgWrapperA> */}
      {/* <Button>hi</Button> */}
      {/* <button onClick={handleOpenPopup}>GOOGLE POPUP 형식</button> */}
      {/* <span>{process.env.REACT_APP_MODE}</span>
        <span>{process.env.REACT_APP_HOME_URL}</span>
        <span>{process.env.REACT_APP_API_ROOT}</span> */}
      {/* <OauthPopup
        url="https://real-gold-vulture-fez.cyclic.app/googleauth/google/callback"
        onCode={onCode}
        onClose={onClose}
        >
        <div>Click me to open a Popup</div>
      </OauthPopup> */}
    </div>
  );
}

export default Login;

const BgWrapper = styled.div`
  background: linear-gradient(
    17.6deg,
    rgba(247, 157, 0, 0) 15.18%,
    rgba(202, 190, 64, 0.28) 52.34%,
    #a8d69b 89.49%
  );
  transform: matrix(1, 0, 0, -1, 0, 0);
`;

const BgWrapperA = tw(BgWrapper)`
flex flex-col w-full h-screen`;

const Btn_sns = tw.button`
flex w-14`;
