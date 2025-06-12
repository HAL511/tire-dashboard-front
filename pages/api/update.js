import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, サイズ, メーカー, 溝, 作業日, 備考, MIX, STL } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gifu7744", // ←環境に合わせて
    database: "tire_db",   // ←ご自身のDB名に変更可能
  });

  try {
    await connection.query(
      `UPDATE tires SET サイズ = ?, メーカー = ?, 溝 = ?, 作業日 = ?, 備考 = ?, MIX = ?, STL = ? WHERE id = ?`,
      [サイズ, メーカー, 溝, 作業日, 備考, MIX, STL, id]
    );
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Update failed", error });
  } finally {
    await connection.end();
  }
}
