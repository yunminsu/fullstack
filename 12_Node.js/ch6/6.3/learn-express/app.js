// Quiz1: 프로젝트 세팅해보기
// dotenv 설정
// app 관련 설정들(전역속성) 설정
// 공통 미들웨어 설정(morgan, static, body-parser, cookie-parser, express-session)
// 기본 '/' 라우터 작성
// 404 처리 및 에러 처리 미들웨어
// 서버 연결
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// 라우터 가져오기
const indexRouter = require('./routes'); // indexRouter 가져오기(/index는 생략 가능)
const userRouter = require('./routes/user'); // userRouter 가져오기
const shopRouter = require('./routes/shop'); // { Quiz2 }
const boardRouter = require('./routes/board'); // { Quiz2 }

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

// 라우터 분리하기
// 개발을 하다보면 app.get(), app.post() 등이 계속 늘어나는데
// 이걸 app.js 같은 하나의 파일에 계속 쓰다보면 코드가 길어지고 복잡해짐(=코드 수정 및 유지보수 어려움)
// 라우터(API)들을 다른 파일로 추출하는 것이 좋음
// 1) routes 폴더 생성
// 2) '/', '/user'로 들어오는 요청을 모아놓을 파일 생성
// 3) router 설정 -> 라우터(API) 작성(이 때 app을 전부 router로 변경)
// 4) router 내보내기(module.exports) -> app.js에서 가져오기(require)

// GET / 라우터
// app.get('/', (req, res) => {
//   res.send('Hello, Express');
// });

// 분리한 라우터들을 미들웨어로 등록
app.use('/', indexRouter); // '/'로 요청이 들어오면 indexRouter로
app.use('/user', userRouter); // '/user'로 요청이 들어오면 userRouter로
app.use('/shop', shopRouter); // { Quiz2 }
app.use('/board', boardRouter); // { Quiz2 }

// Quiz2: 
// 1) 아래 라우터(API)들을 분리해보기(다른 파일로 추출)
// 2) 라우트 매개변수 적용해보기

// app.get('/shop/shirts', (req, res) => {
//   res.send('셔츠 판매 페이지');
// });
// app.get('/shop/pants', (req, res) => {
//   res.send('바지 판매 페이지');
// });

// app.get('/board/sub/notice', (req, res) => {
//   res.send('공지사항 게시판');
// });
// app.get('/board/sub/qna', (req, res) => {
//   res.send('문의 게시판');
// });

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});