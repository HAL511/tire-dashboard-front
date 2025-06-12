import { useState } from 'react';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?keyword=${keyword}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* ホームへ戻るボタン */}
      <button
        onClick={() => window.location.href = '/'}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ホームへ戻る
      </button>

      <h1>検索ページ</h1>

      <input
        type="text"
        placeholder="車番または顧客名で検索"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ padding: '8px', width: '300px' }}
      />
      <button
        onClick={handleSearch}
        style={{ marginLeft: '10px', padding: '8px' }}
      >
        検索
      </button>

      {results.length > 0 && (
        <table border="1" cellPadding="5" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>顧客名</th>
              <th>車番</th>
              <th>サイズ</th>
              <th>メーカー</th>
              <th>作業日</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index}>
                <td>{item.顧客名}</td>
                <td>{item.車番}</td>
                <td>{item.サイズ}</td>
                <td>{item.メーカー}</td>
                <td>{item.作業日 ? item.作業日.split('T')[0] : ''}</td>
                <td>{item.備考}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
