import { useState, useEffect } from 'react';

const useCountdownTimer = (initialCount = 30) => {
  const [countdown, setCountdown] = useState<number>(initialCount);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    let interval:string | number | ReturnType<typeof setTimeout> | undefined 

    if (isDisabled) {
      setCountdown(initialCount); // Reset countdown

      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            setIsDisabled(false); // Enable the button when countdown is over
            return initialCount; // Reset countdown for next time
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDisabled, initialCount]);

  const startTimer = () => setIsDisabled(true);

  return { countdown, isDisabled, startTimer };
};

export default useCountdownTimer;
