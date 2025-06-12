// pages/customers/add.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    顧客名: '',
    住所: '',
    電話番号: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    router.push('/customers');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>新規顧客の登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>顧客名：</label>
          <input type="text" name="顧客名" value={formData.顧客名} onChange={handleChange} required />
        </div>
        <div>
          <label>住所：</label>
          <input type="text" name="住所" value={formData.住所} onChange={handleChange} required />
        </div>
        <div>
          <label>電話番号：</label>
          <input type="text" name="電話番号" value={formData.電話番号} onChange={handleChange} required />
        </div>
        <button type="submit">登録</button>
      </form>
      <br />
      <button onClick={() => router.push('/customers')}>← 顧客一覧へ戻る</button>
    </div>
  );
}
