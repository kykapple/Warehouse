### 개발내역
- FE
  - 닉네임 설정 페이지 구현
  - 지도 페이지 구현
    - 사이드바 구현
      - 채팅창 레이아웃 구현
  - 페이지 라우팅 설정

- BE 
  - `Github OAuth`를 이용한 로그인 구현
  - `JWT`를 이용한 Authorization 구현
  - `Socket.io`를 이용한 채팅 구현 
  - 로그아웃 api 구현


### 데모영상
https://user-images.githubusercontent.com/76088639/137318089-0a5ced2a-8449-47c2-8950-1cb714cfd894.mp4


### 고민 포인트
- `Styled-component`와 `scss`를 병행해서 사용하고 있는데, 이와 같이 병행해서 사용해도 괜찮은지 아니면 통일해서 사용하는 것이 적절한지 여쭈어보고 싶습니다. 또한 `Styled-component`의 경우 컴포넌트 내부에서 작성되고 있는데, 오히려 코드의 가독성이 조금 저하되는 것 같다는 생각이 들었습니다. 그리고 `Styled-component`의 재사용성은 `scss`의 `mixin`으로도 구현할 수 있을 것 같은데, `Styled-component`를 사용하는 어떠한 이유가 있는지 질문드리고 싶습니다!

- Github OAuth로 로그인을 구현하였고, JWT를 통해 authorization 과정을 가지도록 구현하였습니다. 그리고 accessToken과 refreshToken을 쿠키에 담아주었고, 클라이언트에서 `js-cookie`를 통해 접근해서 로그인 여부를 확인해주고 있습니다! 이와 같은 방식이 토큰을 운용하기에 적절한지 질문드리고 싶습니다!

- `useRef 훅` 같은 경우 자식 요소에 접근하는 거 외에도 컴포넌트 내부에서 생성되는 값 중에 렌더링과 무관한 값을 저장할 때도 사용한다고 하던데, 다음과 같이 그냥 컴포넌트 안에서 변수로 관리하는 것과 
```javascript
function Component() {
	let a = 0;
}
```
useRef를 사용하여 관리하는 것중
```javascript
function Component() {
	const aRef = useRef(0);
}
```
어떤 방식이 적절한지 궁금합니다.
