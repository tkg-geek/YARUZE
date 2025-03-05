import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const alt = 'YARUZE - これからやること宣言';
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          backgroundSize: '100% 100%',
          padding: '60px 60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* ヘッダー */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            YARUZE
          </div>
        </div>

        {/* メインコンテンツ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: '20px',
              wordBreak: 'break-word',
              width: '100%',
            }}
          >
            YARUZE - これからやること宣言
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#666',
              textAlign: 'center',
              wordBreak: 'break-word',
              width: '100%',
            }}
          >
            これからやることを宣言して、SNSでシェアしよう
          </div>
        </div>

        {/* フッター */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              color: '#666',
            }}
          >
            #YARUZE
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 