import { Suspense, type JSX } from 'react';
import BGImage from '@/assets/images/bg.webp'

function Loading() {
  return <div className='w-screen h-screen bg-cover bg-[#fbf7f4] flex items-center justify-center text-[#ef857d]' style={{ backgroundImage: `url(${BGImage})` }}>加载中...</div>
}

export default function WithSuspense(Component: JSX.Element) {
  return (
    <Suspense fallback={<Loading />}>
      {Component}
    </Suspense>
  );
}