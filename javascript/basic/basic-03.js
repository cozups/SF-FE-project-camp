/** 참조형 데이터 타입 */

/** 배열 */
const fruits = new Array('사과', '바나나', '체리', '멜론', '수박', '딸기');
console.log(fruits);

/** 배열 리터럴
 * 배열을 만드는 방식. 대괄호([]) 기호를 통해 만듦 - 리터럴 방식
 */
const animals = ['호랑이', '사자', '코끼리', '원숭이', '악어'];
console.log(animals); // ['호랑이', '사자', '코끼리', '원숭이', '악어']
console.log(animals[1]); // 사자 => '배열 데이터를 인덱싱한다' 라고 한다. 각각의 데이터 하나하나를 배열의 아이템, 배열의 요소, element라고 한다.
console.log(animals.length); // 5
console.log(animals[animals.length - 1]); // 악어
console.log(animals[0]); // 호랑이

/** 객체 */
const user = new Object(); // 생성자 함수를 통해 객체 생성
user.name = 'miso';
user.age = 28;
user.job = 'programmer';
console.log(user); // key-value 형태로 조회가 된다. key는 속성 혹은 프로퍼티(property)라고 하며, value는 값이라고 부르기도 한다.

/** 객체 리터럴
 * 중괄호({}) 기호를 통해 객체를 만드는 방식
 * 객체 데이터에서 key는 고유하며, 순서는 중요하지 않다.
 * 단, 동일한 키 값일 경우, 나중에 작성된 값으로 덮어 씌워진다.
 */
const member = {
  name: 'miso',
  age: '28',
  job: 'programmer',
};
console.log(member);
console.log(member.name); // 객체에서는 점(.) 표기법으로 접근한다.
console.log(member['job']); // 대괄호 표기법

const userA = {
  name: '유저 A',
  age: 17,
  job: 'student',
};

const userB = {
  name: '유저 B',
  age: 10,
  brother: userA,
};

console.log(userB.brother);
console.log(userB.brother.name);
console.log(userB.brother['job']);

const family = [userA, userB];
console.log(family);
console.log(family[0].name); // 점 표기법이 좀 더 명시적. 사용 권장
console.log(family[1]['name']);
