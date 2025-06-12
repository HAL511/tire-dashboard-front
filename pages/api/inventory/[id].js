// pages/api/inventory/[id].js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gifu7744',
    database: 'tire_db',
  });

  try {
    if (method === 'GET') {
      const [rows] = await connection.execute(
        'SELECT * FROM tires WHERE 車番 = ?',
        [id]
      );
      if (rows.length === 0) {
        res.status(404).json({ message: 'Not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } else if (method === 'PUT') {
      const data = req.body;
      console.log("PUT受信データ:", data);
      await connection.execute(
        `UPDATE tires SET サイズ=?, メーカー=?, \`シリアル（年号）\`=?, STL=?, MIX=?, 履き潰し=?, 使用=?, \`溝（ミリ数）\`=?, 本数=?, 廃棄=?, 作業日=?, 備考=? WHERE 車番=?`,
        [
          data.サイズ,
          data.メーカー,
          data['シリアル（年号）'],
          data.STL,
          data.MIX,
          data.履き潰し,
          data.使用,
          data['溝（ミリ数）'],
          data.本数,
          data.廃棄,
          data.作業日,
          data.備考,
          id,
        ]
      );
      res.status(200).json({ message: 'Updated successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await connection.end();
  }
}
