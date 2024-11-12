/** resolve, reject, 에러 핸들링 */

const delayAdd = (index, callback, error) => {
  setTimeout(() => {
    if (index > 10) {
      error(`${index}는 10보다 클 수 없습니다.`);
      return;
    }
    console.log('index: ', index);
    callback(index + 1);
  }, 1000);
};

delayAdd(
  4,
  (res) => console.log(res),
  (err) => console.log(err)
);

delayAdd(
  13,
  (res) => console.log(res),
  (err) => console.log(err)
);

/** 에러 핸들링
 * 정상적으로 로직이 동작하게 되면 두 번째 인수 콜백이 실행되고
 * 정상적으로 로직이 동작하지 않으면 세 번째 인수 콜백이 샐행되는 구조
 */

const newDelayAdd = (idx) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (idx > 10) {
        reject(`${idx}는 10보다 클 수 없습니다.`);
        return;
      }
      console.log('index: ', idx);
      resolve(idx + 1);
    }, 1000);
  });
};

/** Promise 인스턴스를 반환하기 때문에 then 메서드 사용 가능
 * finally 메서드나 구문은 비동기 코드 내부의 resolve, reject가 실행되는 것과 상관없이 항상 실행된다.
 */
newDelayAdd(9)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally((done) => console.log('Done!'));

const wrap = async () => {
  try {
    const res = await newDelayAdd(9);
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    //  finally 메서드나 구문은 비동기 코드 내부의 resolve, reject가 실행되는 것과 상관없이 항상 실행된다.
    console.log('Done!!!');
  }
};

wrap();
