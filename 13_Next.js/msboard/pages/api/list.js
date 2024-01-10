import { connect } from "@/database";

export default async function handler(req, res) {
  const client = await connect;
  const db = await client.db('board');
  const posts = await db.collection('post').find().toArray();

  if (req.method === 'GET') {
    res.json(posts);
  } else {
    res.json({ message: 'POST 요청!' });
  }
}