const express = require('express');

const router = express.Router();

router.get('/shirts', (req, res) => {
  res.send('셔츠 판매 페이지');
});

router.get('/pants', (req, res) => {
  res.send('바지 판매 페이지')
});

// 매개 변수 적용해보기
router.get('/:category', (req, res) => {
  res.send(`${req.params.category} 판매 페이지`)
});

module.exports = router;