# 🔥TDD

## TDD란 무엇일까?
- TDD란 Test Driven Development의 약자로, ```테스트 주도 개발```을 뜻한다. 
- 즉, 테스트가 주도하는 개발을 의미하며, 테스트 코드를 먼저 작성하는 것부터 시작한다.

![img](https://user-images.githubusercontent.com/76088639/134804469-a1c7038c-7045-4d5c-99b2-a6eefda07a64.gif)

- RED: 항상 실패하는 테스트를 먼저 작성하고,
- GREEN: 테스트가 통과하는 프로덕션 코드를 작성하고
- REFACTOR: 테스트가 통과하면 프로덕션 코드를 리팩토링한다.


## 그렇다면 테스트 코드는 왜 중요할까?
- ```테스트 코드는 개발 단계 초기에 문제를 발견하게 도와준다.```
- ```기능에 대한 불확실성을 감소시킬 수 있다.```


## 좀 더 와닿는 장점을 이야기해보자
- 테스트 코드를 작성하지 않는다면 아래와 같은 과정을 통해 API 등을 검증할 것이다.
  1. 코드 작성 및 프로그램 실행
  2. Postman을 통해 HTTP 요청 전송
  3. console.log()를 통해 요청 결과 확인
  4. 결과가 다르면 프로그램 중지 후 코드 수정
- 위의 과정에서 2 ~ 4는 코드를 수정할 때마다 반복해야 한다. 
- ```하지만 테스트 코드를 작성하면 테스트 코드를 통해 요청 결과를 검증하기 때문에 위와 같이 반복되는 과정을 피할 수 있다.```
- 또한 console.log()를 통해 확인하는 것은 사실 개발자의 눈으로 직접 검증하는 것이다. ```하지만 테스트 코드를 작성하면 작성된 테스트 코드를 통해 `자동검증`을 할 수 있기 때문에 기능을 좀 더 확실하게 검증할 수 있다.```
- 한 가지만 더 이야기 해보자면, ```테스트 코드는 개발자가 만든 기능을 안전하게 보호해준다.``` 예를 들어 B라는 기능이 추가되어 테스트를 하는데, 기존에 잘되던 A라는 기능에 문제가 발생했다고 가정해보자. 이 때 만약 A라는 기능에 대한 테스트 코드를 잘 구현해놓았다면, 테스트 코드만으로 문제를 찾을 수 있게 된다.


## 테스트 코드를 작성해보자
1. 작성해야 할 함수들에 대한 테스트 코드 작성
```javascript
test('should have getAccommodationList function', () => {
    expect(typeof AccommodationController.getAccommodationList).toBe('function');
})
```

2. Layered architecture에서 controller -> service -> repository 가 순차적으로 실행되는지 간단하게 테스트 코드 작성
  - 이때 실제 DB에 접근하는 함수는 직접적인 영향을 주지 않기 위해 mock 함수로 대체하도록 한다.
  - ```jest.fn()```: Mock 함수를 생성하는 함수, 즉 테스트 코드 작성 시 해당 코드가 의존하는 부분을 가짜로 대체해준다.
```javascript
// mock 함수
AccommodationRepository.getAccommodationList = jest.fn(); 🔥

describe('Layered architecture test',  () => {
    test('should have getAccommodationList function', () => {
        expect(typeof AccommodationController.getAccommodationList).toBe('function');
    })

    test('should call AccommodationRepository.getAccommodationList', () => {
        AccommodationController.getAccommodationList();
        expect(AccommodationRepository.getAccommodationList).toBeCalled();
    })
});
```

3. HTTP 요청에서 request.body나 request.query 등이 함께 올 수 있는데, 이에 따른 비즈니스 로직 수행 테스트 코드 작성
  - node-mocks-http 모듈 필요
```javascript
data/mock-req.json
{
  "name": "kykapple",
  "nickname": "ed"
}

const data = require('../data/mock-req.json');

// mock함수
AccommodationRepository.getAccommodationList = jest.fn(); 🔥

describe('Layered architecture test',  () => {
    test('should have getAccommodationList function', () => {
        expect(typeof AccommodationController.getAccommodationList).toBe('function');
    })
    
    test('should call AccommodationRepository.getAccommodationList with req.body', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        // req.body에 newProduct를 넣어준다.
        req.body = data;
        
        AccommodationController.getAccommodationList(req, res);
        expect(AccommodationRepository.getAccommodationList).toBeCalledWith(data);
    })
})
```

4. 여러 테스트에 공통적으로 수행되야 하는 로직이 있다면 beforeEach로 분리 가능
```javascript
let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
```

5. 상태값에 대한 테스트 코드 작성
```javascript
data/mock-req.json
{
  "name": "kykapple",
  "nickname": "ed"
}

const data = require('../data/mock-req.json');

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

// mock함수
AccommodationRepository.getAccommodationList = jest.fn(); 🔥

describe('Layered architecture test',  () => {
    test('should have getAccommodationList function', () => {
        expect(typeof AccommodationController.getAccommodationList).toBe('function');
    })
    
    test('should call AccommodationRepository.getAccommodationList with req.body', () => {
        req.body = data;
        
        AccommodationController.getAccommodationList(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    })
})
```







