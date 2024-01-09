import { connect } from "@/database";
import { ObjectId } from "mongodb";
import { useParams } from "next/navigation";

export default async function Detail(props) {
  // { [] 안에 담긴값은 props로 받아옴 지금은 [postId]로 작명 했으니 postId로 넘어옴 }
  // { 구조 분해 할당은 개발자 취향 (의미론적으로 쓰면 더 좋을듯) }
  // const { params: { postId } } = props; 
  const { params } = props;

  const client = await connect;
  const db = await client.db('board');
  const post = await db.collection('post').findOne({ _id: new ObjectId(params.postId) }); // { 한개 찾아 올 경우 .toArray()를 할 필요 없음}

  return (
    <div>
      <h4>상세 페이지</h4>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
    </div>
  );
}