const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { client } = require('../database')

const router = express.Router();
const db = client.db('board'); // board 데이터베이스에 연결

// 회원 기능 만들기(가장 범용적이고 전통적인 session 방식)
// 1) 회원 가입 기능
// 2) 로그인 기능(DB에 있는 데이터와 일치하는지 비교)
// 3) 로그인 성공 시 세션 만들기
// 4) 로그인 완료 시 사용자에게 세션 ID가 담긴 쿠키(세션 쿠키)를 보내줌
// 브라우저 쿠키 저장소에 저장
// 5) 로그인이 필요한 곳(예: 마이페이지)에서 로그인 여부 확인하고 로그인 상태이면 페이지를 내려줌

// 로그인, 로그아웃을 직접 구현할 수도 있지만
// 세션과 쿠키 처리 등 복잡한 작업이 많으므로 검증된 모듈 사용
// passport 라이브러리, 이름처럼 우리의 서비스를 사용할 수 있게 해주는 여권 같은 역할

// passport 관련 패키지 설치
// npm install passport passport-local
// passport: 회원 인증 메인 라이브러리
// passport-local: 아이디, 비번을 이용한 세션 인증 방식으로 회원 인증하는 서브 라이브러리
// (참고) passport 이용 시 JWT, 소셜 로그인 구현도 가능

// GET /user/register 라우터
router.get('/register', (req, res) => {
  res.render('register');
});

// Quiz: 회원 가입 기능 만들기
// 1) 회원 가입 페이지 만들기
// 2) 서버는 전송받은 아이디, 비번을 user 컬렉션에 저장
// /public/js/register.js 작성
// POST /user/register 라우터 작성
router.post('/register', async (req, res) => {
  try {
    // const username = req.body.username;
    // const password = req.body.password;
    // { 위 코드 구조 분해 할당 }
    const { username, password } = req.body;
    
    // 비번을 그냥 넣을 때
    // await db.collection('user').insertOne({ 
      //   username, 
      //   password
      // });

    // 회원 가입 예외 처리 추가
    // 기존에 같은 아이디로 가입한 사용자가 있으면 에러 처리
    // username이 이미 DB에 있는지 조회
    const existUser = await db.collection('user').findOne({ username });

    // { 작성한 아이디 값이 이미 DB에 있을때 existUser값이 true이므로 일부러 에러처리를 발생하여 catch문으로 던짐 }
    if (existUser) {
      throw new Error('존재하는 사용자');
    }

    // 비번을 해싱{(암호화)}해서 저장해보기
    // npm install bcrypt 설치 후 가져오기
    // 두번째 인자값: 해싱을 얼마나 복잡하게 할지
    // 숫자가 커질수록 비밀번호를 알아내기 어려워지지만 암호화 시간도 오래 걸림
    const hash = await bcrypt.hash(password, 12); // 최소 10 이상 추천, 31까지 사용 가능
    await db.collection('user').insertOne({ 
      username, 
      password: hash
    });

    res.json({
      flag: true,
      message: '회원 가입 성공'
    });
  } catch (err) {
    console.error(err);
    res.json({
      flag: false,
      message: err.message 
    });
  }
});

// 로그인, 로그아웃 라우터 작성
// GET /user/login
router.get('/login', (req, res) => {
  res.render('login');
});

// POST /user/login
router.post('/login', (req, res, next) => {
  // 전송 받은 아이디, 비번이 DB에 있는지 확인하고 있으면 세션 만들기
  // 이 과정을 직접 만들기보다 passport의 미들웨어를 이용하여 로컬 로그인 전략을 수행
  passport.authenticate('local', (authError, user, info) => { // 전략이 성공하거나 실패하면 실행될 콜백 함수
    // user: 성공 시 로그인한 사용자 정보
    // info: 실패 시 이유
    if (authError) {
      console.error(authError); // 에러 발생 시 에러가 넘어옴
      return res.status(500).json(authError);
    }
    if (!user) return res.status(401).json(info.message);

    req.login(user, (loginError) => { // { req.logIn <- (대문자)도 똑같음 }
      if (loginError) return next(loginError);
      res.redirect('/'); // 로그인 완료 시 실행할 코드 { redirect/render는 동기식에서만 사용 여기서는 동기식으로 실행 } 
    });
  })(req, res, next); // { 쿼링 ? }
});

module.exports = router;
