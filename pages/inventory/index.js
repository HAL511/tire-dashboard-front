// ✅ 在庫一覧ページ - pages/inventory/index.js
import { useEffect, useState } from 'react';

export default function InventoryPage() {
  const [inventoryData, setInventoryData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => setInventoryData(data));
  }, []);

  const filteredData = inventoryData.filter(row =>
    filter === '' || row.顧客名 === filter
  );

  const uniqueCustomers = [...new Set(inventoryData.map(row => row.顧客名))];

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => window.location.href = '/'} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
        ホームへ戻る
      </button>

      <h1>在庫一覧ページ</h1>

      <label>顧客名で絞り込み：</label>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="">すべての顧客</option>
        {uniqueCustomers.map((name, index) => (
          <option key={index} value={name}>{name}</option>
        ))}
      </select>

      <table border="1" cellPadding="5" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>顧客名</th>
            <th>車番</th>
            <th>サイズ</th>
            <th>メーカー</th>
            <th>シリアル（年号）</th>
            <th>STL</th>
            <th>MIX</th>
            <th>履き潰し</th>
            <th>使用</th>
            <th>溝（mm）</th>
            <th>本数</th>
            <th>廃棄</th>
            <th>作業日</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.顧客名}</td>
              <td>{row.車番}</td>
              <td>{row.サイズ}</td>
              <td>{row.メーカー}</td>
              <td>{row['シリアル（年号）']}</td>
              <td>{row.STL}</td>
              <td>{row.MIX}</td>
              <td>{row.履き潰し}</td>
              <td>{row.使用}</td>
              <td>{row['溝（mm）']}</td>
              <td>{row.本数}</td>
              <td>{row.廃棄}</td>
              <td>{row.作業日 ? row.作業日.split("T")[0] : ""}</td>
              <td>{row.備考}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
