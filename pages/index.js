import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("/ahpytvcf.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        textAlign: 'center',
        width: '90%',
        maxWidth: '480px',
      }}>
        <h1 style={{
          fontSize: '2.4rem',
          marginBottom: '30px',
          color: '#333',
        }}>
          タイヤ管理ダッシュボード
        </h1>

        <div style={{
          display: 'grid',
          gap: '16px',
        }}>
          <Link href="/customers"><div style={linkStyle}>📋 顧客一覧</div></Link>
          <Link href="/inventory"><div style={linkStyle}>🚚 在庫一覧</div></Link>
          <Link href="/history"><div style={linkStyle}>📖 履歴確認</div></Link>
          <Link href="/search"><div style={linkStyle}>🔍 検索ページ</div></Link>
        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  padding: '14px',
  backgroundColor: '#1976d2',
  color: '#fff',
  fontWeight: 'bold',
  borderRadius: '8px',
  textAlign: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
};
