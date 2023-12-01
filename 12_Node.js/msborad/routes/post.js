const express = require('express');
const { ObjectId } = require('mongodb');

const { client } = require('../database')
const db = client.db('board'); // board 데이터베이스에 연결

const router = express.Router();

// 글 목록 기능 만들기
// GET /post 라우터
router.get('/', async (req, res) => { // { db 호출은 비동기 이므로 async/await 사용 }
  const posts = await db.collection('post').find({}).toArray(); // 컬렉션의 모든 document를 출력하는 법 
  console.log(posts);

  // 글 목록 페이지 만들어서 웹페이지에 서버(DB) 데이터 꽂아 넣기 => 템플릿 엔진 사용
  // res.render('list');
  
  // 서버 데이터를 ejs 파일에 넣으려면
  // 1) ejs 파일로 데이터 전달
  // 2) ejs 파일 안에서 <%= 데이터 %>
  // 3) ejs 문법으로 HTML 안에서도 JS 사용하려면 <% 자바스크립트 코드 %>
  res.render('list', { posts }); // { 두번째 인자로 넘길값 객체로 넘기기}
});

// 글 작성 기능 만들기
// 사용자가 작성한 글을 DB에 저장해주기
// 1) 글 작성 페이지에서 작성한 내용을 서버로 전송
// 2) 서버는 전달받은 내용을 검사(유효성 검사)
// 프론트와 더불어 이중 체크 해주면 좋음
// => 프론트엔드 코드 및 데이터는 위조가 가능하기 때문
// => 또는 POSTMAN 같은 툴을 써서 요청을 보내면 프론트의 유효성 검사를 안거침
// 3) 이상이 없으면 DB에 저장

// GET /post/write 라우터
router.get('/write', (req, res) => {
  res.render('write');
});

router.post('/write', async (req, res, next) => {
  console.log(req.body); // 클라이언트가 보낸 데이터 -> 요청 본문에 담김 -> body-parser가 분석해서 req.body에 객체로 저장

  // Quiz: DB에 저장하기
  // DB 예외 처리
  try {
    const title = req.body.title;
    const content = req.body.content;

    // 유효성 검사 추가하기
    // 제목이 비어있으면 저장 안함
    if (!title) {
      res.json({
        flag: false,
        message: '제목을 입력하세요'
      });
    } else {
      await db.collection('post').insertOne({ title, content, view: 0 });

      // 동기식 요청이면 다른 페이지로 이동
      // res.redirect('/post');

      // 비동기식(Ajax) 요청이면 성공 데이터와 함께 응답
      // 응답으로 redirect와 render는 사용 안하는게 좋음
      res.json({ // { 서버에 객체 형태로 데이터를 보냄 }
        flag: true,
        message: '등록 성공'
      });
    }
  } catch (err) {
    // (참고) 예외처리는 정답이 없음, 회사/팀의 룰 또는 기획 의도에 따라 달라짐
    err.status = 500;
    next(err);
  }
});

// 글 상세보기 만들기
// /post/글id 입력하면 해당 글의 상세페이지를 보여줌
// 1) /post/글id 요청 보내기
// 2) { _id: 글id } 조건으로 글을 DB에서 찾아서
// 3) 해당 글을 ejs 파일에 꽂아서 보내줌 

// Get /post/:id 라우터
router.get('/:id', async (req, res, next) => {
  // res.render('detail');

  // DB에서 글 가져오기
  // 테스트
  // const post = await db.collection('post').findOne({ _id: '656837a7cc60373661af3d72' });
  // console.log(post); // _id에 문자열 쓰는건 몽구스에서만 가능
  // const post = await db.collection('post').findOne({ _id: new ObjectId('656837a7cc60373661af3d72') }); // ObjectId 객체로 만듦 { 몽구스에서는 자동으로 객체로 넘겨 줬는데 몽고디비는 객체화 시켜야함(담겨 있을때 객체로 담겨있어서..) }
  // console.log(post);  
  
  // 예외 처리 하기
  // 1) url 잘못 입력 시
  // 2) 데이터를 못찾을 시(잘못된 id) => null을 반환 { find 했을 때 }
  try {
    // 실제: 라우트 매개변수에 입력한 값
    const post = await db.collection('post').findOne({ _id: new ObjectId(req.params.id) });
    console.log(post);  

    // 2) 번에 대한 예외 처리
    if (!post) {
      const error = new Error('데이터 없음');
      error.status = 404; 
      next(error);
    } else {
      await db.collection('post').updateOne({ _id: new ObjectId(req.params.id) }, {
        $inc: { view: 1 }
      })
    }

    
  
    // Quiz: 데이터 꽂아서 보내고 바인딩하기
    res.render('detail', { post });
  } catch (err) { // 1) 번에 대한 예외 처리
    err.message = '잘못된 url 입니다.';
    err.status = 400; // 응답코드 400번대는 클라이언트 에러 { 500번대는 서버, 200번대는 성공 }
    // 400: 유저의 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없을 때
    next(err);
  }
});

// 글 수정 기능 만들기
// 1) 수정 버튼 누르면 수정 페이지로
// 2) 수정 페이지에는 기존 글이 채워져있음
// 3) 전송 누르면 입력한 내용으로 DB 글 수정
// a, form 태그 사용 시 단점: 동기식이라 새로고침 발생 => 비동기식 Ajax 방식 사용해보기

router.get('/edit/:id', async (req, res, next) => {
  // DB에서 글 가져오기
  try {
    const post = await db.collection('post').findOne({ _id: new ObjectId(req.params.id) });
    // console.log(post);  

    if (!post) {
      const error = new Error('데이터 없음');
      error.status = 404; 
      next(error);
    }
    
    res.render('edit', { post });
  } catch (err) { 
    err.message = '잘못된 url 입니다.';
    err.status = 400; 
    next(err);
  }
});

// PATCH /post/:id 라우터
router.patch('/:id', async (req, res) => {
  console.log(req.body);

  try {
    const title = req.body.title;
    const content = req.body.content;

    // 어떤 document를 찾아서 어떤 내용으로 수정할지 인자값 2개 전달
    if (!title) {
      res.json({
        flag: false,
        message: '제목을 입력하세요'
      });
    } else {
      await db.collection('post').updateOne({ 
        _id: new ObjectId(req.params.id) 
      }, { 
        $set: { title, content } // { 원래 몽고디비는 set안 넣으면 데이터가 통째로 바꼈는데 버전이 업그레이드 되면서 에러나게 바뀜 }
      });

      res.json({
        flag: true,
        message: '수정 성공'
      });
    }
  } catch (err) {
    console.error(err);

    // 보통 CSR 방식으로 개발 시 응답으로 json 데이터를 내려줌
    res.json({
      flag: false,
      message: '수정 실패'
    });
   }
  });

// 글 삭제 기능 만들기
// 1) 글 삭제 버튼 누르면 해당 글 삭제 요청 보내기
// 2) 서버는 확인 후 해당 글을 DB에서 삭제
// router.delete('/:id', async (req, res) => {
//   try {
//     await db.collection('post').deleteOne({ _id: new ObjectId(req.params.id) })
//     res.json({
//       flag: true,
//       message: '삭제 성공'
//     });
//   } catch (err) {
//     console.error(err);
//     res.json({
//       flag: false,
//       message: '삭제 실패'
//     });
//   }
// });

// { status로 응답 관리 } 
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('post').deleteOne({ _id: new ObjectId(req.params.id) })
    res.json({
      flag: true,
      message: '삭제 성공'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '삭제 실패'
    });
  }
});

// (정리) 서버로 데이터 보내는 방법
// 1) form 태그
// 2) Ajax 방식
// 3) 라우트 매개변수(URL 파라미터)
// 4) 쿼리스트링

module.exports = router;