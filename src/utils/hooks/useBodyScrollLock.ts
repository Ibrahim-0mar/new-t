import { useCallback, useEffect, useRef } from 'react';

const useBodyScrollLock = () => {
  const lockCountRef = useRef(0); // Holds the current count of locks

  const lockBodyScroll = useCallback(() => {
    if (lockCountRef.current === 0) {
      document.body.style.overflow = 'hidden';
    }
    lockCountRef.current += 1;
  }, []);

  const unlockBodyScroll = useCallback(() => {
    if (lockCountRef.current === 0) {
      return;
    }

    lockCountRef.current -= 1;
    if (lockCountRef.current === 0) {
      document.body.style.overflow = '';
    }
  }, []);

  // Cleanup function to ensure the overflow is reset when all components unmount
  useEffect(() => {
    return () => {
      if (lockCountRef.current > 0) {
        document.body.style.overflow = '';
        lockCountRef.current = 0; // Reset the lock count
      }
    };
  }, []);

  return { lockBodyScroll, unlockBodyScroll };
};

export default useBodyScrollLock;
