import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "ID missing" });

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gifu7744", // ←環境に応じて
    database: "tire_db",
  });

  try {
    await connection.query("DELETE FROM tires WHERE id = ?", [id]);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting", error });
  } finally {
    await connection.end();
  }
}
