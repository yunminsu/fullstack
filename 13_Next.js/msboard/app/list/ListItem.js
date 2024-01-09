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
