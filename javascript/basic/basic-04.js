/** 형 변환(Type conversion) */
const A = 1; //Number
const B = '1'; // String

console.log(A == B); // true: 동등 연산자. 자동으로 형 변환
console.log(A === B); // false: 일치 연산자. 타입까지 비교 -> 되도록이면 일치 연산자 사용

const C = 0;
const D = false;
const E = true;

console.log(C == D); // true
console.log(C == E); // false

/** 참과 거짓 (Truthy & Falsy)
 * 숫자 0, null, undefined, false, NaN, ""는 거짓에 해당한다.
 *
 */
const fruits = ['사과', '바나나', '포도', '수박', '딸기'];
const emptyArr = [];

if (fruits) {
  console.log('배열 데이터 안에 아이템이 들어 있습니다.');
}

if (emptyArr.length) {
  console.log('배열 데이터 안에 아이템이 들어있다.');
} else {
  console.log('배열 데이터 안에 아이템이 들어있지 않다.');
  console.log('배열의 length 값이 0이므로 거짓이다.');
}
