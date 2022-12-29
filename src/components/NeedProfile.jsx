import React from 'react';
import Topbar from './Topbar';

export default function NeedProfile() {
  return (
    <div>
      <Topbar />
      <div className="bg-gray-600 w-screen h-screen">
        <span>개인정보 설정을 눌러서 입력해주세요.화살표</span>
        <div>
          <span>기본설정부터 해야합니다.</span>
        </div>
      </div>
    </div>
  );
}
