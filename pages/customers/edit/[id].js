import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditCustomerPage() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    顧客名: '',
    住所: '',
    電話番号: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/customers/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    router.push('/customers'); // 編集後に一覧ページへ戻る
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>顧客情報の編集</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>顧客名：</label>
          <input type="text" name="顧客名" value={formData.顧客名} onChange={handleChange} />
        </div>
        <div>
          <label>住所：</label>
          <input type="text" name="住所" value={formData.住所} onChange={handleChange} />
        </div>
        <div>
          <label>電話番号：</label>
          <input type="text" name="電話番号" value={formData.電話番号} onChange={handleChange} />
        </div>
        <button type="submit">保存</button>
      </form>
    </div>
  );
}
