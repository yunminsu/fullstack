// const value = require('./var');
// console.log(value);

const { odd, even } = require('./var'); // 구조 분해 할당

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even; // { 불 필요한 else는 생략 }
}

module.exports = checkOddOrEven; // { checkOddOrEven() <- 괄호 치면 그냥 함수 실행 onClick도 마찬가지 }