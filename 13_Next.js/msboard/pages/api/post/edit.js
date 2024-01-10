import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await connect;
  const db = await client.db('board');

  if (req.method === 'GET') {
    res.json({ message: 'GET 요청!' });
  } else {
    const { id, title, content } = req.body;
    await db.collection('post').updateOne({ 
      _id: new ObjectId(id) 
    }, { 
      $set: { title, content } 
    });
    res.redirect(302, '/list');
  }
}