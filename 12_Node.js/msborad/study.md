# 로그인 구현 순서

1. 패스포트 라이브러리 설치

2. /app.js에서 패스포트 require/index.js 가져오기, 패스포트 설정/미들웨어 실행
  - 패스포트 설정 실행: /passport/index.js 에서 exports한 함수 실행
  - 미들웨어 실행: app.use(passport.initialize());
                  app.use(passport.session());   

3. routes/user.js에서 로그인 로그아웃 라우터 작성
  - router.get: login page render
  - router.post: 로그인 전략이 성공하거나 실패하면 실행될 error code 및 
                 로그인 완료 시 실행할 코드 작성

4. /passport/index.js, localStrategy.js 작성
  - index.js
    1) 세션 만들고 쿠키 전달 코드 작성
    2) 세션에 저장할 데이터 저장
    3) 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보를 조회
    4) 조회한 정보를 req.user에 저장

  - localStrategy.js
    1) 전략 옵션 설정
    2) 사용자가 입력한 아이디, 비밀번호를 검사
    3) 사용자가 입력한 비밀번호 해싱 후 DB에 저장된 비밀번호를 비교
    4) 일치 할 때 유저 정보를 넘김

5. /views/login.ejs 작성

6. /app.js에서 res.lcals.user 속성에 req.user 정보 넣는 미들웨어 작성

7. 아무 템플릿에서 user.username 등으로 데이터 사용
