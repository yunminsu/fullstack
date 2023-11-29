// 서버 코드는 응답을 보내는 라우터 위주로 공부

const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.render('mongoose', { users }); // DB에서 찾아온 데이터를 mongoose.ejs에 넘겨서 렌더링 { 확장자 .ejs는 생략 가능 }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
