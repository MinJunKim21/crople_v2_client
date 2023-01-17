import React from 'react';
import { useEffect, useState } from 'react';

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
    window.open(`${process.env.REACT_APP_API_ROOT}/naverauth/naver`, '_self');
  };

  const [popup, setPopup] = useState();

  const handleOpenPopup = () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      'https://real-gold-vulture-fez.cyclic.app/googleauth/google/callback',
      '로그인 중...',
      `width=${width},height=${height},left=${left},top=${top}`
    );
    setPopup(popup);
  };

  // useEffect(() => {
  //   const currentUrl = window.location.href;
  //   const searchParams = new URL(currentUrl).searchParams;
  //   const code = searchParams.get('code');
  //   if (code) {
  //     window.opener.postMessage({ code }, window.location.origin);
  //   }
  // }, []);

  useEffect(() => {
    if (!popup) {
      return;
    }

    const timer = setInterval(() => {
      if (!popup) {
        timer && clearInterval(timer);
        return;
      }
      const currentUrl = popup.location.href;
      if (!currentUrl) {
        return;
      }
      const searchParams = new URL(currentUrl).searchParams;
      const code = searchParams.get('code');
      if (code) {
        popup.close();
        console.log(`The popup URL has URL code param = ${code}`);
        // 가져온 code 로 다른 정보를 가져오는 API 호출
      }
    }, 500);
  }, [popup]);

  return (
    <div className="max-w-md">
      <div className="bg-green-200 flex flex-col">
        <h1>choose login method</h1>
        <button onClick={google}>google</button>
        <button onClick={kakao}>kakao</button>
        <button onClick={naver}>naver</button>
        <button onClick={handleOpenPopup}>GOOGLE POPUP 형식</button>
        <span>{process.env.REACT_APP_MODE}</span>
        <span>{process.env.REACT_APP_HOME_URL}</span>
        <span>{process.env.REACT_APP_API_ROOT}</span>
      </div>
    </div>
  );
}

export default Login;
