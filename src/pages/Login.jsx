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

  useEffect(() => {
    const currentUrl = window.location.href;
    const searchParams = new URL(currentUrl).searchParams;
    const code = searchParams.get('code');
    if (code) {
      window.opener.postMessage({ code }, window.location.origin);
    }
  }, []);

  // 로그인 팝입이 열리면 로그인 로직을 처리합니다.
  useEffect(() => {
    if (!popup) {
      return;
    }

    const githubOAuthCodeListener = (e) => {
      // 동일한 Origin 의 이벤트만 처리하도록 제한
      if (e.origin !== window.location.origin) {
        return;
      }
      const { code } = e.data;
      if (code) {
        console.log(`The popup URL has URL code param = ${code}`);
      }
      popup?.close();
      setPopup(null);
    };

    window.addEventListener('message', githubOAuthCodeListener, false);

    return () => {
      window.removeEventListener('message', githubOAuthCodeListener);
      popup?.close();
      setPopup(null);
    };
  }, [popup]);

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

  const onCode = (code, params) => {
    console.log('wooooo a code', code);
    console.log(
      'alright! the URLSearchParams interface from the popup url',
      params
    );
  };
  const onClose = () => console.log('closed!');

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
      <OauthPopup
        url="https://real-gold-vulture-fez.cyclic.app/googleauth/google/callback"
        onCode={onCode}
        onClose={onClose}
      >
        <div>Click me to open a Popup</div>
      </OauthPopup>
    </div>
  );
}

export default Login;
