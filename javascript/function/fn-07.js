/** this
 * 일반 함수의 this는 호출 위치에서 정의가 된다.
 * 화살표 함수의 this는 자신이 선언된 함수(렉시컬) 범위에서 정의
 * 렉시컬: 함수가 동작할 수 있는 유효한 범위
 */

const user = {
  firstName: 'Miso',
  lastName: 'Kim',
  age: 28,
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};
console.log(user.getFullName()); // Miso Kim

const user2 = {
  firstName: 'Miso',
  lastName: 'Kim',
  age: 28,
  getFullName: () => {
    return `${this.firstName} ${this.lastName}`;
  },
};
console.log(user2.getFullName()); // undefined undefined

function user3() {
  this.firstName = '길동';
  this.lastName = '홍';

  return {
    firstName: 'Miso',
    lastName: 'Kim',
    age: 28,
    getFullName: () => {
      return `${this.firstName} ${this.lastName}`;
    },
  };
}
console.log(user3().getFullName()); // 길동 홍
