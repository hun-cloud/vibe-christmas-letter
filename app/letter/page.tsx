import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import LetterClient from './LetterClient';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const to = (searchParams.to as string) || '친구';
  const from = (searchParams.from as string) || '익명';
  
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


export default function LetterPage({ searchParams }: Props) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-300 text-lg font-light">편지를 불러오는 중... 🎄</div>
      </div>
    }>
      <LetterClient searchParams={searchParams} />
    </Suspense>
  );
}

