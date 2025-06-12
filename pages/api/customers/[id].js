// pages/api/customers/[id].js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body
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
        'SELECT * FROM customers WHERE id = ?',
        [Number(id)]
      );
      res.status(200).json(rows[0] || {});
    } else if (method === 'PUT') {
      const { 顧客名, 住所, 電話番号 } = body;
      await connection.execute(
        'UPDATE customers SET 顧客名 = ?, 住所 = ?, 電話番号 = ? WHERE id = ?',
        [顧客名, 住所, 電話番号, Number(id)]
      );
      res.status(200).json({ message: '更新成功' });
    } else if (method === 'DELETE') {
      await connection.execute(
        'DELETE FROM customers WHERE id = ?',
        [Number(id)]
      );
      res.status(200).json({ message: '削除成功' });
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('DBエラー:', error);
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  } finally {
    await connection.end();
  }
}
