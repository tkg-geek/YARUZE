import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const alt = 'YARUZE - これからやること宣言';
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  // 透かし文字のパターンを作成
  const watermarkPattern = Array(20).fill('俺はやるぜ ').join(' ');

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
          background: 'linear-gradient(to bottom right, #FF9800 0%, #FF7E00 30%, #E53935 70%, #C62828 100%)',
          backgroundSize: '100% 100%',
          padding: '60px 60px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 透かし文字パターン - 複数行 */}
        {Array(10).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${i * 60}px`,
              left: 0,
              right: 0,
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'rgba(255, 255, 255, 0.25)',
              whiteSpace: 'nowrap',
              zIndex: 0,
              transform: 'rotate(-5deg)',
            }}
          >
            {watermarkPattern}
          </div>
        ))}

        {/* ヘッダー */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '20px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            YARUZE
          </div>
          <div
            style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            }}
          >
            {new Date().toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
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
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            YARUZE - これからやること宣言
          </div>
          <div
            style={{
              fontSize: '24px',
              color: 'white',
              textAlign: 'center',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
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
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '18px',
              color: 'white',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
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