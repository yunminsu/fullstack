import Comment from "./Comment";

const comments = [
  {
    name: '홍길동',
    content: '안녕하세요. 반갑습니다.'
  },
  {
    name: '시라소니',
    content: '아뵤~'
  },
  {
    name: '곽두식',
    content: '머리아파요..'
  },
  {
    name: '삼식이',
    content: '리액트 너무 어려워요!!'
  }
];

// 댓글들을 포함하는 컴포넌트
function CommentList(props) {
  return (
    <div>
      {/* Quiz: props를 추가하여 name과 content 값 전달 */}
      {/* <Comment name='홍길동' content='안녕하세요. 반갑습니다.'/>
      <Comment name='시라소니' content='아뵤~'/>
      <Comment name='곽두식' content='머리아파요..'/> */}

      {/* 배열을 동적으로 랜더링해야 할 때에는 배열의 map() 함수를 사용 
      (map(): 배열 안에 있는 각 요소를 이용하여 새로운 배열을 만듦 
      일반 데이터 배열을 리액트 엘리먼트 이루어진 배열로 만들면 됨
      */}
      {comments.map((comments, index) => {
        return (
          <Comment key={index} name={comments.name} content={comments.content}/>
        );
      })}

      {/* map() 함수의 결과 */}
      {[
        <Comment key={0} name='홍길동' content='안녕하세요. 반갑습니다.'/>,
        <Comment key={1} name='시라소니' content='아뵤~'/>,
        <Comment key={2} name='곽두식' content='머리아파요..'/>,
        <Comment key={3} name='삼식이' content='리액트 너무 어려워요!!'/>
      ]}

      {/* 코드 단축 시 */}
      {comments.map((comments, index) => <Comment key={index} name={comments.name} content={comments.content}/>)}
    </div>
  );
}

export default CommentList;