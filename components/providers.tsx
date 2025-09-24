'use client';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = pathname?.split('/')?.[1] || 'ar';
  const isRTL = locale === 'ar';

  return (
    <>
      {children}
      <Toaster
        position={isRTL ? 'top-right' : 'top-left'}
        toastOptions={{ style: { zIndex: 999999 } }}
      />
    </>
  );
}
