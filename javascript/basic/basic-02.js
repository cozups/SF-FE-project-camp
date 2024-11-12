/** 원시형 데이터 타입 */

/** 문자열 */
const str1 = 'hello, world!';
const str2 = 'world!';
const str3 = `hello, ${str2}`;
console.log(str3);

/** 숫자 number */
/**
 * 숫자 데이터와 다른 타입의 값을 연산할 경우 -> 2-1로 가기
 */

const num1 = 123;
const num2 = -123; // 음수
const num3 = -123.5678;
const pi = 3.14; // 부동 소수점

console.log(num3 + undefined); // 2-1: 출력 값 (NaN Not a Number)
console.log(typeof (num3 + undefined)); // number
console.log(typeof pi); // number

/** NaN(Not a Number)이라는 데이터는 타입 자체는 숫자 데이터인데
 * 특정한 숫자 값으로 표현할 수 없기 때문에 NaN으로 표시하여 출력, 반환한다.
 * 그래서 NaN 값이 나왔다는 것은 숫자 연산에 숫자가 아닌 다른 값이 포함되어있을 가능성이 있다는 것을 의미한다.
 */

const a = 0.1;
const b = 0.2;

console.log(a + b);
console.log(typeof (a + b).toFixed(1)); // toFixed: 숫자를 고정소수점 표기법으로 바꾸고 문자열로 변환
console.log(typeof Number((a + b).toFixed(1)));
console.log(Number((a + b).toFixed(1)));

/** 불리언 Boolean
 * true / false 두 가지 값만 사용하는 논리 데이터
 * true: 긍정의 의미
 * false: 부정의 의미
 */

const truthy = true;
const falsy = false;

if (truthy) {
  console.log('조건식이 참입니다.');
} else {
  console.log('조건식이 거짓입니다.');
}

/** null과 undefined
 * null: 존재하지 않는다. '값이 비어있다. 값을 알 수 없다.' 명시적으로 표현한 것
 * 의도적으로 변수를 비우거나, 특정 상황에서 값이 없음을 나타내기 위함
 *
 * undefined: 변수가 선언되었지만 값이 할당되지 않았음을 의미한다.
 * 함수가 값을 반환하지 않거나, 객체에서 존재하지 않는 속성에 접근했을 때 undefined 반환
 */

let value1 = null; // 개발자의 의도가 보이는 코드
console.log(value1); // null
console.log(typeof value1); // object

setTimeout(() => {
  value1 = 30;
  console.log(value1);
}, 1000);

let value2;
console.log(value2); // undefined

/** ---------------------------------------------------------------------------- */
const user = {
  name: 'miso', // key-value 구조
  age: 28,
};
console.log(user.age); // 28
console.log(user.name); // miso
console.log(user.email); // undefined
console.log(user.password); // undefined
