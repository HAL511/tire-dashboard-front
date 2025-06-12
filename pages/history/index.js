// ✅ 履歴確認ページ - pages/history/index.js
export default function HistoryPage() {
  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => window.location.href = '/'} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
        ホームへ戻る
      </button>
      <h1>履歴確認ページ</h1>
      {/* 履歴の表示内容をここに実装 */}
    </div>
  );
}