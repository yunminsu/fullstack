import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const { params } = props;

  const client = await connect;
  const db = await client.db('board');
  const post = await db.collection('post').findOne({ _id: new ObjectId(params.postId) }); // { 한개 찾아 올 경우 .toArray()를 할 필요 없음}

  return (
    <div className="p-20">
      <h4>수정하기</h4>
      <form id="write-form" action="/api/post/edit" method="POST">
        <input type="hidden" name="id" defaultValue={post._id.toString()} />
        <label>제목</label>
        {/* name 속성이 있어야 req.body 안에 들어감 */}
        <input type="text" id="title" name="title" defaultValue={post.title} />
        <label>내용</label>
        <input type="text" id="content" name="content" defaultValue={post.content} />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

// [quiz]
// /api/post/edit로 POST 요청하면 글 수정 기능 완성하기