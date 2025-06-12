// pages/inventory/edit/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (id) {
      fetch(`/api/inventory/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await fetch(`/api/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    alert("保存しました");
    router.push('/inventory'); // ← 保存後にトップページへ戻る
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        編集画面（車番: {id}）
      </h1>

      <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label style={{ fontWeight: 'bold' }}>{key}</label>
            <input
              name={key}
              value={value || ''}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        style={{
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        保存
      </button>
    </div>
  );
}
