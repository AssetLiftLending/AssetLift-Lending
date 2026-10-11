'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/gtag';
import { captureFirstTouch } from '@/lib/lead-attribution';

export default function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    captureFirstTouch();

    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    const handleReady = () => {
      trackPageView(path);
    };

    if (!trackPageView(path)) {
      window.addEventListener('gtag-ready', handleReady, { once: true });
    }

    return () => {
      window.removeEventListener('gtag-ready', handleReady);
    };
  }, [pathname, searchParams]);

  return null;
}
