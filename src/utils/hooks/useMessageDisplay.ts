import { useEffect, useState } from 'react';

const useMessageDisplay = () => {
  const [message, setMessage] = useState<{
    type: '' | 'error' | 'success';
    message: string;
  }>({
    type: '',
    message: '',
  });

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const setMessageDisplay = (type: 'error' | 'success', message: string) => {
    setMessage({
      type,
      message,
    });

    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(() => {
      setMessage({ type: '', message: '' });
    }, 2000);
    setTimeoutId(id);
  };

  useEffect(() => {
    // Clear the timeout when the component unmounts
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);
  return { message, setMessageDisplay };
};

export default useMessageDisplay;
