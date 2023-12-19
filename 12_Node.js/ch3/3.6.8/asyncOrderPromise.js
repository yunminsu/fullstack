const fs = require('fs').promises;

console.log('시작');

fs.readFile('./readme.txt')
.then((data) => {
  console.log('1번', data.toString());
  return fs.readFile('./readme.txt')
})
fs.readFile('./readme.txt')
.then((data) => {
  console.log('2번', data.toString());
  return fs.readFile('./readme.txt')
})
fs.readFile('./readme.txt')
.then((data) => {
  console.log('3번', data.toString());
  return fs.readFile('./readme.txt')
})
fs.readFile('./readme.txt')
.then((data) => {
  console.log('4번', data.toString());
  console.log('끝');
})
.catch((err) => {
  console.error(err);
});
// 프로미스 사용으로 콜백 지옥 해결

// Quiz: async/await로 리팩터링
const main = async () => {
  try {
    
    let data = await fs.readFile('./readme.txt')
    console.log('시작');
    console.log('1번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('2번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('3번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('4번', data.toString());

    console.log('끝');
  } catch (err) {
    console.error(err);
  }
}
main();

// 정리: 비동기 메서드로 순서를 유지하는 방식이 동시성도 살리고 순서도 지키는 좋은 방법