# ๐ฅTDD

## TDD๋ ๋ฌด์์ผ๊น?
- TDD๋ Test Driven Development์ ์ฝ์๋ก, ```ํ์คํธ ์ฃผ๋ ๊ฐ๋ฐ```์ ๋ปํ๋ค. 
- ์ฆ, ํ์คํธ๊ฐ ์ฃผ๋ํ๋ ๊ฐ๋ฐ์ ์๋ฏธํ๋ฉฐ, ํ์คํธ ์ฝ๋๋ฅผ ๋จผ์  ์์ฑํ๋ ๊ฒ๋ถํฐ ์์ํ๋ค.

![img](https://user-images.githubusercontent.com/76088639/134804469-a1c7038c-7045-4d5c-99b2-a6eefda07a64.gif)

- RED: ํญ์ ์คํจํ๋ ํ์คํธ๋ฅผ ๋จผ์  ์์ฑํ๊ณ ,
- GREEN: ํ์คํธ๊ฐ ํต๊ณผํ๋ ํ๋ก๋์ ์ฝ๋๋ฅผ ์์ฑํ๊ณ 
- REFACTOR: ํ์คํธ๊ฐ ํต๊ณผํ๋ฉด ํ๋ก๋์ ์ฝ๋๋ฅผ ๋ฆฌํฉํ ๋งํ๋ค.


## ๊ทธ๋ ๋ค๋ฉด ํ์คํธ ์ฝ๋๋ ์ ์ค์ํ ๊น?
- ```ํ์คํธ ์ฝ๋๋ ๊ฐ๋ฐ ๋จ๊ณ ์ด๊ธฐ์ ๋ฌธ์ ๋ฅผ ๋ฐ๊ฒฌํ๊ฒ ๋์์ค๋ค.```
- ```๊ธฐ๋ฅ์ ๋ํ ๋ถํ์ค์ฑ์ ๊ฐ์์ํฌ ์ ์๋ค.```


## ์ข ๋ ์๋ฟ๋ ์ฅ์ ์ ์ด์ผ๊ธฐํด๋ณด์
- ํ์คํธ ์ฝ๋๋ฅผ ์์ฑํ์ง ์๋๋ค๋ฉด ์๋์ ๊ฐ์ ๊ณผ์ ์ ํตํด API ๋ฑ์ ๊ฒ์ฆํ  ๊ฒ์ด๋ค.
  1. ์ฝ๋ ์์ฑ ๋ฐ ํ๋ก๊ทธ๋จ ์คํ
  2. Postman์ ํตํด HTTP ์์ฒญ ์ ์ก
  3. console.log()๋ฅผ ํตํด ์์ฒญ ๊ฒฐ๊ณผ ํ์ธ
  4. ๊ฒฐ๊ณผ๊ฐ ๋ค๋ฅด๋ฉด ํ๋ก๊ทธ๋จ ์ค์ง ํ ์ฝ๋ ์์ 
- ์์ ๊ณผ์ ์์ 2 ~ 4๋ ์ฝ๋๋ฅผ ์์ ํ  ๋๋ง๋ค ๋ฐ๋ณตํด์ผ ํ๋ค. 
- ```ํ์ง๋ง ํ์คํธ ์ฝ๋๋ฅผ ์์ฑํ๋ฉด ํ์คํธ ์ฝ๋๋ฅผ ํตํด ์์ฒญ ๊ฒฐ๊ณผ๋ฅผ ๊ฒ์ฆํ๊ธฐ ๋๋ฌธ์ ์์ ๊ฐ์ด ๋ฐ๋ณต๋๋ ๊ณผ์ ์ ํผํ  ์ ์๋ค.```
- ๋ํ console.log()๋ฅผ ํตํด ํ์ธํ๋ ๊ฒ์ ์ฌ์ค ๊ฐ๋ฐ์์ ๋์ผ๋ก ์ง์  ๊ฒ์ฆํ๋ ๊ฒ์ด๋ค. ```ํ์ง๋ง ํ์คํธ ์ฝ๋๋ฅผ ์์ฑํ๋ฉด ์์ฑ๋ ํ์คํธ ์ฝ๋๋ฅผ ํตํด `์๋๊ฒ์ฆ`์ ํ  ์ ์๊ธฐ ๋๋ฌธ์ ๊ธฐ๋ฅ์ ์ข ๋ ํ์คํ๊ฒ ๊ฒ์ฆํ  ์ ์๋ค.```
- ํ ๊ฐ์ง๋ง ๋ ์ด์ผ๊ธฐ ํด๋ณด์๋ฉด, ```ํ์คํธ ์ฝ๋๋ ๊ฐ๋ฐ์๊ฐ ๋ง๋  ๊ธฐ๋ฅ์ ์์ ํ๊ฒ ๋ณดํธํด์ค๋ค.``` ์๋ฅผ ๋ค์ด B๋ผ๋ ๊ธฐ๋ฅ์ด ์ถ๊ฐ๋์ด ํ์คํธ๋ฅผ ํ๋๋ฐ, ๊ธฐ์กด์ ์๋๋ A๋ผ๋ ๊ธฐ๋ฅ์ ๋ฌธ์ ๊ฐ ๋ฐ์ํ๋ค๊ณ  ๊ฐ์ ํด๋ณด์. ์ด ๋ ๋ง์ฝ A๋ผ๋ ๊ธฐ๋ฅ์ ๋ํ ํ์คํธ ์ฝ๋๋ฅผ ์ ๊ตฌํํด๋์๋ค๋ฉด, ํ์คํธ ์ฝ๋๋ง์ผ๋ก ๋ฌธ์ ๋ฅผ ์ฐพ์ ์ ์๊ฒ ๋๋ค.


## ํ์คํธ ์ฝ๋๋ฅผ ์์ฑํด๋ณด์
1. ์์ฑํด์ผ ํ  ํจ์๋ค์ ๋ํ ํ์คํธ ์ฝ๋ ์์ฑ
```javascript
test('should have getAccommodationList function', () => {
    expect(typeof AccommodationController.getAccommodationList).toBe('function');
})
```

2. Layered architecture์์ controller -> service -> repository ๊ฐ ์์ฐจ์ ์ผ๋ก ์คํ๋๋์ง ๊ฐ๋จํ๊ฒ ํ์คํธ ์ฝ๋ ์์ฑ
  - ์ด๋ ์ค์  DB์ ์ ๊ทผํ๋ ํจ์๋ ์ง์ ์ ์ธ ์ํฅ์ ์ฃผ์ง ์๊ธฐ ์ํด mock ํจ์๋ก ๋์ฒดํ๋๋ก ํ๋ค.
  - ```jest.fn()```: Mock ํจ์๋ฅผ ์์ฑํ๋ ํจ์, ์ฆ ํ์คํธ ์ฝ๋ ์์ฑ ์ ํด๋น ์ฝ๋๊ฐ ์์กดํ๋ ๋ถ๋ถ์ ๊ฐ์ง๋ก ๋์ฒดํด์ค๋ค.
```javascript
// mock ํจ์
AccommodationRepository.getAccommodationList = jest.fn(); ๐ฅ

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

3. HTTP ์์ฒญ์์ request.body๋ request.query ๋ฑ์ด ํจ๊ป ์ฌ ์ ์๋๋ฐ, ์ด์ ๋ฐ๋ฅธ ๋น์ฆ๋์ค ๋ก์ง ์ํ ํ์คํธ ์ฝ๋ ์์ฑ
  - node-mocks-http ๋ชจ๋ ํ์
```javascript
data/mock-req.json
{
  "name": "kykapple",
  "nickname": "ed"
}

const data = require('../data/mock-req.json');

// mockํจ์
AccommodationRepository.getAccommodationList = jest.fn(); ๐ฅ

describe('Layered architecture test',  () => {
    test('should have getAccommodationList function', () => {
        expect(typeof AccommodationController.getAccommodationList).toBe('function');
    })
    
    test('should call AccommodationRepository.getAccommodationList with req.body', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        // req.body์ newProduct๋ฅผ ๋ฃ์ด์ค๋ค.
        req.body = data;
        
        AccommodationController.getAccommodationList(req, res);
        expect(AccommodationRepository.getAccommodationList).toBeCalledWith(data);
    })
})
```

4. ์ฌ๋ฌ ํ์คํธ์ ๊ณตํต์ ์ผ๋ก ์ํ๋์ผ ํ๋ ๋ก์ง์ด ์๋ค๋ฉด beforeEach๋ก ๋ถ๋ฆฌ ๊ฐ๋ฅ
```javascript
let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
```

5. ์ํ๊ฐ์ ๋ํ ํ์คํธ ์ฝ๋ ์์ฑ
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

// mockํจ์
AccommodationRepository.getAccommodationList = jest.fn(); ๐ฅ

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







