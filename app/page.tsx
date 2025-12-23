'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import LZString from 'lz-string';

export default function Home() {
  const router = useRouter();
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  // 눈송이 데이터를 한 번만 생성 (성능 최적화)
  const snowflakes = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 5,
      size: Math.random() * 8 + 8,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  , []);

  const generateUrl = () => {
    if (!to || !message) {
      alert('받는 사람과 메시지를 입력해주세요! 🎄');
      return;
    }

    // 데이터를 JSON으로 만들고 LZ-String으로 압축
    const data = {
      to,
      from: from || '익명',
      message,
    };
    
    // JSON을 문자열로 변환 후 압축 및 Base64 인코딩
    const jsonString = JSON.stringify(data);
    const compressed = LZString.compressToEncodedURIComponent(jsonString);
    
    // 짧은 URL 생성
    const url = `${window.location.origin}/letter?d=${compressed}`;
    setGeneratedUrl(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    alert('링크가 복사되었습니다! 🎅');
  };

  const previewLetter = () => {
    if (generatedUrl) {
      router.push(generatedUrl.replace(window.location.origin, ''));
    }
  };

  const shareToKakao = () => {
    if (!generatedUrl) return;
    
    // 카카오톡 공유하기 (웹 공유 API 사용)
    if (navigator.share) {
      navigator.share({
        title: `${to}님에게 온 크리스마스 편지 🎄`,
        text: `${from}님이 보낸 따뜻한 크리스마스 메시지`,
        url: generatedUrl,
      }).catch(() => {
        // 공유 실패시 복사
        copyToClipboard();
      });
    } else {
      // Web Share API를 지원하지 않으면 복사
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* 배경 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-green-950/20 to-red-900/30 pointer-events-none" />
      
      {/* 크리스마스 장식 - 좌측 트리 */}
      <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-6xl md:text-8xl opacity-20 pointer-events-none">
        🎄
      </div>
      
      {/* 크리스마스 장식 - 우측 산타 */}
      <div className="absolute right-4 md:right-12 top-1/3 -translate-y-1/2 text-5xl md:text-7xl opacity-20 pointer-events-none">
        🎅
      </div>
      
      {/* 크리스마스 장식 - 우측 하단 루돌프 */}
      <div className="absolute right-8 md:right-20 bottom-20 text-4xl md:text-6xl opacity-20 pointer-events-none">
        🦌
      </div>
      
      {/* 눈송이 효과 */}
      {snowflakes.map((snow) => (
        <div
          key={snow.id}
          className="snowflake text-white"
          style={{
            left: `${snow.left}%`,
            animationDuration: `${snow.duration}s`,
            animationDelay: `${snow.delay}s`,
            fontSize: `${snow.size}px`,
            opacity: snow.opacity,
          }}
        >
          ❄
        </div>
      ))}

      <main className="max-w-2xl w-full bg-slate-900/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-900/30 p-8 md:p-12 relative z-10 fade-in">
        {/* 상단 크리스마스 장식 */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl md:text-7xl z-20">
          🎄
        </div>
        
        {/* 코너 장식 */}
        <div className="absolute top-4 left-4 text-2xl shimmer">⭐</div>
        <div className="absolute top-4 right-4 text-2xl shimmer" style={{ animationDelay: '1s' }}>🎁</div>
        
        {/* 헤더 */}
        <div className="text-center mb-10 mt-6">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="text-3xl md:text-4xl">🎅</span>
            <div className="text-5xl md:text-6xl shimmer">✨</div>
            <span className="text-3xl md:text-4xl">🦌</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-slate-100 mb-3 tracking-wide">
            크리스마스 편지
          </h1>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-4" />
          <p className="text-slate-400 text-sm md:text-base font-light">
            특별한 사람에게 따뜻한 마음을 전하세요
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">
              받는 사람 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="예: 철수"
              className="w-full px-5 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all text-slate-100 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">
              보내는 사람
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="예: 영희 (선택사항)"
              className="w-full px-5 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all text-slate-100 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">
              편지 내용 <span className="text-red-400">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="따뜻한 크리스마스 메시지를 작성해주세요...ㅎ"
              rows={8}
              className="w-full px-5 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all resize-none text-slate-100 placeholder-slate-500 leading-relaxed"
            />
          </div>

          <button
            onClick={generateUrl}
            className="w-full bg-gradient-to-r from-red-600 via-red-700 to-green-700 text-white font-medium py-4 rounded-xl hover:from-red-500 hover:via-red-600 hover:to-green-600 transition-all transform hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/25 active:scale-[0.98]"
          >
            🎁 링크 생성하기
          </button>

          {generatedUrl && (
            <div className="mt-6 p-6 bg-red-950/30 border border-red-800/50 rounded-xl backdrop-blur-sm fade-in">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎄</span>
                <p className="text-sm font-medium text-red-300 tracking-wide">
                  생성된 링크
                </p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700/50 break-all text-sm text-slate-300 mb-4 font-mono">
                {generatedUrl}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-3 rounded-lg transition-all border border-slate-700"
                  >
                    📋 링크 복사
                  </button>
                  <button
                    onClick={previewLetter}
                    className="flex-1 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-500 hover:to-green-500 text-white font-medium py-3 rounded-lg transition-all"
                  >
                    👀 미리보기
                  </button>
                </div>
                <button
                  onClick={shareToKakao}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  💬 카카오톡으로 공유하기
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-center text-xs text-slate-500 font-light">
          <div className="flex justify-center gap-3 mb-3 text-xl">
            <span className="shimmer">🎄</span>
            <span className="shimmer" style={{ animationDelay: '0.5s' }}>⭐</span>
            <span className="shimmer" style={{ animationDelay: '1s' }}>🎁</span>
          </div>
          <p>링크를 특별한 사람에게 공유하세요</p>
        </div>
        
        {/* 하단 장식 */}
        <div className="absolute -bottom-6 left-8 text-3xl">🎁</div>
        <div className="absolute -bottom-6 right-8 text-3xl">🔔</div>
      </main>
    </div>
  );
}
