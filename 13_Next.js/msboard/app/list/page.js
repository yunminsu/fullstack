import { connect } from "@/database";
import ListItem from "./ListItem";

export default async function List() {
  // (참고) DB 입출력 코드는 server 컴포넌트에서만 쓰기
  const client = await connect
  const db = await client.db('board');
  const posts = await db.collection('post').find().toArray();

  return (
    // <div className="list-bg">
    //   <div className="list-item">
    //     <h4>글 제목</h4>
    //     <p>글 내용</p>
    //   </div>
    //   <div className="list-item">
    //     <h4>글 제목</h4>
    //     <p>글 내용</p>
    //   </div>
    //   <div className="list-item">
    //     <h4>글 제목</h4>
    //     <p>글 내용</p>
    //   </div>
    // </div>
      
    // { Quiz: 반복 렌더링 + 데이터 바인딩 }
    <div className="list-bg">
      {posts.map(post => {
        return (
          // { 객체를 문자열로 반환하는 객체 내장 메서드 toString() }
          // <div key={post._id.toString()} className="list-item">
          //   <h4>{post.title}</h4>
          //   <p>{post.content}</p>
          // </div>

          // Quiz: ListItem 컴포넌트로 추출
          <ListItem key={post._id.toString()} post={post} />
        );
      })}

    </div>
  );
}

// 글 목록 기능 만들기
// 1) /list로 접속 시 글 목록 페이지
// /app/list/page.js
// 2) DB에서 글 목록 가져오기