import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // タイトルとオプションの説明文を取得
    const title = searchParams.get('title') || 'これからやること宣言';
    const description = searchParams.get('description') || '';
    
    // 現在の日付を取得
    const date = new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // 透かし文字のパターンを作成
    const watermarkPattern = Array(20).fill('俺はやるぜ ').join(' ');

    const response = new ImageResponse(
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
              {date}
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
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
                marginBottom: '20px',
                wordBreak: 'break-word',
                width: '100%',
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: '32px',
                  color: '#666',
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  width: '100%',
                }}
              >
                {description}
              </div>
            )}
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
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              #YARUZE
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    // キャッシュヘッダーを設定
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    return response;
  } catch (error) {
    console.error(error);
    return new Response('OG画像の生成に失敗しました', { status: 500 });
  }
}
