'use client'

import Link from "next/link";
import DetailButton from "./DetailButton";

export default function ListItem({ post }) { // { (props)로 받아도 되고, 지금처럼 바로 구조 분해 할당해도 됨 }
  return (
    <div className="list-item">
      {/* 페이지를 이동하는 방법(1) - Link 컴포넌트 */}
      {/* Quiz: Link 컴포넌트를 사용하여 '/detail/글id'로 이동 */}
      {/* { 아래 경우에 `/detail/${post._id.toString()}`을 하지 않아도 되는 이유는 } */}
      {/* { post._id가 '' 문자열로 합쳐지는 순간 문자로 변환됨 그래서 굳이 toString()을 쓰지 않아도 됨  } */}
      <h4>
        <Link href={`/detail/${post._id}`}>{post.title}</Link>
      </h4>
      
      {/* 페이지를 이동하는 방법(2) - useRouter */}
      <DetailButton postId={post._id.toString()} />

      {/* 수정 버튼 */}
      <Link href={`/edit/${post._id}`}>📝</Link>

      {/* 삭제 버튼 */}
      <span className="cursor-pointer" >🗑</span>

      <p>{post.content}</p>
    </div>
  );
}

// 상세 페이지 만들기
// 1) 글 제목을 누르면 상세 페이지로 이동
// 2) DB에서 해당 게시글 가져와서 보여주기
// => 이때 상세 페이지 URL은? /detail/123 {(id값)}
// => app/detail 폴더 안에 여러 폴더 만들면 비효율적
// => React: URL 파라미터, Express: 라우트 파라미터
// => Next.js: Dynamic Routes 사용 -> 파일 또는 폴더 이름을 대괄호로 묶어 생성 [] {(id값)을 받아오기 위해서 사용}
// 그 외
// \[변수명1]\[변수명2]\[변수명3] { 예: /detail/123/456 을 만들고 싶으면 detail 폴더 안에 [123] 폴더 안에 [456] }
// [...변수명]: Catch-all { 예: /detail/postId/123/abc/ 에서 postId 뒤에 오는 값을 다 받고 싶다 [...postId] }
// [[...변수명]]: Optional Catch-all
// { 위 그외들 이해 해보기: https://velog.io/@jay/Next.js-13-master-course-routing-3 }

// 글 수정 기능 만들기
// 1) 수정 버튼 누르면 글 수정 페이지로 이동
// 2) 글 수정 페이지에서 DB에서 가져온 내용을 채워넣기
// 3) 수정 버튼 누르면 DB에 있는 글 수정

// 글 삭제 기능 만들기
// 프론트단 JS 기능을 쓰려면 client 컴포넌트에서만 가능
// list/page.js 파일을 전부 client 컴포넌트로 바꾸는 것보다 필요한 일부분만 바꾸는게 나음
// => 전체를 바꿔버리면 검색 노출에 이점이 없음
// 즉, 큰 페이지는 server 컴포넌트로 두고 필요한 부분만 client 컴포넌트로 추출

// 1) /list/ListItem.js 로 컴포넌트 추출
// 2) 글 데이터를 가져오는 2가지 방법
// - 부모(server 컴포넌트)에서 DB데이터를 꺼내와서 자식(client 컴포넌트)에게 props로 전달(권장)
// - client 컴포넌트에서 useEffect + axios를 사용하여 서버로 DB데이터 요청
//   - 단점: 검색 노출이 잘 안될 수 있음
//   - useEffect를 쓰면 HTML 렌더링 이후에 실행되기 때문에 페이지 방문 시 텅 빈 HTML이 먼저 보임
//   - 검색엔진 봇이 방문 시 수집할 데이터가 없어 수집이 느림