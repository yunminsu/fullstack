export default function Write() {
  return (
    <div className="p-20">
      <h4>글쓰기</h4>
      <form id="write-form" action="/api/post" method="POST">
        <label>제목</label>
        {/* name 속성이 있어야 req.body 안에 들어감 */}
        <input type="text" id="title" name="title" />
        <label>내용</label>
        <input type="text" id="content" name="content" />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

// 글 작성 기능 만들기(feat. Next.js에서 서버 기능 만들기)
// 1) 글 작성 페이지
// 2) 작성한 글을 서버로 전송
// 3) 서버에서 검사 후 DB에 저장

// API Routes 방식(참고: 최신 버전에서는 Route Handlers 방식으로 대체)
// api 코드이 폴더 구조
// /pages/api/test.js => /api/test로 HTTP 요청을 보내면 test.js 안의 코드가 실행됨
// (실습)
// 1) 브라우저로 GET 요청 테스트
// /api/test
// 2) query string 테스트 { pages\api\test.js에서 확인 }
// /api/test?name=kim&age=20
// 3) URL 파라미터 테스트 { pages\api\test\[id].js에서 확인 }
// /api/test/12345

// [quiz1]
// /api/list로 GET 요청하면 DB에 있는 post 컬렉션의 모든 데이터 보내주기
// [quiz2]
// /api/post로 POST 요청하면 글 작성 기능 완성하기