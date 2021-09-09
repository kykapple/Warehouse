
## Day04 (2021-09-09)
### 개발 내역
- 달력 모달창 구현
  - 체크인/체크아웃 영역 클릭 시 현재 달과 다음 달 2개월 간의 일정을 확인할 수 있도록 구현
  - 화살표 클릭 시 2단 간격으로 캘린더 출력
  - 이미 지난 날짜 비활성화 구현
  - 체크인보다 체크아웃이 더 빠를 경우, 체크인 날짜 변경 구현
  - 체크인 혹은 체크아웃의 날짜가 입력될 시 초기화 버튼 노출, 클릭 시 체크인/체크아웃 초기화
- 컴포넌트와 그에 해당하는 scss 구분해서 디렉토리 구성
  - scss 파일을 하나로 개발하다 보니 컴포넌트의 스타일을 지정하거나 수정할 때 번거로움을 느껴 컴포넌트와 그에 해당하는 scss 파일을 묶어서 디렉토리 구성 
- 요금 조정 모달창 구현
  - 더미 데이터를 통해 막대 그래프 임시 구현

### 앞으로 해야할 일
- 달력 모달창 오류 확인
- 요금 조정 모달창의 그래프와 요금 매칭 구현

### 고민 포인트
- 현재는 App.js에서 레이아웃을 구성해나가며, header에 NavigationBar를 넣고, main에 SearchBar를 넣어주는 방식으로 개발을 하고 있습니다! 그리고 달력 모달창과 요금 모달창의 경우, SearchBar에 종속되는 컴포넌트라고 생각하여 SearchBar.js에서 마운트 해주도록 하였습니다. 추후, 현재 개발중인 검색 페이지 뿐만 아니라 결과 페이지에서도 App.js를 재사용하기 위해 App.js에도 State를 두어서 검색 페이지인지, 결과 페이지인지에 따라 다르게 랜더링을 해주는 방식으로 진행을 하려고 하는데, 적절한 방식으로 진행하고 있는 것인지 여쭈어보고 싶습니다..!

- 현재 SearchBar.js를 통해 구현한 검색바에는 체크인, 체크아웃 상태를 가지고 있습니다(추후 요금, 인원 추가 예정입니다!). 그리고 체크인 혹은 체크아웃을 달력 모달창을 통해 값을 집어넣으면 옆에 초기화 버튼이 활성화되는데, 이 버튼을 누르면 현재 검색바가 가지고 있는 체크인, 체크아웃 상태를 null로 바꿔주고, 그에 따라 랜더링을 새로 해주도록 하였습니다. 이와 같은 방식으로 앞으로 구현할 요금과 인원의 상태도 추가하여 관리할 생각인데, 상태 관리를 적절히 하고 있는 것이 맞는지 리뷰어님의 조언 혹은 지적을 받고 싶습니다! 

SPA 방식의 개발이 처음이다 보니 구조와 상태 관리가 제대로 이루어지고 있는지가 조금 헷갈리는 것 같습니다..! 누추한 코드라 죄송스럽고.. 리뷰 맡아주셔서 감사합니다:)!!

















