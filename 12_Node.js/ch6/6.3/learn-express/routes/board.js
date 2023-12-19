const express = require('express');

const router = express.Router();

router.get('/sub/notice', (req, res) => {
  res.send('공지사항 게시판');
});

router.get('/sub/qna', (req, res) => {
  res.send('문의 게시판')
});

// 매개변수 적용 해보기
router.get('/sub/:category', (req, res) => {
  res.send(`${req.params.category} 게시판`);
});

module.exports = router;