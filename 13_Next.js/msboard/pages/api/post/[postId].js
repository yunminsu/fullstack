import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await connect;
  const db = await client.db('board');

  if (req.method === 'DELETE') {
    try {
      const { postId } = req.query;
  
      const result = await db.collection('post').deleteOne({ 
        _id: new ObjectId(postId) 
      })

      if (result.deletedCount === 0) {
        throw new Error('삭제 실패');
      }

      res.json({
        flag: true,
        message: '삭제 성공!'  
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        flag: true,
        message: err.mesaage  
      });
    }
  }
}