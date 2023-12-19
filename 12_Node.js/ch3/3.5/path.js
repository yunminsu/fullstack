// path 모듈: 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
// 운영체제별로 경로 구분자가 달라도 쉽게 처리 가능
const path = require('path');

const string = __filename // 현재 파일 경로

console.log('path.sep:', path.sep); // 경로 구분자
console.log('path.delimiter:', path.delimiter); // 환경 변수 구분자

console.log('--------------------------------');
console.log('path.dirname():', path.dirname(string)); // 폴더명 추출
console.log('path.extname():', path.extname(string)); // 확장자 추출
console.log('path.basename():', path.basename(string)); // 파일명 추출
console.log('path.basename - extname:', path.basename(string, path.extname(string))); // 파일명에서 확장자 빼는 방법

console.log('--------------------------------');
console.log('path.parse():', path.parse(string)); // 파일 경로를 각각의 요소들로 분해해서 객체로 나타냄
console.log('path.format():', path.format({ // 객체를 파일 경로로 다시 합치기 { 역슬래시 2개(\\)는 자바스크립트 안에서 역슬래시 1개(\)로 사용됨: 이스케이프 }
  dir: 'C:\\users\\zerocho',
  name: 'path',
  ext: '.js'
}));
console.log('path.normalize():', path.normalize('C:\\users\\\\zerocho\\\path.js')); // 구분자를 실수로 잘못 적어도 경로를 os에 맞춰 정상적으로 만들어줌

console.log('--------------------------------');
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\')); // 절대경로{(C드라이브 부터 접근)}인지 판별
console.log('path.isAbsolute(./home):', path.isAbsolute('./home')); // 절대경로인지 판별 { 상대경로 이므로 false }

console.log('--------------------------------');
console.log(__dirname); // 현재 폴더(디렉터리) 경로
console.log(__dirname + '/test.js'); // { 경로를 역슬래시(/)로 잘못 적음 }
console.log('path.join():', path.join(__dirname, '/test.js')); // /test.js의 절대경로를 무시하고 상대경로로 처리 { join을 쓰면 알아서 경로 구분자를 바꿔줌, 더 많이 씀 }
console.log('path.resolve():', path.resolve(__dirname, '/test.js')); // /test.js를 절대경로로 처리('/'가 있으면 앞에 경로 무시)

console.log('path.relative():', path.relative('C:\\users\\zerocho\\path.js', 'C:\\')); // 첫번째 인자에서 두번째 인자까지의 상대적 위치 알려줌