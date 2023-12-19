const express = require('express');

const router = express.Router();

const app = express();

// GET / 라우터
router.get('/', (req, res) => {
  res.send('Hello, Express');

  // (참고) req 객체를 통해 app 객체에 접근 가능 { req, res의 객체들 살펴봐서 필요한 값 적절히 활용하기 }
  console.log(req.app.get('port'));
  console.log(res.app.get('port'));
  console.log(app.get('port')); // { undefined, app.js와 별도로 index.js에서 새로운 app 객체를 만든것 }
});

module.exports = router;