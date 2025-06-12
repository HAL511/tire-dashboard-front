import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { 車番, 顧客名, サイズ, メーカー, MIX, STL, 溝, 作業日, 備考 } = req.body;

  if (!車番 || !顧客名) {
    return res.status(400).json({ message: "車番・顧客名は必須です" });
  }

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gifu7744",
    database: "tire_db",
  });

  try {
    await connection.query(
      `INSERT INTO tires (車番, 顧客名, サイズ, メーカー, MIX, STL, 溝, 作業日, 備考) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [車番, 顧客名, サイズ, メーカー, MIX, STL, 溝, 作業日, 備考]
    );
    res.status(200).json({ message: "Created successfully" });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Create failed", error });
  } finally {
    await connection.end();
  }
}
