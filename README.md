# croXple [크로플]

### 크로플 배포 : [https://www.croxple.com](https://www.croxple.com/)

# ✨ 서비스 소개

- 관심 운동과 지역을 등록하여 관심이 겹치는 친구를 찾는 **운동인 메이팅 플랫폼**
- 상대방의 프로필카드를 구경하여 매칭 신청을 하고, **매칭이 되면 실시간 챗**
- 친구를 찾으면 함께 운동할 **시설을 추천**

# 👨‍👨‍👦‍👦 팀원 구성

- **FE, BE 개발자 1명 (본인)** : FE, BE 모든 부분 담당
- **기획자 1명** : 서비스 기획, 마케팅 담당
- **디자이너 1명** : 서비스 모든 디자인 파트 담당

# 🔑 핵심 기능

<span><img src = "https://user-images.githubusercontent.com/101058125/221799086-ff80d87f-4ad1-485d-b9d6-bda40e9ab281.gif" width = "20%" ></span>
<span><img src = "https://user-images.githubusercontent.com/101058125/221810659-dd41ffaa-7df7-4bbe-8fee-26baf5a9c6fb.gif" width = "20%" ></span>
<span><img src = "https://user-images.githubusercontent.com/101058125/221812644-56af9702-b754-4582-968e-6b03c1a6bc51.gif" width = "20%" ></span>

1. **SNS 로그인 : Node.js passport Oauth 2.0을 이용**

   카카오, 네이버, 구글 소셜 로그인을 통하여 회원가입, 로그인 과정을 처리하였습니다. passport library를 사용하였으며, 세션을 활용하여 사용자를 식별합니다. 로그인 후 닉네임과 같은 기본 정보를 먼저 등록해야 서비스 사용이 가능하도록 플로우를 구성하였습니다. sns 로그인 후 설정한 프로필 정보들은 mongoDB를 사용하여 저장하였습니다. FE에서는 Context API 를 통하여 로그인한 유저의 정보와 로그인 상태를 관리하였습니다.

2. **이미지 데이터 관리 : Cloudinary 이용 / 이미지 슬라이드 : slick slider**

   사용자가 프로필사진을 등록, 수정하면 Cloudinary에 이미지를 저장하였습니다. Cloudinary에서 그 사진의 url을 가져와 mongoDB의 유저 정보에 저장, 수정하여 사용하였습니다. 이미지들의 슬라이딩 UI는 slick slider를 활용하였습니다.

3. **유저들의 프로필카드 구경과 매칭 신청 / 서로 매칭 성공 시 채팅 리스트에 상대방 프로필카드 생성됨**

   user의 데이터에 follower, following 카테고리를 구성하여 매칭 신청시 데이터가 업데이트됩니다. 다른 유저의 프로필카드를 클릭해서 열람한 후 되돌아올때 페이지가 reload되지 않도록 컴포넌트로 구성하거나, 본인의 프로필카드 클릭시 route path를 :id로 url을 분기하기도 하여 서비스 플로우 의도에 맞추어 다르게 구성하였습니다.

4. **Tailwind CSS와 Styled-Components를 상황에 맞추어 섞어 활용하여 스타일링**

   레이아웃 배치는 Tailwind로 직관적으로 수정을 할 수 있는 장점을 활용. 컴포넌트를 스타일링하는 경우 Styled-Components를 Tailwind 문법으로 사용하여 정돈된 구성과 유틸리티성인 장점을 활용. 컴포넌트의 스타일링이 gradient, blur, shadow 값이 제각각이며 길고 복잡해지는 경우에는 오리지널 Styled-Component와 Tailwind 문법으로 쓴 Styled-Component를 나누어 코드를 작성하였고, 이 둘을 하나의 태그에 적용하여 하나의 태그를 사용하는 방식으로 작업하였습니다.

5. **Socket io 를 사용하여 채팅 기능 구현(websocket)**

   DB model은 conversation과 message로 나누었고, 두 사용자의 대화에 해당하는 유저들 간의 메세지들이 저장되었습니다. sender, receiver, lastMessage 등등의 정보들을 다루어 마지막 메세지가 얼마나 전인지 시간 표기, 채팅창에서 같은 시간에 보낸 메세지들은 시간을 하나만 표기, 상대방과 본인의 메세지 UI와 레이아웃을 구분, 하루가 넘어가면 날짜와 구분선 표시 등등을 구현하였습니다. 실시간으로 채팅이 이루어지는 것은 socket io를 사용하였고, websocket이 지원되는 Render를 사용하여 서버를 배포하였습니다.

6. **배포 환경 / 개발 환경 설정**

   FE 파트는 Netlify 배포, BE 파트는 Render 배포하였습니다. .env 를 통하여 환경변수를 개발/ 배포 환경에 나누어 설정한 후, 각 환경에 해당하는 URI 적용되도록 하였습니다. Github repo에는 main과 develop 2개의 브랜치로 나누어두었으며, 배포와 개발 환경에서 작업을 진행하면서 확인 후 git pull로 업데이트하며 진행을 하였습니다. main branch push 실행 시 변경사항이 자동 배포되도록 프로덕션 CD를 설정하였습니다.

7. **Responsive View**

   모바일 환경에서 서비스를 사용하는게 주된 상황이기에 현재는 모바일 버전만 준비가 되었습니다. pc환경은 디자인이 없지만 기본적인 정돈만 준비되었고, responsive view extension을 사용하여 다수의 모바일 환경에서 디자인과 레이아웃에 문제가 없는지 확인하였습니다.

8. **사용자 데이터 분석 Hotjar**

   croxple ver.1 에서는 웹 링크를 통해서 사람들에게 매칭 조건에 따라 선호도 조사를 하여 운동친구를 찾아주었습니다. 사용방법 공지page, 매칭조건 선택page, 관리자page(조건에 맞추어 최다 팀 탄생 경우의 수 보여주기, 사용자들 데이터 리스트업 등)으로 이루어졌었고, hotjar을 통해서 관찰하였습니다. 이를 통해 회색 비활성화 버튼이 공지를 슬라이드로 다 보아야 활성화 버튼으로 바뀌는 플로우가 ux면에서 당황스러움을 발견 / 어느 문항에서 가장 고민하는지 비교 / pc(macOS, Window), mobile(ios, android), 태블릿 등등 다양한 환경에서 접속됨 / 어느 경로로 유입이 많이 되는가 / 등등을 알아보았습니다.

# ⚒️ 기술 스택
<p align='center'>
    <img src="https://img.shields.io/badge/React-v18.2.0-blue?logo=React"/>
    <img src="https://img.shields.io/badge/node.js-v16.15.0-green?logo=Node.js"/>
    <img src="https://img.shields.io/badge/mongodb-v4.0.10-critical?logo=mongodb"/>
    <img src="https://img.shields.io/badge/mongoose-v6.7.5-critical?logo=mongodb"/>
    <img src="https://img.shields.io/badge/express-v4.18.2-ff69b4?logo=express"/>
    <img src="https://img.shields.io/badge/Socket.io-v4.6.0-aaa?logo=socket.io"/>
    <img src="https://img.shields.io/badge/prettier-^2.2.0-yellow?logo=prettier" />
    <img src="https://img.shields.io/badge/eslint-^7.11.0-yellow?logo=eslint">
    <img src="https://img.shields.io/badge/styled--components-v4.4.1-orange?logo=styled-components"/>
    <img src="https://img.shields.io/badge/tailwindcss-v26.6.3-orange?logo=tailwind-css"/>
</p>

# 🧑‍💻 협업 파트

### [디자인 파트]

- 피그마를 사용하여 디자이너와 온라인으로 피그마 내부 음성 회의 툴을 사용하여 실시간으로 자주 회의를 나누었으며, add comment 기능으로 세부사항들을 남기고 체크하며 진행하였습니다.
- 디자이너와 개발 각각에서 자주 사용되는 디자인 시스템을 서로 공유하고 설명하며 방향성과 효율성을 구축하면서 작업을 진행하였습니다.
- 기본적인 피그마 기능은 사용 가능해서, 필요시 직접 소스를 익스포트 / 그리드 체크 / 스타일링 값들을 추출 등등을 직접하며 협력의 효율성을 높였습니다.

### [기획 파트]

- 최대 입력 byte 설정 후 넘을 경우 타이핑 안되게 하기 / 이미지가 cloudinary에 업로드되는 중에는 페이지 전환 없도록 ux 설정하기 / 어느 부분에 loading page가 노출되는지 / 다양한 모바일에서 레이아웃이 이상한 부분이 있는지 / 등등 빠지거나 개발 지식이 필요한 부분은 구현하면서 꼼꼼하게 체크하여 기획자와 논의하였습니다.
- 최소 인원으로 프로젝트를 진행하다보니 단순히 서비스를 그대로 구현하기 보다, 유의미한 ux와 구현 방법들을 같이 고민하며 진행하였습니다.
- 개발 파트 진행이 가장 오래 걸려서 PM 역할을 병행하여 업무와 시간 조율을 진행하였습니다. 구현 단계에서는 사전에 논의하지 못한 디테일한 사항들이 발견되는 경우가 많았기에, 매주 진행을 하면서 준비 사항을 다시 체크해주며 기획, 디자인, 개발의 진행이 매끄럽게 진행되도록 노력하였습니다.
