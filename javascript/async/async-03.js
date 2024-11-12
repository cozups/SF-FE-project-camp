/** async & await */
const a = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1);
      resolve();
    }, 1000);
  });
};

const b = () => console.log(2);

a().then(() => {
  b();
});

/** a() 함수는 Promise 인스턴스를 반환하는 비동기로 만들어진 코드이고
 * resolve 실행까지 기다렸다가 다음 코드를 진행하는데
 *
 * await이라는 키워드는 뒤쪽에 있는 비동기 함수의 실행을 기다린다는 의미를 가지고 있다.
 * 단, await 키워드를 사용하려면 반드시 분명하게 async를 사용하는 함수 안에서만 사용되어야 한다.
 * async와 await은 꼭 세트로 같이 사용해야 한다.
 *
 * 주의할 점은 await이라는 키워드는 console.log()와 같은 단순히 값을 출력하는 동기 함수 등에 붙여서 사용하면 안된다.
 * console.log()는 Promise 인스턴스를 반환하지 않기 때문이다.
 * 따라서, async/await은 Promise를 반환하는 함수에서만 사용해야 한다.
 */

const fn = async () => {
  await a(); // a()는 Promise를 반환하므로 await을 사용할 수 있다.
  b();
};

fn();
