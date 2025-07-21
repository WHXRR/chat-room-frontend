import { Suspense, type JSX } from 'react';

function Loading() {
  return <div className='w-screen h-screen flex items-center justify-center text-[#ef857d]'>加载中...</div>
}

export default function WithSuspense(Component: JSX.Element) {
  return (
    <Suspense fallback={<Loading />}>
      {Component}
    </Suspense>
  );
}