# Warehouse
<<<<<<< HEAD

## 2주차 백엔드

### 구성 및 구현 담당자

📍 궁금하신 점은 해당 캠퍼에게 문의해주세요~

- NodeJS : J009 김영기<br>
- FireBase : J202 차재명<br>
- AWS : J112 신기철<br>

## AWS

주소 : 18.116.12.250:3000

## FireBase

Groups 와 Users 컬렉션이 존재합니다.

### Groups

    currentUserNumber: 1 //현재 참여한 유저의 수

    deadline : "24:00" //모임 마감시간

    groupAdministrator : "relay24" //모임을 주최한 유저

    groupId : 1 //모임의 고유한 ID값 문서ID와 값을 공유합니다.

    groupName : "24 그룹" //모임 이름

    information

        location : "seoul" // 지역

        outlet : 4 //콘센트 수

        toilet : true //화장실 유무

    introduction : "24 study" //모임 소개글

    participants : ["relay24"] //참여자

    personality

        field : "AOS" //직군

        framework : ["flutter"] //프레임워크

        language : ["kotlin"] //언어

        strength : "빡빡" //모임 강도

        study : true //스터디 유무

        talk : "잡담 가능" //커뮤니케이션 정도

    userNumber : 3  //모임 최대 유저수

### Users

    groups : [1] //유저가 속한 그룹들의 id 배열

    id : "J009" //유저의 id

    interest : ["kotlin"] //관심 언어

    nickName : "J009" //닉네임

    password : "$2b$12$UU3Rld7FonEfLX20ThuwV3rPj1MVCTR1zsHvySEqnrNSUsbHEu" //암호화된 비밀번호

    region : "naver" //관심 지역

## nodeJS

- Automation : crontab을 이용해 매일 24시 정각에 남아있는 모든 모임을 삭제합니다.

### Group

- GET /group 모든 모임 리스트 반환<br>
  ![image](https://user-images.githubusercontent.com/38166372/127761496-dd82383a-1948-402f-8dad-a3ca2bc7f6b9.png)
  ![image](https://user-images.githubusercontent.com/38166372/127761506-6aee1e88-ff38-4809-b24e-96bf422ed52c.png)

- GET /group/select/ 해당 groupId에 해당하는 모임 리턴<br>
  ![image](https://user-images.githubusercontent.com/38166372/127761528-8e7efac9-7bca-46d0-b6fb-2195b25d6f4f.png)
  ![image](https://user-images.githubusercontent.com/38166372/127761535-8476ddd2-4359-4435-b073-c0340a63671c.png)
- GET /group/search/ 검색 option에 해당하는 모임 리턴<br>
  ![image](https://user-images.githubusercontent.com/38166372/127761555-95a34fd0-ea8d-4a3d-888f-0e39a4db4ee7.png)
  ![image](https://user-images.githubusercontent.com/38166372/127761563-778d5194-c2c4-4ac0-bebe-2abcb01b0629.png)

- POST /group 모임 생성<br>
  모임 생성시 모임id가 반환되도록 수정하였습니다.
  ![image](https://user-images.githubusercontent.com/38166372/127761519-3e3c6b5e-e684-4ed1-b01d-d2432e4bf8d1.png)

- DELETE /group/delete 모임 삭제<br>
  ![image](https://user-images.githubusercontent.com/38166372/127761547-aa942a87-0382-4a7e-8973-077139564cb1.png)
- PUT /group/join 해당 groupId에 해당하는 모임에 참여<br>
  ![image](https://user-images.githubusercontent.com/38166372/127761572-66f154ba-6094-4874-a24c-d5f005d80fe1.png)

### User

- GET /user 로그인<br>
  로그인 시 상태 메시지가 반환되도록 수정하였습니다.
  ![image](https://user-images.githubusercontent.com/38166372/127761485-b6fd8474-0842-493e-b7d7-e6b07f57d8ca.png)
- POST /user 회원가입<br>
  ![image](https://user-images.githubusercontent.com/38166372/127761456-c637c960-3515-4384-9ff5-51112e7d0f9a.png)

- GET /user/sidebar 회원 정보 조회<br>
  ![image](https://user-images.githubusercontent.com/38166372/127761585-74e513be-2016-468c-bbb2-4c011c88083a.png)
  ![image](https://user-images.githubusercontent.com/38166372/127761590-983f8705-06fe-446e-b187-0f9d45dd6e99.png)
