import { connect } from "@/database";
import ListItem from "./ListItem";
import list from "@/pages/api/list";

// 특수한 목적의 예약된 변수명
// dynamic: 렌더링 전략 지정 가능
export const dynamic = 'force-dynamic'; // Dynamic 렌더링을 해줌 { dynamic 변수명 틀리면 안됨, 지정되어있는 예약어임 }

export default async function List() {
  // (참고) DB 입출력 코드는 server 컴포넌트에서만 쓰기
  const client = await connect
  const db = await client.db('board');
  let posts = await db.collection('post').find().toArray();

  // 경고 해결하기: Only plain objects can be passed to Client Components from Server Components.
  posts = posts.map((post) => { // { 3) 바꾼 값을 다시 기존 배열에 담아줌 그래서 위에서 let으로 선언함 }
    post._id = post._id.toString(); // { 1) _id값은 알수없는(?) 객체여서 에러가 뜸 이를 문자열 혹은 숫자로 바꿔줌 }
    post.user = post.user?.toString();
    // { 전 예제에서는 user값 까지 받았는데 현 예제는 user가 없으므로 에러를 피하려면 '?' 옵셔널 체이닝 사용 }
    return post; // { 2) map은 return을 해줘야지만 변경된 값을 새로운 배열에 추가 }
  });

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