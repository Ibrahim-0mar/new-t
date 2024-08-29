'use client';

import GoogleTagManager from '@/utils/scripts/googleTagManager';
import { applicationErrorTracking } from '@/utils/tracking/common/error';
import GeneralError from '@/views/GeneralError';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    // Log the error to an error reporting service
    applicationErrorTracking(String(error))
    console.error(error);
  }, [error]);

  const handleReset = () => {
    reset();
    if (window) {
      window.location.reload();
    }
  };

  return (
    <>
      <GoogleTagManager strategy='afterInteractive' />
      <GeneralError reset={handleReset}  />
    </>
  );
}
