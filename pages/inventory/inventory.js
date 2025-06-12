import { useEffect, useState } from "react";

export default function InventoryPage() {
  const [tires, setTires] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editData, setEditData] = useState(null); // モーダル表示対象
  const [showModal, setShowModal] = useState(false);

  const columns = [
    "顧客名", "車番", "サイズ", "メーカー", "シリアル（年号）",
    "STL", "MIX", "履き潰し", "使用", "溝（ミリ数）", "本数", "廃棄", "作業日", "備考"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/inventory");
      const data = await res.json();
      setTires(data);
    };
    fetchData();
  }, []);

  const filteredTires = tires.filter((tire) =>
    `${tire.顧客名} ${tire.車番} ${tire.サイズ} ${tire.メーカー} ${tire.備考}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTires.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTires.length / itemsPerPage);

  const openEditModal = (tire) => {
    setEditData({ ...tire });
    setShowModal(true);
  };

  const handleEditChange = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    console.log("保存されるデータ:", editData);
    // 実際は PUT API 呼び出し予定
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">在庫一覧</h1>

      {/* 検索 */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
        <input
          type="text"
          placeholder="検索（顧客名・サイズ・メーカーなど）"
          className="border px-3 py-2 rounded w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* 表 */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((tire, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col}>{tire[col]}</td>
                ))}
                <td>
                  <button
                    className="text-blue-600 mr-2"
                    onClick={() => openEditModal(tire)}
                  >
                    ✏️ 編集
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => alert(`削除：${tire.車番}`)}
                  >
                    🗑 削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* CSSで格子線 */}
        <style jsx>{`
          table,
          th,
          td {
            border: 1px solid #333;
            border-collapse: collapse;
          }
          th,
          td {
            padding: 6px;
            text-align: left;
          }
        `}</style>
      </div>

      {/* モーダル */}
      {showModal && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">データ編集</h2>
            {columns.map((col) => (
              <div key={col} className="mb-2">
                <label className="block text-sm font-medium mb-1">{col}</label>
                <input
                  type="text"
                  className="border px-3 py-1 w-full rounded"
                  value={editData[col] || ""}
                  onChange={(e) => handleEditChange(col, e.target.value)}
                />
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ページネーション */}
      <div className="mt-4 flex justify-center flex-wrap gap-2">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            «
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 2 && page <= currentPage + 2)
          )
          .map((page, index, array) => {
            const prev = array[index - 1];
            const isSkipped = prev && page - prev > 1;
            return (
              <span key={page} className="flex items-center">
                {isSkipped && <span className="px-2">…</span>}
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              </span>
            );
          })}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            »
          </button>
        )}
      </div>
    </div>
  );
}
