// pages/customers/[name].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CustomerDetailPage() {
  const router = useRouter();
  const { name } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (name) {
      fetch(`/api/customers/${name}`)
        .then(res => res.json())
        .then(data => setData(data));
    }
  }, [name]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{name} のタイヤ情報</h1>
      <button
        onClick={() => router.push('/customers')}
        style={{ marginBottom: "10px" }}
      >
        ← 顧客一覧へ戻る
      </button>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>車番</th>
            <th>サイズ</th>
            <th>メーカー</th>
            <th>シリアル（年号）</th>
            <th>STL</th>
            <th>MIX</th>
            <th>履き潰し</th>
            <th>使用</th>
            <th>溝（ミリ数）</th>
            <th>本数</th>
            <th>廃棄</th>
            <th>作業日</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.車番}</td>
              <td>{row.サイズ}</td>
              <td>{row.メーカー}</td>
              <td>{row['シリアル（年号）']}</td>
              <td>{row.STL}</td>
              <td>{row.MIX}</td>
              <td>{row.履き潰し}</td>
              <td>{row.使用}</td>
              <td>{row['溝（ミリ数）']}</td>
              <td>{row.本数}</td>
              <td>{row.廃棄}</td>
              <td>{row.作業日}</td>
              <td>{row.備考}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
