import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import LetterClient from './LetterClient';
import LZString from 'lz-string';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 압축된 데이터 디코딩 함수
function decodeLetterData(searchParams: { [key: string]: string | string[] | undefined }) {
  try {
    // 새로운 방식: LZ-String 압축된 데이터
    if (searchParams.d) {
      const compressed = searchParams.d as string;
      const jsonString = LZString.decompressFromEncodedURIComponent(compressed);
      if (jsonString) {
        const data = JSON.parse(jsonString);
        return {
          to: data.to || '친구',
          from: data.from || '익명',
          message: data.message || '메리 크리스마스! 🎄',
        };
      }
    }
    
    // 기존 방식: URL 파라미터 (하위 호환성)
    return {
      to: (searchParams.to as string) || '친구',
      from: (searchParams.from as string) || '익명',
      message: (searchParams.message as string) || '메리 크리스마스! 🎄',
    };
  } catch (error) {
    console.error('Error decoding letter data:', error);
    return {
      to: '친구',
      from: '익명',
      message: '메리 크리스마스! 🎄',
    };
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const { to, from } = decodeLetterData(params);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const ogImageUrl = `${baseUrl}/api/og?to=${encodeURIComponent(to)}&from=${encodeURIComponent(from)}`;

  return {
    title: `${to}님에게 온 크리스마스 편지 🎄`,
    description: `${from}님이 보낸 따뜻한 크리스마스 메시지`,
    openGraph: {
      title: `${to}님에게 온 크리스마스 편지 🎄`,
      description: `${from}님이 보낸 따뜻한 크리스마스 메시지`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${to}님에게 온 크리스마스 편지`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${to}님에게 온 크리스마스 편지 🎄`,
      description: `${from}님이 보낸 따뜻한 크리스마스 메시지`,
      images: [ogImageUrl],
    },
  };
}


export default async function LetterPage({ searchParams }: Props) {
  const params = await searchParams;
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-300 text-lg font-light">편지를 불러오는 중... 🎄</div>
      </div>
    }>
      <LetterClient searchParams={params} />
    </Suspense>
  );
}

