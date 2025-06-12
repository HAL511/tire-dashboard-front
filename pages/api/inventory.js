import mysql from "mysql2/promise";

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "gifu7744",
      database: "tire_db",
    });

    const [rows] = await connection.execute("SELECT * FROM tires");

    console.log("APIレスポンス rows:", rows); // 確認用

    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error("DBエラー:", error);
    res.status(500).json({ error: "Internal Server Error", detail: error.message });
  }
}
