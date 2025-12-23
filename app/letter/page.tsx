'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import Link from 'next/link';

function LetterContent() {
  const searchParams = useSearchParams();
  const to = searchParams.get('to') || '친구';
  const from = searchParams.get('from') || '익명';
  const message = searchParams.get('message') || '메리 크리스마스! 🎄';

  useEffect(() => {
    // 동적으로 메타 태그 업데이트
    document.title = `${to}님에게 온 크리스마스 편지 🎄`;
    
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const ogImageUrl = `${window.location.origin}/api/og?to=${encodeURIComponent(to)}&from=${encodeURIComponent(from)}`;

    updateMetaTag('og:title', `${to}님에게 온 크리스마스 편지 🎄`);
    updateMetaTag('og:description', `${from}님이 보낸 따뜻한 크리스마스 메시지`);
    updateMetaTag('og:image', ogImageUrl);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', window.location.href);
    
    // 트위터 카드
    const updateTwitterTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', `${to}님에게 온 크리스마스 편지 🎄`);
    updateTwitterTag('twitter:description', `${from}님이 보낸 따뜻한 크리스마스 메시지`);
    updateTwitterTag('twitter:image', ogImageUrl);
  }, [to, from]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* 배경 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-green-950/20 to-red-900/30 pointer-events-none" />
      
      {/* 크리스마스 장식 - 좌측 상단 트리 */}
      <div className="absolute left-4 md:left-12 top-12 text-7xl md:text-9xl opacity-15 pointer-events-none animate-pulse">
        🎄
      </div>
      
      {/* 크리스마스 장식 - 우측 상단 산타 */}
      <div className="absolute right-4 md:right-12 top-20 text-6xl md:text-8xl opacity-15 pointer-events-none">
        🎅
      </div>
      
      {/* 크리스마스 장식 - 좌측 하단 루돌프 */}
      <div className="absolute left-8 md:left-20 bottom-20 text-5xl md:text-7xl opacity-15 pointer-events-none">
        🦌
      </div>
      
      {/* 크리스마스 장식 - 우측 하단 선물 */}
      <div className="absolute right-12 md:right-24 bottom-32 text-4xl md:text-6xl opacity-15 pointer-events-none">
        🎁
      </div>
      
      {/* 눈송이 효과 */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="snowflake text-white"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 4 + 4}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 8 + 8}px`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
        >
          ❄
        </div>
      ))}

      <main className="max-w-3xl w-full relative z-10 fade-in">
        {/* 상단 크리스마스 트리 */}
        <div className="text-center mb-4">
          <div className="text-7xl md:text-8xl animate-pulse inline-block">
            🎄
          </div>
        </div>
        
        {/* 편지 카드 */}
        <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-900/30 overflow-hidden relative">
          {/* 코너 장식 */}
          <div className="absolute top-4 left-4 text-2xl md:text-3xl shimmer z-10">🎅</div>
          <div className="absolute top-4 right-4 text-2xl md:text-3xl shimmer z-10" style={{ animationDelay: '1s' }}>🦌</div>
          
          {/* 헤더 */}
          <div className="bg-gradient-to-br from-red-950/50 via-slate-900 to-green-950/50 p-8 md:p-12 text-center border-b border-red-900/30 relative">
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="text-4xl md:text-5xl">⭐</span>
              <div className="text-6xl md:text-7xl shimmer">✨</div>
              <span className="text-4xl md:text-5xl">⭐</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-slate-100 mb-3 tracking-wide">
              크리스마스 편지
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-4" />
            <p className="text-slate-400 text-base md:text-lg font-light">
              {to}님에게
            </p>
          </div>

          {/* 편지 본문 */}
          <div className="p-8 md:p-12 relative">
            {/* 장식 요소 */}
            <div className="absolute top-6 left-6 text-2xl opacity-30">🎁</div>
            <div className="absolute top-6 right-6 text-2xl opacity-30">🎁</div>
            <div className="absolute bottom-6 left-6 text-2xl opacity-30">🔔</div>
            <div className="absolute bottom-6 right-6 text-2xl opacity-30">🔔</div>

            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-red-900/30 relative">
              {/* 편지 내부 장식 */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">⭐</div>
              
              <div className="mb-8">
                <p className="text-lg md:text-xl text-red-400 font-light tracking-wide">
                  {to}에게,
                </p>
              </div>

              <div className="mb-10 text-slate-200 leading-relaxed whitespace-pre-wrap text-base md:text-lg font-light">
                {message}
              </div>

              <div className="text-right border-t border-red-900/30 pt-6">
                <p className="text-base md:text-lg text-slate-300 font-light mb-2">
                  {from} 올림
                </p>
                <p className="text-sm text-slate-500 font-light">
                  {new Date().getFullYear()} 크리스마스
                </p>
              </div>
            </div>

            {/* 하단 장식 */}
            <div className="mt-8 flex justify-center gap-6 text-3xl">
              <span className="shimmer">🎄</span>
              <span className="shimmer" style={{ animationDelay: '0.5s' }}>🎅</span>
              <span className="shimmer" style={{ animationDelay: '1s' }}>⭐</span>
              <span className="shimmer" style={{ animationDelay: '1.5s' }}>🦌</span>
              <span className="shimmer" style={{ animationDelay: '2s' }}>🎁</span>
            </div>
          </div>

          {/* 푸터 */}
          <div className="bg-gradient-to-br from-red-950/50 via-slate-900 to-green-950/50 p-6 md:p-8 text-center border-t border-red-900/30 relative">
            <div className="flex justify-center gap-4 mb-4 text-2xl">
              <span>🎄</span>
              <span>⭐</span>
              <span>🎁</span>
            </div>
            <p className="text-slate-400 text-sm md:text-base font-light mb-4">
              따뜻한 크리스마스 되세요
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 via-red-700 to-green-700 hover:from-red-500 hover:via-red-600 hover:to-green-600 text-white font-medium rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🎅 나도 편지 보내기
            </Link>
          </div>
          
          {/* 하단 장식 */}
          <div className="absolute -bottom-4 left-8 text-3xl">🎁</div>
          <div className="absolute -bottom-4 right-8 text-3xl">🔔</div>
        </div>
        
        {/* 하단 루돌프와 산타 */}
        <div className="flex justify-center gap-8 mt-6 text-4xl md:text-5xl">
          <span className="animate-bounce">🦌</span>
          <span className="animate-pulse">🎄</span>
          <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🎅</span>
        </div>
      </main>
    </div>
  );
}

export default function LetterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-300 text-lg font-light">편지를 불러오는 중... 🎄</div>
      </div>
    }>
      <LetterContent />
    </Suspense>
  );
}

