/** 화살표 함수 */
function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2)); // 3
console.log(sum(10, 20)); // 30

/** 화살표 함수란 무엇일까?
 * function 키워드를 사용하지 않는다.
 * return 키워드로 실행문이 바로 시작되는 경우에는 return 키워드와 중괄호를 생략할 수 있다.
 * 매개변수를 가질 수 있는데, 매개변수 개수가 1개라면 매개변수를 감싸고 있는 소괄호를 생략할 수 있다.
 */

const sum1 = (a, b) => {
  return a + b;
};
const sum2 = (a, b) => a + b;
console.log(sum2(1, 2)); // 3

const a = (x) => {
  console.log('x: ', x);
  return x * x;
};

const b = () => {
  return { value: 1 };
};

const c = () => {
  value: 1;
}; // 중괄호로 사용된 부분이 마치 함수의 블록처럼 보이기 때문에, 자바스크립트 문법적으로 이해할 수 없는 코드. 따라서 오류가 난다.

const d = () => ({ value: 1 });
