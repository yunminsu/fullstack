import { odd, even } from "./var.mjs"

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
} 

export default checkOddOrEven;
// default export
// 파일 안에서 단 한 번만 쓸 수 있음
// import 시 작명 가능