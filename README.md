# Warehouse

### 수정사항 (2021-07-28)
- 클로저 기법을 활용하는 커링 도입

### 구현 방식

- [] ClassifierAlpha와 PrimeAlpha 함수형 리팩토링
- 순수 함수의 불변성
  - 어떠한 위치에서도 전달 받은 값을 직접적으로 변경하지 않는다.

- 순수 함수의 참조 무결성
  - Side effect가 없고, 같은 입력에 대해서 항상 같은 출력을 제공한다.

- 순수 함수 내부에서 다른 순수 함수를 호출하는 경우도 순수 함수라고 생각하여 구현하였고, 모든 순수 함수는 const 키워드를 통해 재할당을 막아주었다.

[X] 클로저 선언과 활용 및 커링
- 완전수인지, 과잉수인지, 부족수인지를 판단할 때 compareValue 커링을 사용하였고, 커링에서 명시적으로 선언한 클로저 sum을 활용하였다.
```javascript
// factors의 총합을 반환하는 함수
const sum = ( (factors) => [...factors].reduce((prev, curr) => prev + curr) );  // 클로저

// 완전수, 과잉수, 부족수를 판단할 때 사용할 비교값을 반환하는 커링
const compareValue = (num, method) => (factors) => (isFactor) => method(factors(num, isFactor)) - num;

// num값이 완전수인지 과잉수인지 부족수인지 판단하여 그 결과를 반환하는 함수
const judgeNumber = (num) => {
    const conditions = [
        (a, b) => a == b ? 'perfect' : '',
        (a, b) => a > b ? 'abundant' : '',
        (a, b) => a < b ? 'deficient' : '',
    ];
    return conditions.map(cond => cond(compareValue(num, sum)(factors)(isFactor), num)).filter(res => res.length > 0);
}
```

[X] 고차 함수 map 활용
- factors() 함수, judgeNumber() 함수, Main.js 모듈에서 활용

[X] 고차 함수 filter 활용
- factors() 함수, judgeNumber() 함수, isSquared() 함수, equalSet() 함수에서 활용

[X] 고차 함수 reduce 활용
- sum() 함수, Main.js 모듈에서 활용

[X] 커링 또는 함수 합성
- compareValue() 함수에서 사용

[X] 다른 함수를 활용해서 isSquared() 구현
- factors() 함수를 활용하여 구현
