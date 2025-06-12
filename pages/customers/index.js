import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await fetch('/api/customers');
    const data = await res.json();
    setCustomers(data);
  };

  const handleDelete = async (id) => {
    if (confirm('本当に削除しますか？')) {
      await fetch(`/api/customers/${id}`, {
        method: 'DELETE'
      });
      fetchCustomers(); // 削除後に再取得して一覧更新
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => router.push('/')}>ホームへ戻る</button>{' '}
        <button onClick={() => router.push('/customers/add')}>➕ 新規登録</button>
      </div>

      <h1>顧客一覧</h1>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>顧客名</th>
            <th>住所</th>
            <th>電話番号</th>
            <th>編集</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.顧客名}</td>
              <td>{c.住所}</td>
              <td>{c.電話番号}</td>
              <td>
                <button onClick={() => router.push(`/customers/edit/${c.id}`)}>編集</button>
              </td>
              <td>
                <button onClick={() => handleDelete(c.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
