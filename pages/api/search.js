import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { keyword } = req.query;

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gifu7744',
    database: 'tire_db',
  });

 const [rows] = await connection.execute(
  `SELECT 車番, 顧客名, サイズ, メーカー, \`溝（ミリ数）\`, 作業日, 備考 FROM tires WHERE 顧客名 LIKE ? OR 車番 LIKE ?`,
  [`%${keyword}%`, `%${keyword}%`]
);



  await connection.end();
  res.status(200).json(rows);
}
