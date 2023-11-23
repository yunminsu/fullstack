const http = require('http');

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie); // 쿠키의 데이터 타입은 문자열
  // 응답 헤더에 작성
  // res.writeHead(200, { 'Set-Cookie': 'mycookie=test' }); // {Set-Cookie 는 mycookie=test 라는걸} 브라우저에 쿠키를 설정하라고 명령
  res.writeHead(200, { 'Set-Cookie': ['mycookie=test', 'name=rm'] }); // 여러 개는 배열로 작성
  res.end('Hello Cookie')
})
  .listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
  });

// { 어떤 쿠키 값이 요청하는지 확인: 개발자도구 -> Network탭 -> localhost -> Headers탭 -> Response Headers/Set-Cookie 
//   쿠키 담기고 난 후 확인: Request Headers/Cookie 
//   Application탭에서 확인: Storage/Cookies }
// 처음 접속 시와 쿠키를 한 번 받고난 뒤 요청 헤더 비교
// 브라우저가 자동으로 쿠키를 서버로 전달하는 것 확인!

// (참고)
// /favicon.ico는 크롬 브라우저가 알아서 보내는 요청
// Session cookie는 브라우저를 닫으면 사라짐(크롬 기준 탭이 아닌 브라우저 전체) 