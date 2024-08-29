'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

type AdBannerProps = {
  id?: string;
  dataAdSlot: string;
  dataAdFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
};

const AdBanner = ({
  dataAdSlot,
  dataAdFormat = 'auto',
  responsive = true,
  className,
}: AdBannerProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [initialRequest, setInitialRequest] = useState<boolean>(false);
  const currentPath = usePathname();
  const params = useSearchParams();
  const insRef = useRef<HTMLModElement>(null);
  const maxRetries = 2; // Set the maximum number of retry attempts
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const requestAd = () => {
      if (retryCount < maxRetries) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {}
        setRetryCount((prevRetryCount) => prevRetryCount + 1);
      }
    };

    if (!initialRequest) {
      requestAd();
      setInitialRequest(true);
    } else {
      setIsMounted(!isMounted);
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
          const target = mutation.target as HTMLElement;
          const adStatus = target.getAttribute('data-ad-status');
          if (adStatus === 'unfilled') {
            requestAd();
          }
        }
      }
    });

    if (insRef.current) {
      observer.observe(insRef.current, { attributes: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [currentPath, params, dataAdSlot, retryCount, initialRequest]);

  const containerClassNames = useMemo(
    () =>
      cn(
        'mx-auto overflow-hidden',
        retryCount === maxRetries && 'has-[ins[data-ad-status="unfilled"]]:hidden',
        dataAdFormat === 'horizontal' && '!h-[50px] !w-[85%]',
        dataAdFormat === 'vertical' && '!h-[600px] !w-full',
        dataAdFormat === 'rectangle' && '!h-[300px] !w-full',
        className,
      ),
    [retryCount, dataAdFormat, className],
  );

  const insStyles = useMemo(
    () => ({
      display: 'block',
      height: dataAdFormat === 'horizontal' ? '50px' : 'auto',
      width: dataAdFormat === 'horizontal' ? '100%' : 'auto',
    }),
    [dataAdFormat],
  );

  return (
    <div key={dataAdSlot} className={containerClassNames}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={insStyles}
        data-ad-client="ca-pub-3467222094751265"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat || 'auto'}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default AdBanner;
