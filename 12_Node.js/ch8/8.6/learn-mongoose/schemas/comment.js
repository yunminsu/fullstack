const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({ 

  commenter: {
    // type: mongoose.Schema.Types.ObjectId, // { 밑에 구조 분해 할당 하기 전 }
    type: ObjectId, // ObjectId는 몽고디비의 데이터 타입
    required: true,
    ref: 'User', // 어떤(users) 컬렉션의 ObjectId인지 관계 설정 => JOIN 같은 기능을 사용할 수 있음
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // 기본값은 현재 시간으로
  }
});

// 몽구스는 자동으로 복수형으로 변경하고 소문자로 변환한 후 이를 데이터베이스 컬렉션 이름으로 사용
module.exports = mongoose.model('Comment', commentSchema); // 'Comment'는 comments 컬렉션으로 변환됨 { 꼭 이렇게 써야 변환됨 }