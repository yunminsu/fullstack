import checkNumber from "./func.mjs";
import { odd, even } from "./var.mjs";


function checkStringOddOrEven(str) {
    if (str.length % 2) { // 홀수면
      return odd;
    }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));