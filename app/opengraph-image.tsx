import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '크리스마스 편지';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a0f0f 0%, #0f1a1a 50%, #1a0a0a 100%)',
          position: 'relative',
        }}
      >
        {/* 배경 오버레이 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(69, 10, 10, 0.3) 0%, rgba(20, 83, 45, 0.2) 100%)',
          }}
        />

        {/* 크리스마스 장식 배경 */}
        <div style={{ position: 'absolute', top: '50px', left: '80px', fontSize: '120px', opacity: 0.2 }}>
          🎄
        </div>
        <div style={{ position: 'absolute', top: '100px', right: '80px', fontSize: '100px', opacity: 0.2 }}>
          🎅
        </div>
        <div style={{ position: 'absolute', bottom: '80px', right: '100px', fontSize: '90px', opacity: 0.2 }}>
          🦌
        </div>

        {/* 메인 카드 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '2px solid rgba(127, 29, 29, 0.3)',
            borderRadius: '30px',
            padding: '60px 80px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* 상단 트리 */}
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>
            🎄
          </div>

          {/* 타이틀 */}
          <div
            style={{
              fontSize: '64px',
              color: '#f1f5f9',
              fontWeight: 300,
              marginBottom: '20px',
            }}
          >
            크리스마스 편지
          </div>

          {/* 구분선 */}
          <div
            style={{
              width: '200px',
              height: '2px',
              background: '#ef4444',
              opacity: 0.6,
              marginBottom: '30px',
            }}
          />

          {/* 설명 */}
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              fontWeight: 300,
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            특별한 사람에게
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              fontWeight: 300,
              textAlign: 'center',
            }}
          >
            따뜻한 마음을 전하세요
          </div>

          {/* 하단 장식 */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '30px',
              fontSize: '40px',
            }}
          >
            <span>🎅</span>
            <span>✨</span>
            <span>🦌</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

